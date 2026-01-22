"use client";

import { useFormState, useFormStatus } from "react-dom";
import { createCredentialRequest } from "@/lib/actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "../ui/label";
import { useEffect, useRef } from "react";
import { useToast } from "@/hooks/use-toast";
import { UploadCloud } from "lucide-react";


function SubmitButton() {
    const { pending } = useFormStatus();
    return (
      <Button type="submit" className="w-full" disabled={pending}>
        {pending ? "Submitting..." : "Submit Request"}
      </Button>
    );
}


export default function RequestForm() {
    const initialState = { message: null, success: false };
    const [state, formAction] = useFormState(createCredentialRequest, initialState);
    const formRef = useRef<HTMLFormElement>(null);
    const { toast } = useToast();

    useEffect(() => {
        if (state.message) {
            toast({
                title: state.success ? "Success" : "Error",
                description: state.message,
                variant: state.success ? "default" : "destructive",
            });
            if (state.success) {
                formRef.current?.reset();
            }
        }
    }, [state, toast]);

    return (
        <Card>
            <CardHeader>
                <CardTitle>Request a New Credential</CardTitle>
                <CardDescription>Fill out the form to request a new academic credential.</CardDescription>
            </CardHeader>
            <form action={formAction} ref={formRef}>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="credentialType">Credential Type</Label>
                         <Select name="credentialType" required>
                            <SelectTrigger id="credentialType">
                                <SelectValue placeholder="Select type..." />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Official Transcript">Official Transcript</SelectItem>
                                <SelectItem value="Diploma">Diploma</SelectItem>
                                <SelectItem value="Certificate of Completion">Certificate of Completion</SelectItem>
                                <SelectItem value="Dean's List Certificate">Dean's List Certificate</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="document">Supporting Document</Label>
                        <div className="flex items-center justify-center w-full">
                            <label htmlFor="document" className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-muted hover:bg-muted/80">
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    <UploadCloud className="w-8 h-8 mb-4 text-muted-foreground" />
                                    <p className="mb-2 text-sm text-muted-foreground"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                    <p className="text-xs text-muted-foreground">PDF, PNG, JPG (MAX. 5MB)</p>
                                </div>
                                <Input id="document" name="document" type="file" className="hidden" />
                            </label>
                        </div> 
                    </div>
                </CardContent>
                <CardFooter>
                    <SubmitButton />
                </CardFooter>
            </form>
        </Card>
    );
}
