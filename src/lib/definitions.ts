// src/lib/definitions.ts

import { FieldValue } from "firebase/firestore";

export type UserProfile = {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
  role: 'student' | 'admin' | 'verifier';
};

export type IssuedCredential = {
    id: string;
    studentId: string;
    studentName: string;
    credentialType: string;
    issuanceDate: string; // YYYY-MM-DD
    issuer: string;
    transactionId: string;
    status: 'valid' | 'revoked';
    revocationDate?: string;
    revocationReason?: string;
};
  
export type CredentialRequest = {
    id: string;
    studentId: string;
    studentName: string;
    credentialType: string;
    requestDate: string; // ISO String
    status: 'pending' | 'approved' | 'rejected';
    documentUrl: string;
};
