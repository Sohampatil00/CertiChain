"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { analyzeDocument } from "@/lib/actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Bot, Loader, ShieldAlert, ShieldCheck } from "lucide-react";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" variant="outline" className="w-full" disabled={pending}>
      {pending ? <Loader className="animate-spin mr-2" /> : <Bot className="mr-2" />}
      {pending ? "Analyzing..." : "Analyze for Fraud"}
    </Button>
  );
}

export default function FraudDetection({ documentDescription }: { documentDescription: string }) {
  const initialState = { isFraudulent: null, reason: null, error: null };
  const [state, formAction] = useActionState(analyzeDocument, initialState);

  return (
    <Card className="bg-gradient-to-br from-primary/5 to-transparent">
      <CardHeader>
        <CardTitle>AI Fraud Detection</CardTitle>
        <CardDescription>Use AI to check the document for potential signs of fraud.</CardDescription>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="space-y-4">
          <input type="hidden" name="documentDescription" value={documentDescription} />
          <SubmitButton />
        </form>

        {state.error && (
            <Alert variant="destructive" className="mt-4">
                <ShieldAlert className="h-4 w-4" />
                <AlertTitle>Analysis Error</AlertTitle>
                <AlertDescription>{state.error}</AlertDescription>
            </Alert>
        )}

        {state.reason && (
            <div className="mt-4 space-y-2">
                <h4 className="font-semibold">Analysis Result:</h4>
                <div className="flex items-center gap-2">
                    {state.isFraudulent ? (
                        <Badge variant="destructive" className="gap-1.5 pl-1.5">
                            <ShieldAlert className="h-3.5 w-3.5"/>
                            Flagged as Fraudulent
                        </Badge>
                    ) : (
                        <Badge className="gap-1.5 pl-1.5 bg-green-600 hover:bg-green-600/90">
                           <ShieldCheck className="h-3.5 w-3.5"/>
                            Looks Clear
                        </Badge>
                    )}
                </div>
                 <p className="text-sm text-muted-foreground italic">
                    &quot;{state.reason}&quot;
                </p>
            </div>
        )}
      </CardContent>
    </Card>
  );
}
