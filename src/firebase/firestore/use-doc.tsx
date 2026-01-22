// src/firebase/firestore/use-doc.tsx
'use client';

import { useState, useEffect } from 'react';
import { DocumentReference, onSnapshot, doc, getDoc, DocumentData } from 'firebase/firestore';

export function useDoc<T>(ref: DocumentReference<DocumentData> | null) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!ref) {
        setLoading(false);
        return;
    }
    
    const unsubscribe = onSnapshot(ref, (snapshot) => {
      setData(snapshot.exists() ? ({ id: snapshot.id, ...snapshot.data() } as T) : null);
      setLoading(false);
    }, (error) => {
      console.error("useDoc snapshot error: ", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [ref]);

  return { data, loading };
}
