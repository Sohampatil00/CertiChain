// @/lib/actions.ts
"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { aiPoweredFraudDetection } from "@/ai/flows/ai-powered-fraud-detection";
import { credentialRequests, issuedCredentials } from "./data";
import type { CredentialRequest, IssuedCredential } from "./definitions";

// --- Login Action ---
export async function login(prevState: any, formData: FormData) {
  const role = formData.get("role");
  if (role === "student") {
    redirect("/dashboard/student");
  } else if (role === "admin") {
    redirect("/dashboard/admin");
  } else {
    redirect("/verify");
  }
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

  // Simulate blockchain query
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const credential = issuedCredentials.find((c) => c.id === credentialId || c.transactionId === credentialId);

  if (!credential) {
    return {
      status: "not_found",
      message: `Credential with ID "${credentialId}" was not found.`,
      credential: null,
    };
  }

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

  // Use a placeholder data URI as we cannot fetch the image URL on the server here.
  // This is a 1x1 transparent GIF. The GenAI model will rely on the description.
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
  // Simulate updating data
  const request = credentialRequests.find(r => r.id === requestId);
  if (request) {
    request.status = status;

    if (status === 'approved') {
        // Simulate creating an issued credential
        const newCredential: IssuedCredential = {
            id: `cred-${Date.now()}`,
            studentName: request.studentName,
            credentialType: request.credentialType,
            issuanceDate: new Date().toLocaleDateString('en-CA'),
            issuer: 'University of Firebase',
            transactionId: `0x${[...Array(64)].map(() => Math.floor(Math.random() * 16).toString(16)).join('')}`,
            status: 'valid',
        };
        issuedCredentials.push(newCredential);
    }
  }
  revalidatePath(path);
  revalidatePath('/dashboard/student'); // Student needs to see updated status
}

// --- Student Credential Request Action ---
const RequestSchema = z.object({
  credentialType: z.string().min(1, 'Please select a credential type.'),
  document: z.any(),
});

type RequestState = {
  message: string | null;
  success: boolean;
}

export async function createCredentialRequest(prevState: RequestState, formData: FormData) : Promise<RequestState> {
  const validatedFields = RequestSchema.safeParse({
    credentialType: formData.get('credentialType'),
    document: formData.get('document'),
  });

  if (!validatedFields.success) {
      return {
          message: 'Invalid data provided.',
          success: false,
      }
  }

  const newRequest: CredentialRequest = {
    id: `req-${Date.now()}`,
    studentName: 'Alice Johnson', // Hardcoded for demo
    credentialType: validatedFields.data.credentialType,
    requestDate: new Date().toLocaleDateString('en-CA'),
    status: 'pending',
    documentUrl: '/placeholder-doc.pdf', // Hardcoded for demo
  };

  credentialRequests.unshift(newRequest); // Add to the top of the list
  
  revalidatePath('/dashboard/student');
  revalidatePath('/dashboard/admin');

  return {
    message: `Your request for a ${validatedFields.data.credentialType} has been submitted.`,
    success: true,
  }
}
