export type IssuedCredential = {
    id: string;
    studentName: string;
    credentialType: string;
    issuanceDate: string;
    issuer: string;
    transactionId: string;
    status: 'valid' | 'revoked';
    revocationDate?: string;
    revocationReason?: string;
};
  
export type CredentialRequest = {
    id: string;
    studentName: string;
    credentialType: string;
    requestDate: string;
    status: 'pending' | 'approved' | 'rejected';
    documentUrl: string;
};
