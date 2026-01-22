// src/firebase/firestore/use-collection.tsx
'use client';

import { useState, useEffect } from 'react';
import { CollectionReference, Query, onSnapshot, DocumentData } from 'firebase/firestore';

export function useCollection<T>(query: CollectionReference<DocumentData> | Query<DocumentData> | null) {
  const [data, setData] = useState<T[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!query) {
        setLoading(false);
        return;
    }
    const unsubscribe = onSnapshot(query, (snapshot) => {
      const result: T[] = [];
      snapshot.forEach((doc) => {
        result.push({ id: doc.id, ...doc.data() } as T);
      });
      setData(result);
      setLoading(false);
    }, (error) => {
        console.error("useCollection snapshot error: ", error);
        setLoading(false);
    });

    return () => unsubscribe();
  }, [query]);

  return { data, loading };
}
