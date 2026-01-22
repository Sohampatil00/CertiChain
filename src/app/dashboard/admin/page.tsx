'use client';

import RequestsTable from "@/components/admin/requests-table";
import { useCollection } from "@/firebase";
import { useFirebase } from "@/firebase/provider";
import { CredentialRequest } from "@/lib/definitions";
import { collection, query, orderBy } from "firebase/firestore";

export default function AdminDashboardPage() {
  const { firestore } = useFirebase();

  const requestsQuery = firestore 
    ? query(collection(firestore, 'credentialRequests'), orderBy('requestDate', 'desc'))
    : null;
    
  const { data: requests, loading } = useCollection<CredentialRequest>(requestsQuery);

  return (
    <div className="space-y-6">
       <div>
        <h1 className="text-3xl font-bold font-headline tracking-tight">Admin Dashboard</h1>
        <p className="text-muted-foreground">Review and manage incoming credential requests.</p>
      </div>
      <RequestsTable requests={requests || []} loading={loading} />
    </div>
  );
}
