# **App Name**: CertiChain

## Core Features:

- Credential Issuance Request: Students can request the issuance of academic credentials by uploading necessary documents through a secure Firebase web app.
- College Admin Verification: College administrators can verify uploaded documents via the Firebase console and approve or reject credential issuance requests.
- Hash Generation & Blockchain Storage: Upon approval, a SHA-256 hash of the credential data is generated and stored on the Ethereum blockchain using a Firebase Cloud Function.
- QR Code Generation: A QR code is generated containing the blockchain transaction ID, allowing for easy access to credential verification information.
- Credential Verification: Verifiers can scan the QR code or enter the ID to query the smart contract and verify the credential's authenticity against the presented data.
- AI-Powered Fraud Detection Tool: Leverage ML Kit for document validation and flag potentially fraudulent documents for manual review. The tool will decide if a given document should be automatically rejected or simply flagged.
- Role-Based Access Control: Implement role-based access control using Firestore security rules to ensure that only authorized users can access specific functionalities and data.

## Style Guidelines:

- Primary color: Deep blue (#3F51B5) to inspire confidence, trust and security in the academic setting.
- Background color: Light gray (#F5F5F5), very close in hue to the primary color, to give a clean and professional feel.
- Accent color: A vibrant purple (#9C27B0), analogous to the primary, to be used for key CTAs.
- Headline font: 'Space Grotesk' sans-serif for headlines, providing a computerized feel. Body font: 'Inter' sans-serif for body text, a grotesque-style font that looks modern.
- Use simple, professional icons related to credentials, verification, and security.
- Clean, well-spaced layout with clear hierarchy to ensure ease of use and readability.
- Subtle transitions and animations to provide feedback and enhance user experience without being distracting.