import type { CredentialRequest, IssuedCredential } from './definitions';

export const issuedCredentials: IssuedCredential[] = [
    {
        id: 'cred-1672531200',
        studentName: 'Alice Johnson',
        credentialType: 'Bachelor of Science in Computer Science',
        issuanceDate: '2023-01-01',
        issuer: 'University of Firebase',
        transactionId: '0xabc123def456...',
        status: 'valid',
    },
    {
        id: 'cred-1640995200',
        studentName: 'Alice Johnson',
        credentialType: 'Dean\'s List Certificate - Fall 2022',
        issuanceDate: '2022-01-01',
        issuer: 'University of Firebase',
        transactionId: '0xdef456abc123...',
        status: 'valid',
    },
    {
        id: 'cred-revoked-001',
        studentName: 'Bob Smith',
        credentialType: 'Master of Business Administration',
        issuanceDate: '2021-06-15',
        issuer: 'Tech Advanced College',
        transactionId: '0x123...revoked...789',
        status: 'revoked',
        revocationDate: '2024-03-10',
        revocationReason: 'Issuing error.',
    },
];

export const credentialRequests: CredentialRequest[] = [
    {
        id: 'req-001',
        studentName: 'Charlie Brown',
        credentialType: 'Diploma in Graphic Design',
        requestDate: '2024-05-10',
        status: 'pending',
        documentUrl: '/docs/charlie-brown-diploma-app.pdf',
    },
    {
        id: 'req-002',
        studentName: 'Diana Prince',
        credentialType: 'PhD in Astrophysics',
        requestDate: '2024-05-09',
        status: 'pending',
        documentUrl: '/docs/diana-prince-phd-app.pdf',
    },
    {
        id: 'req-003',
        studentName: 'Eve Adams',
        credentialType: 'Official Transcript',
        requestDate: '2024-04-20',
        status: 'approved',
        documentUrl: '/docs/eve-adams-transcript-app.pdf',
    },
    {
        id: 'req-004',
        studentName: 'Frank White',
        credentialType: 'Certificate of Attendance',
        requestDate: '2024-04-15',
        status: 'rejected',
        documentUrl: '/docs/frank-white-attendance-app.pdf',
    },
];
