// src/components/student/credentials-list.tsx
'use client';
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Check, Clock, X, Fingerprint } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useCollection } from "@/firebase";
import { collection, query, where, orderBy, getFirestore } from "firebase/firestore";
import { useFirebase } from "@/firebase/provider";
import type { CredentialRequest, IssuedCredential } from "@/lib/definitions";
import { Skeleton } from "../ui/skeleton";

const statusConfig = {
    pending: { label: "Pending", icon: <Clock className="w-3 h-3" />, color: "bg-yellow-500" },
    approved: { label: "Approved", icon: <Check className="w-3 h-3" />, color: "bg-green-500" },
    rejected: { label: "Rejected", icon: <X className="w-3 h-3" />, color: "bg-red-500" },
};

function IssuedCredentialsList({ userId, loading, credentials }: { userId: string, loading: boolean, credentials: IssuedCredential[] }) {
    const qrCodeImageUrl = "https://picsum.photos/seed/qrcode/80/80";

    return (
         <div className="space-y-4">
            {loading ? (
                Array.from({length: 2}).map((_, i) => (
                    <div key={i} className="flex items-start gap-4 p-4 border rounded-lg">
                        <Skeleton className="w-20 h-20 rounded-md" />
                        <div className="flex-grow space-y-2">
                            <Skeleton className="h-5 w-3/4" />
                            <Skeleton className="h-4 w-1/2" />
                            <Skeleton className="h-4 w-1/3" />
                            <Skeleton className="h-6 w-24 rounded-full mt-2" />
                        </div>
                    </div>
                ))
            ) : (
                <>
                    {credentials.map((cred) => (
                    <div key={cred.id} className="flex items-start gap-4 p-4 border rounded-lg">
                        <Image src={qrCodeImageUrl} alt="QR Code" data-ai-hint="qr code" width={80} height={80} className="rounded-md" />
                        <div className="flex-grow overflow-hidden">
                            <h3 className="font-semibold">{cred.credentialType}</h3>
                            <p className="text-sm text-muted-foreground">Issued: {cred.issuanceDate}</p>
                            <div className="text-xs text-muted-foreground mt-1 flex items-center gap-1.5">
                                <Fingerprint className="w-3 h-3 flex-shrink-0" />
                                <p className="truncate" title={cred.transactionId}>TxID: {cred.transactionId}</p>
                            </div>
                            <Badge variant="outline" className="mt-2 text-green-600 border-green-500/50">
                                <Check className="mr-1 h-3 w-3" />
                                Verified
                            </Badge>
                        </div>
                    </div>
                    ))}
                    {credentials.length === 0 && <p className="text-muted-foreground text-sm py-4">You have no issued credentials.</p>}
                </>
            )}
        </div>
    )
}

function CredentialRequestsList({ userId, loading, requests }: { userId: string, loading: boolean, requests: CredentialRequest[] }) {
     return (
        <div className="space-y-2">
            {loading ? (
                 Array.from({length: 3}).map((_, i) => (
                    <div key={i} className="flex items-center gap-4 p-3 border rounded-lg">
                       <Skeleton className="w-8 h-8 rounded-full" />
                        <div className="flex-grow space-y-2">
                            <Skeleton className="h-5 w-2/3" />
                            <Skeleton className="h-4 w-1/2" />
                        </div>
                        <Skeleton className="h-6 w-20 rounded-full" />
                    </div>
                ))
            ) : (
                <>
                    {requests.map((req) => {
                        const config = statusConfig[req.status];
                        return (
                            <div key={req.id} className="flex items-center gap-4 p-3 border rounded-lg">
                                <div className={cn("w-8 h-8 rounded-full flex items-center justify-center text-white", config.color)}>
                                    {config.icon}
                                </div>
                                <div className="flex-grow">
                                    <p className="font-medium">{req.credentialType}</p>
                                    <p className="text-sm text-muted-foreground">Requested: {new Date(req.requestDate).toLocaleDateString()}</p>
                                </div>
                                <Badge variant={req.status === 'pending' ? 'secondary' : req.status === 'approved' ? 'default' : 'destructive'} className="capitalize">{config.label}</Badge>
                            </div>
                        )
                    })}
                    {requests.length === 0 && <p className="text-muted-foreground text-sm py-4">You have no pending requests.</p>}
                </>
            )}
        </div>
     );
}

export default function CredentialsList({ userId }: { userId: string }) {
    const { firestore } = useFirebase();

    const requestsQuery = firestore ? query(collection(firestore, "credentialRequests"), where("studentId", "==", userId), orderBy("requestDate", "desc")) : null;
    const credentialsQuery = firestore ? query(collection(firestore, "issuedCredentials"), where("studentId", "==", userId), orderBy("issuanceDate", "desc")) : null;
    
    const { data: myRequests, loading: requestsLoading } = useCollection<CredentialRequest>(requestsQuery);
    const { data: myCredentials, loading: credentialsLoading } = useCollection<IssuedCredential>(credentialsQuery);

    return (
        <Card>
            <CardHeader>
                <CardTitle>My Credentials & Requests</CardTitle>
                <CardDescription>View your issued credentials and the status of your pending requests.</CardDescription>
            </CardHeader>
            <CardContent>
                <Accordion type="multiple" defaultValue={['issued-credentials', 'pending-requests']}>
                    <AccordionItem value="issued-credentials">
                        <AccordionTrigger className="text-lg font-semibold">Issued Credentials</AccordionTrigger>
                        <AccordionContent>
                           <IssuedCredentialsList userId={userId} credentials={myCredentials || []} loading={credentialsLoading} />
                        </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="pending-requests">
                        <AccordionTrigger className="text-lg font-semibold">Credential Requests</AccordionTrigger>
                        <AccordionContent>
                            <CredentialRequestsList userId={userId} requests={myRequests || []} loading={requestsLoading} />
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </CardContent>
        </Card>
    );
}
