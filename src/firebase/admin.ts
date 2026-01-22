// src/firebase/admin.ts
import { initializeApp, getApp, getApps, App, cert } from 'firebase-admin/app';
import { getAuth, Auth } from 'firebase-admin/auth';
import { getFirestore, Firestore } from 'firebase-admin/firestore';

const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT_KEY
  ? JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY)
  : null;

const app: App =
  getApps().length > 0
    ? getApp()
    : initializeApp(
      serviceAccount
        ? { credential: cert(serviceAccount) }
        : {}
    );

const db: Firestore = getFirestore(app);
const auth: Auth = getAuth(app);

export function getAdminApp() {
  return { db, auth, app };
}
