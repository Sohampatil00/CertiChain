"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { verifyCredential } from "@/lib/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CheckCircle, HelpCircle, Loader, Search, ThumbsDown, XCircle } from "lucide-react";
import { Label } from "../ui/label";
import { cn } from "@/lib/utils";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full sm:w-auto" aria-disabled={pending}>
      {pending ? <Loader className="animate-spin" /> : <Search />}
      <span className="ml-2">{pending ? "Verifying..." : "Verify"}</span>
    </Button>
  );
}

const resultIcons = {
    verified: <CheckCircle className="h-5 w-5 text-green-500" />,
    not_found: <HelpCircle className="h-5 w-5 text-yellow-500" />,
    revoked: <ThumbsDown className="h-5 w-5 text-orange-500" />,
    error: <XCircle className="h-5 w-5 text-destructive" />,
    idle: null
};

const resultStyles = {
    verified: "border-green-500/50 text-green-700 dark:text-green-400",
    not_found: "border-yellow-500/50 text-yellow-700 dark:text-yellow-400",
    revoked: "border-orange-500/50 text-orange-700 dark:text-orange-400",
    error: "border-destructive/50 text-destructive",
    idle: "hidden"
}

export default function VerificationForm() {
  const initialState = { status: "idle" as const, message: "", credential: null };
  const [state, formAction] = useActionState(verifyCredential, initialState);

  return (
    <div className="space-y-6">
      <form action={formAction} className="space-y-4">
        <div className="space-y-2">
            <Label htmlFor="credentialId">Credential ID or Transaction Hash</Label>
            <div className="flex flex-col sm:flex-row gap-2">
                <Input
                id="credentialId"
                name="credentialId"
                placeholder="0xabc123 or cred-167..."
                required
                className="flex-grow"
                />
                <SubmitButton />
            </div>
        </div>
      </form>

      <Alert className={cn("transition-all", resultStyles[state.status])}>
        <div className="flex items-center gap-3">
            {resultIcons[state.status]}
            <div>
                <AlertTitle className="font-semibold capitalize">{state.status.replace('_', ' ')}</AlertTitle>
                <AlertDescription>
                    {state.message}
                </AlertDescription>
            </div>
        </div>
        {state.credential && (
            <div className="mt-4 pt-4 border-t border-current/30 text-sm space-y-1">
                <p><strong>Student:</strong> {state.credential.studentName}</p>
                <p><strong>Credential:</strong> {state.credential.credentialType}</p>
                <p><strong>Issuer:</strong> {state.credential.issuer}</p>
                <p><strong>Issuance Date:</strong> {state.credential.issuanceDate}</p>
            </div>
        )}
      </Alert>
    </div>
  );
}
