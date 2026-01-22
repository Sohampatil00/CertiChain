<div align="center">

# CertiChain 🔗📜
### Decentralized Academic Credentials System
**BTech Mini Project | Firebase + Blockchain**
<img width="4569" height="310" alt="deepseek_mermaid_20260122_c999c6" src="https://github.com/user-attachments/assets/665254b3-6289-4d1c-a596-ce2cc6985d64" />

<p>
  <img src="https://img.shields.io/badge/CertiChain-Academic_Credentials_System-blue" alt="CertiChain" />
  <img src="https://img.shields.io/badge/Firebase-Backend-FFCA28?logo=firebase" alt="Firebase" />
  <img src="https://img.shields.io/badge/Blockchain-Immutable_Storage-3C3C3D?logo=ethereum" alt="Blockchain" />
  <img src="https://img.shields.io/badge/Next.js-Frontend-000000?logo=next.js" alt="Next.js" />
  <img src="https://img.shields.io/badge/TypeScript-5.0-007ACC?logo=typescript" alt="TypeScript" />
</p>

</div>

---

### 🎯 Overview
**CertiChain** is a decentralized academic credentials verification system designed to combat credential fraud in education and employment sectors. By combining Firebase's real-time capabilities with blockchain's immutability, we create a tamper-proof, transparent, and efficient ecosystem for issuing, storing, and verifying academic certificates.

## 🎯 Problem vs. Solution

| ❌ The Problem | ✅ Our Solution |
| :--- | :--- |
| **Credential Fraud** <br> Fake degrees and certificates cost billions annually. | **Immutable Records** <br> Cryptographic hashes stored on Ethereum blockchain prevent tampering. |
| **Verification Delays** <br> Manual verification processes can take weeks. | **Instant Verification** <br> QR-code based verification confirms authenticity in seconds. |
| **Centralized Risks** <br> Traditional databases have single points of failure. | **Student Ownership** <br> Decentralized storage means students fully own and control their data. |
| **Lack of Portability** <br> Students rely on institutions to share records. | **Transparent Audit Trail** <br> Complete, immutable history visible to authorized parties. |

## ✨ Key Features
| Feature | User Benefit | Tech Used |
| :--- | :--- | :--- |
| **🎓 Instant Verification** | Verify credentials in <5 seconds | QR Codes + Blockchain |
| **🔒 Tamper-Proof Records** | Impossible to forge or alter | Ethereum Smart Contracts |
| **📱 Mobile-First Design** | Access anywhere on any device | Responsive PWA |
| **👥 Multi-Role System** | Separate interfaces for Users/Admins | Firebase Auth + Firestore |

## 🛠️ Tech Stack

### Frontend & UI
<p align="center">
  <img src="https://skillicons.dev/icons?i=nextjs,react,typescript,tailwind" alt="Frontend Tech Stack" height="50">
</p>

### Backend & Database
<p align="center">
  <img src="https://skillicons.dev/icons?i=firebase,nodejs" alt="Backend Tech Stack" height="50">
</p>

### Blockchain & Storage
<p align="center">
  <img src="https://skillicons.dev/icons?i=solidity,ethereum" alt="Blockchain Tech Stack" height="50">
  <img src="https://upload.wikimedia.org/wikipedia/commons/1/18/Ipfs-logo-1024-ice-text.png" alt="IPFS" height="45" style="margin-bottom: 5px;">
</p>
<img width="3174" height="2026" alt="deepseek_mermaid_20260122_106773" src="https://github.com/user-attachments/assets/406cec1e-22d0-4a9a-8133-3bbde73c546d" />

---

## 🚀 Quick Start

### 1. Prerequisites
* Node.js 18+
* npm / yarn
* Git
* MetaMask (Browser Extension)

### 2. Installation
```bash
# Clone repository
git clone [https://github.com/Sohampatil00/CertiChain.git](https://github.com/Sohampatil00/CertiChain.git)
cd CertiChain

# Install dependencies
npm install

# Configure environment
cp .env.example .env.local
# Edit .env.local with your API keys

# Install Firebase CLI
npm install -g firebase-tools
`````

### 3.Smart Contracts
```bash
# Deploy to local blockchain
cd blockchain
npm install
npx hardhat compile
npx hardhat run scripts/deploy.js --network localhost
````
### How it Works
| Data Type           | Storage Location        | Purpose                        |
| ------------------- | ----------------------- | ------------------------------ |
| User Profiles       | Firestore               | Fast access, real-time updates |
| Credential Metadata | Firestore + Blockchain  | Redundant security             |
| Document Files      | Firebase Storage + IPFS | Backup & decentralization      |
| Verification Hashes | Ethereum Blockchain     | Immutable proof                |
| Audit Logs          | Firestore               | Activity tracking              |


🤝 Contributing
We welcome contributions! Please see our Contributing Guidelines for details.

Fork the repository

Create a feature branch (git checkout -b feature/AmazingFeature)

Commit your changes (git commit -m 'Add AmazingFeature')

Push to the branch (git push origin feature/AmazingFeature)

Open a Pull Request

📄 License
Distributed under the MIT License. See LICENSE for more information.

📬 Contact & Support
Project Maintainer: Soham Patil

GitHub: @Sohampatil00

Project Link: https://github.com/Sohampatil00/CertiChain

<div align="center"> <h3>⭐ Support the Project</h3> <p>If you find this project useful, please give it a star on GitHub!</p>

<img src="https://api.star-history.com/svg?repos=Sohampatil00/CertiChain&type=Date" alt="Star History" width="70%">

<p><i>Built with ❤️ for secure academic credentials</i></p> </div>
