// src/app/dashboard/admin/[id]/page.tsx
'use client';

import { notFound } from "next/navigation";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { ArrowLeft, Check, ThumbsDown } from "lucide-react";
import Link from "next/link";
import FraudDetection from "@/components/admin/fraud-detection";
import { updateRequestStatus } from "@/lib/actions";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useDoc } from "@/firebase";
import { doc, getFirestore } from "firebase/firestore";
import { useFirebase } from "@/firebase/provider";
import type { CredentialRequest } from "@/lib/definitions";
import { Skeleton } from "@/components/ui/skeleton";

const statusStyles: { [key: string]: string } = {
  pending: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300",
  approved: "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300",
  rejected: "bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300",
};

function RequestDetailContent({ request, id }: { request: CredentialRequest, id: string }) {
    const documentDescription = `An academic document of type ${request.credentialType} submitted by ${request.studentName}.`;
  
    const approveAction = updateRequestStatus.bind(null, id, 'approved', `/dashboard/admin/${id}`);
    const rejectAction = updateRequestStatus.bind(null, id, 'rejected', `/dashboard/admin/${id}`);

    return (
        <>
            <div className="grid md:grid-cols-3 gap-8">
                <div className="md:col-span-2">
                <Card>
                    <CardHeader>
                    <CardTitle>Document Viewer</CardTitle>
                    <CardDescription>Review the supporting document submitted by the student.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Image
                            src={'https://picsum.photos/seed/doc/800/1100'}
                            alt="Academic Document"
                            data-ai-hint="document certificate"
                            width={800}
                            height={1100}
                            className="rounded-lg border"
                        />
                    </CardContent>
                </Card>
                </div>
                <div className="md:col-span-1 space-y-8">
                <Card>
                    <CardHeader>
                    <CardTitle>Request Details</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 text-sm">
                        <div>
                            <p className="font-medium text-muted-foreground">Student</p>
                            <p>{request.studentName}</p>
                        </div>
                        <div>
                            <p className="font-medium text-muted-foreground">Credential Type</p>
                            <p>{request.credentialType}</p>
                        </div>
                        <div>
                            <p className="font-medium text-muted-foreground">Request Date</p>
                            <p>{new Date(request.requestDate).toLocaleDateString()}</p>
                        </div>
                        <div>
                            <p className="font-medium text-muted-foreground">Status</p>
                            <Badge className={cn("capitalize", statusStyles[request.status])}>{request.status}</Badge>
                        </div>
                    </CardContent>
                    <CardFooter className="flex gap-2">
                        <form action={approveAction}>
                            <Button type="submit" disabled={request.status !== 'pending'}>
                                <Check className="mr-2 h-4 w-4"/>
                                Approve
                            </Button>
                        </form>
                        <form action={rejectAction}>
                            <Button type="submit" variant="destructive" disabled={request.status !== 'pending'}>
                                <ThumbsDown className="mr-2 h-4 w-4"/>
                                Reject
                            </Button>
                        </form>
                    </CardFooter>
                </Card>

                <FraudDetection documentDescription={documentDescription} />
                </div>
            </div>
        </>
    )
}

function RequestDetailSkeleton() {
    return (
        <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
                <Card>
                    <CardHeader>
                        <Skeleton className="h-8 w-1/2" />
                        <Skeleton className="h-4 w-3/4" />
                    </CardHeader>
                    <CardContent>
                        <Skeleton className="w-full h-[1100px] rounded-lg" />
                    </CardContent>
                </Card>
            </div>
            <div className="md:col-span-1 space-y-8">
                <Card>
                    <CardHeader>
                         <Skeleton className="h-8 w-3/4" />
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-2">
                           <Skeleton className="h-4 w-1/4" />
                           <Skeleton className="h-5 w-1/2" />
                        </div>
                         <div className="space-y-2">
                           <Skeleton className="h-4 w-1/4" />
                           <Skeleton className="h-5 w-3/4" />
                        </div>
                         <div className="space-y-2">
                           <Skeleton className="h-4 w-1/4" />
                           <Skeleton className="h-5 w-1/2" />
                        </div>
                         <div className="space-y-2">
                           <Skeleton className="h-4 w-1/4" />
                           <Skeleton className="h-6 w-1/3" />
                        </div>
                    </CardContent>
                    <CardFooter className="flex gap-2">
                        <Skeleton className="h-10 w-28" />
                        <Skeleton className="h-10 w-28" />
                    </CardFooter>
                </Card>
                <Card>
                    <CardHeader>
                         <Skeleton className="h-8 w-3/4" />
                          <Skeleton className="h-4 w-full" />
                    </CardHeader>
                    <CardContent>
                        <Skeleton className="h-10 w-full" />
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default function RequestDetailPage({ params }: { params: { id: string } }) {
  const { firestore } = useFirebase();
  const requestRef = firestore ? doc(firestore, "credentialRequests", params.id) : null;
  const { data: request, loading } = useDoc<CredentialRequest>(requestRef);

  if (loading) {
    return (
        <div className="space-y-6">
            <div>
                <Skeleton className="h-10 w-40" />
            </div>
            <RequestDetailSkeleton />
        </div>
    )
  }

  if (!request) {
    notFound();
  }

  return (
    <div className="space-y-6">
        <div>
            <Button variant="outline" asChild>
                <Link href="/dashboard/admin">
                    <ArrowLeft className="mr-2 h-4 w-4"/>
                    Back to Requests
                </Link>
            </Button>
        </div>
        <RequestDetailContent request={request} id={params.id} />
    </div>
  );
}
