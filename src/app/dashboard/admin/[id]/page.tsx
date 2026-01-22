import { notFound } from "next/navigation";
import { credentialRequests } from "@/lib/data";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { ArrowLeft, Check, ThumbsDown } from "lucide-react";
import Link from "next/link";
import FraudDetection from "@/components/admin/fraud-detection";
import { updateRequestStatus } from "@/lib/actions";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const statusStyles: { [key: string]: string } = {
  pending: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300",
  approved: "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300",
  rejected: "bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300",
};

export default function RequestDetailPage({ params }: { params: { id: string } }) {
  const request = credentialRequests.find((r) => r.id === params.id);

  if (!request) {
    notFound();
  }

  const documentImage = PlaceHolderImages.find((img) => img.id === 'doc.jpg');
  const documentDescription = `An academic document of type ${request.credentialType} submitted by ${request.studentName}.`;
  
  const approveAction = updateRequestStatus.bind(null, request.id, 'approved', `/dashboard/admin/${request.id}`);
  const rejectAction = updateRequestStatus.bind(null, request.id, 'rejected', `/dashboard/admin/${request.id}`);

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
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Document Viewer</CardTitle>
              <CardDescription>Review the supporting document submitted by the student.</CardDescription>
            </CardHeader>
            <CardContent>
              {documentImage && (
                <Image
                  src={documentImage.imageUrl}
                  alt="Academic Document"
                  data-ai-hint={documentImage.imageHint}
                  width={800}
                  height={1100}
                  className="rounded-lg border"
                />
              )}
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
                    <p>{request.requestDate}</p>
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
    </div>
  );
}
