// @/lib/actions.ts
'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { aiPoweredFraudDetection } from '@/ai/flows/ai-powered-fraud-detection';
import type { CredentialRequest, IssuedCredential } from './definitions';
import { redirect } from 'next/navigation';
import { getAdminApp } from '@/firebase/admin';
import { getAuth as getAdminAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';
import { FieldValue } from 'firebase-admin/firestore';

// --- Auth Actions ---
export async function loginWithGoogle() {
  // This action will be called from a form, but we need to redirect to a special URL for Google Sign-In.
  // The actual sign-in happens on the client, this is a trigger.
  // We'll handle the redirect client-side, but this action needs to exist.
  // A better implementation would use OAuth flow directly. For now, we redirect to login page where client-side logic will handle it.
  redirect('/login');
}

export async function setRoleAction(prevState: any, formData: FormData) {
  const role = formData.get("role") as string;
  const { auth } = getAdminApp();
  const adminAuth = getAdminAuth(auth);
  
  // This is a simplified example. In a real app, you'd get the user's UID from their session.
  // For this demo, we'll assume a user is already authenticated and we can get their UID.
  // This part of the code is illustrative and would need a proper session management to work.
  // We will handle the actual logic on the client after sign-in.
  // This server action's main job is to redirect.
  
  // Placeholder for getting current user's idToken from cookie/session
  const idToken = '...'; // This would be read from the request cookies

  try {
    // This is where you would verify the token and get the user
    // const decodedToken = await adminAuth.verifyIdToken(idToken);
    // const uid = decodedToken.uid;
    // await adminAuth.setCustomUserClaims(uid, { role });
    // await getFirestore(getAdminApp().db).collection('users').doc(uid).update({ role });
  } catch (error) {
    return { message: 'Failed to set role. Please try again.' };
  }

  if (role === 'admin') {
    redirect('/dashboard/admin');
  } else if (role === 'student') {
    redirect('/dashboard/student');
  } else {
    redirect('/verify');
  }
}

export async function logout() {
  // Client-side will handle the actual sign-out from Firebase
  redirect('/login');
}


// --- Verification Action ---
const VerifySchema = z.object({
  credentialId: z.string().min(1, "Credential ID is required."),
});

type VerificationResult = {
  status: "verified" | "not_found" | "revoked" | "error" | "idle";
  message: string;
  credential?: IssuedCredential | null;
};

export async function verifyCredential(
  prevState: VerificationResult,
  formData: FormData
): Promise<VerificationResult> {
  const validatedFields = VerifySchema.safeParse({
    credentialId: formData.get("credentialId"),
  });

  if (!validatedFields.success) {
    return {
      status: "error",
      message: "Invalid input. Please provide a valid Credential ID.",
      credential: null,
    };
  }

  const { credentialId } = validatedFields.data;
  const db = getFirestore(getAdminApp().db);

  try {
    const credRef = db.collection('issuedCredentials').doc(credentialId);
    const doc = await credRef.get();

    if (!doc.exists) {
      return {
        status: "not_found",
        message: `Credential with ID "${credentialId}" was not found.`,
        credential: null,
      };
    }
    
    const credential = { id: doc.id, ...doc.data() } as IssuedCredential;

    if (credential.status === "revoked") {
      return {
        status: "revoked",
        message: `This credential was revoked on ${credential.revocationDate}. Reason: ${credential.revocationReason}`,
        credential,
      };
    }

    return {
      status: "verified",
      message: `Credential successfully verified. Issued on ${credential.issuanceDate}.`,
      credential,
    };

  } catch (error) {
    console.error("Verification failed:", error);
    return { status: 'error', message: 'An error occurred during verification.', credential: null };
  }
}


// --- AI Fraud Detection Action ---
type AnalyzeState = {
  isFraudulent: boolean | null;
  reason: string | null;
  error?: string | null;
};

export async function analyzeDocument(
  prevState: AnalyzeState,
  formData: FormData
): Promise<AnalyzeState> {
  const documentDescription = formData.get("documentDescription") as string;
  
  if (!documentDescription) {
    return { isFraudulent: null, reason: null, error: "Missing document description." };
  }

  const placeholderDataUri = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';

  try {
    const result = await aiPoweredFraudDetection({
      documentDataUri: placeholderDataUri,
      documentDescription,
    });
    return { ...result, error: null };
  } catch (error) {
    console.error("AI analysis failed:", error);
    return {
      isFraudulent: null,
      reason: null,
      error: "An unexpected error occurred during analysis.",
    };
  }
}

// --- Admin Credential Request Action ---
export async function updateRequestStatus(requestId: string, status: CredentialRequest['status'], path: string) {
  const db = getFirestore(getAdminApp().db);
  const requestRef = db.collection('credentialRequests').doc(requestId);

  try {
    await db.runTransaction(async (transaction) => {
      const requestDoc = await transaction.get(requestRef);
      if (!requestDoc.exists) {
        throw "Document does not exist!";
      }

      const requestData = requestDoc.data() as CredentialRequest;

      transaction.update(requestRef, { status: status });

      if (status === 'approved') {
        const newCredentialRef = db.collection('issuedCredentials').doc(); // Auto-generate ID
        const newCredential: Omit<IssuedCredential, 'id'> = {
            studentId: requestData.studentId,
            studentName: requestData.studentName,
            credentialType: requestData.credentialType,
            issuanceDate: new Date().toISOString().split('T')[0], // YYYY-MM-DD
            issuer: 'University of Firebase',
            transactionId: `0x${[...Array(64)].map(() => Math.floor(Math.random() * 16).toString(16)).join('')}`,
            status: 'valid',
        };
        transaction.set(newCredentialRef, newCredential);
      }
    });
  } catch (e) {
    console.error("Transaction failure:", e);
    // Handle error, maybe rethrow or return an error state
  }

  revalidatePath(path);
  revalidatePath('/dashboard/student');
}

// --- Student Credential Request Action ---
const RequestSchema = z.object({
  credentialType: z.string().min(1, 'Please select a credential type.'),
  document: z.any(),
  studentId: z.string(),
  studentName: z.string(),
});

type RequestState = {
  message: string | null;
  success: boolean;
}

export async function createCredentialRequest(prevState: RequestState, formData: FormData) : Promise<RequestState> {
  const validatedFields = RequestSchema.safeParse({
    credentialType: formData.get('credentialType'),
    document: formData.get('document'),
    studentId: formData.get('studentId'),
    studentName: formData.get('studentName'),
  });

  if (!validatedFields.success) {
      return {
          message: 'Invalid data provided.',
          success: false,
      }
  }
  
  const { credentialType, studentId, studentName } = validatedFields.data;
  const db = getFirestore(getAdminApp().db);

  try {
    const newRequest: Omit<CredentialRequest, 'id'> = {
      studentId: studentId,
      studentName: studentName,
      credentialType: credentialType,
      requestDate: new Date().toISOString(),
      status: 'pending',
      documentUrl: '/placeholder-doc.pdf', // Placeholder, in real app would upload to Cloud Storage
    };

    await db.collection('credentialRequests').add(newRequest);

  } catch (error) {
    console.error("Failed to create request:", error);
    return { message: "Failed to submit request.", success: false };
  }

  revalidatePath('/dashboard/student');
  revalidatePath('/dashboard/admin');

  return {
    message: `Your request for a ${credentialType} has been submitted.`,
    success: true,
  }
}
