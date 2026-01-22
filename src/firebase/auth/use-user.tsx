// src/firebase/auth/use-user.tsx
'use client';
import { useState, useEffect } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { useAuth } from '../provider';
import { doc, getDoc } from 'firebase/firestore';
import { useFirestore } from '../provider';

interface AuthState {
  user: User | null;
  claims: any | null;
  loading: boolean;
}

export function useUser(): AuthState {
  const auth = useAuth();
  const firestore = useFirestore();
  const [userState, setUserState] = useState<AuthState>({
    user: null,
    claims: null,
    loading: true,
  });

  useEffect(() => {
    if (!auth || !firestore) {
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const tokenResult = await user.getIdTokenResult();
        const userDoc = await getDoc(doc(firestore, 'users', user.uid));
        
        let role = tokenResult.claims.role;
        if (userDoc.exists()) {
            const userData = userDoc.data();
            if(userData.role){
                role = userData.role;
            }
        }

        setUserState({ user, claims: {...tokenResult.claims, role}, loading: false });
      } else {
        setUserState({ user: null, claims: null, loading: false });
      }
    });

    return () => unsubscribe();
  }, [auth, firestore]);

  return userState;
}
