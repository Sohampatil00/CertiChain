import VerificationForm from "@/components/verification/verification-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ShieldCheck } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function VerifyPage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-background p-4">
      <div className="w-full max-w-2xl">
        <Card className="shadow-2xl">
          <CardHeader className="text-center">
             <div className="flex justify-center items-center mb-4">
                <ShieldCheck className="w-12 h-12 text-primary"/>
            </div>
            <CardTitle className="text-3xl font-headline">Verify a Credential</CardTitle>
            <CardDescription>
              Enter a Credential ID or Transaction Hash to verify its authenticity.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <VerificationForm />
          </CardContent>
        </Card>
        <div className="text-center mt-6">
          <Button variant="link" asChild>
            <Link href="/">Return to Home</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
