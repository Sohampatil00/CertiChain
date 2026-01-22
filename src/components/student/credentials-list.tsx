import { credentialRequests, issuedCredentials } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Check, Clock, FileText, ThumbsDown, X } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const statusConfig = {
    pending: { label: "Pending", icon: <Clock className="w-3 h-3" />, color: "bg-yellow-500" },
    approved: { label: "Approved", icon: <Check className="w-3 h-3" />, color: "bg-green-500" },
    rejected: { label: "Rejected", icon: <X className="w-3 h-3" />, color: "bg-red-500" },
};

export default function CredentialsList() {
    const myRequests = credentialRequests.filter(r => r.studentName === 'Alice Johnson' || r.studentName === 'Charlie Brown' || r.studentName === 'Diana Prince');
    const myCredentials = issuedCredentials.filter(c => c.studentName === 'Alice Johnson');
    const qrCodeImage = PlaceHolderImages.find(img => img.id === 'qr-code.png');

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
                             <div className="space-y-4">
                                {myCredentials.map((cred) => (
                                <div key={cred.id} className="flex items-start gap-4 p-4 border rounded-lg">
                                    {qrCodeImage && <Image src={qrCodeImage.imageUrl} alt="QR Code" data-ai-hint={qrCodeImage.imageHint} width={80} height={80} className="rounded-md" />}
                                    <div className="flex-grow">
                                        <h3 className="font-semibold">{cred.credentialType}</h3>
                                        <p className="text-sm text-muted-foreground">Issued: {cred.issuanceDate}</p>
                                        <p className="text-xs text-muted-foreground mt-1">ID: {cred.id}</p>
                                        <Badge variant="outline" className="mt-2 text-green-600 border-green-500/50">
                                            <Check className="mr-1 h-3 w-3" />
                                            Verified
                                        </Badge>
                                    </div>
                                </div>
                                ))}
                                {myCredentials.length === 0 && <p className="text-muted-foreground text-sm py-4">You have no issued credentials.</p>}
                             </div>
                        </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="pending-requests">
                        <AccordionTrigger className="text-lg font-semibold">Credential Requests</AccordionTrigger>
                        <AccordionContent>
                            <div className="space-y-2">
                                {myRequests.map((req) => {
                                    const config = statusConfig[req.status];
                                    return (
                                        <div key={req.id} className="flex items-center gap-4 p-3 border rounded-lg">
                                            <div className={cn("w-8 h-8 rounded-full flex items-center justify-center text-white", config.color)}>
                                                {config.icon}
                                            </div>
                                            <div className="flex-grow">
                                                <p className="font-medium">{req.credentialType}</p>
                                                <p className="text-sm text-muted-foreground">Requested: {req.requestDate}</p>
                                            </div>
                                            <Badge variant={req.status === 'pending' ? 'secondary' : req.status === 'approved' ? 'default' : 'destructive'} className="capitalize">{config.label}</Badge>
                                        </div>
                                    )
                                })}
                                {myRequests.length === 0 && <p className="text-muted-foreground text-sm py-4">You have no pending requests.</p>}
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </CardContent>
        </Card>
    );
}
