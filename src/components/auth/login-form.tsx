// src/components/auth/login-form.tsx
"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { loginWithGoogle, setRoleAction } from "@/lib/actions";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "../ui/label";
import { useState } from "react";
import { ArrowRight, CaseSensitive, GraduationCap, UserCog, UserPlus } from "lucide-react";
import { useUser } from "@/firebase";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";


function GoogleSignInButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full" disabled={pending}>
      <svg className="mr-2 -ml-1 w-4 h-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512"><path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 126 23.4 172.9 61.9l-76.2 64.5C308.6 106.5 280.2 96 248 96c-88.8 0-160.1 71.1-160.1 160s71.3 160 160.1 160c98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 26.9 3.9 41.4z"></path></svg>
      {pending ? "Redirecting..." : "Sign in with Google"}
    </Button>
  );
}

function RoleSelectionForm() {
    const [state, formAction] = useActionState(setRoleAction, { message: null });
    const { pending } = useFormStatus();

    return (
        <form action={formAction} className="space-y-6">
             <Alert>
                <UserPlus className="h-4 w-4" />
                <AlertTitle>One last step!</AlertTitle>
                <AlertDescription>
                    Please select a role to complete your registration.
                </AlertDescription>
            </Alert>

            <div>
                <Label htmlFor="role-select">Select Your Role</Label>
                <Select name="role" required defaultValue="student">
                <SelectTrigger id="role-select" className="w-full mt-2">
                    <SelectValue placeholder="Select a role..." />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="student">
                        <div className="flex items-center gap-2">
                            <GraduationCap className="w-4 h-4"/>
                            <span>Student</span>
                        </div>
                    </SelectItem>
                    <SelectItem value="admin">
                        <div className="flex items-center gap-2">
                            <UserCog className="w-4 h-4"/>
                            <span>College Admin</span>
                        </div>
                    </SelectItem>
                    <SelectItem value="verifier">
                        <div className="flex items-center gap-2">
                            <CaseSensitive className="w-4 h-4"/>
                            <span>Employer / Verifier</span>
                        </div>
                    </SelectItem>
                </SelectContent>
                </Select>
            </div>
            
            <Button type="submit" className="w-full" disabled={pending}>
                {pending ? "Saving..." : "Complete Sign Up"}
                {!pending && <ArrowRight className="ml-2"/>}
            </Button>
            
            {state?.message && (
                <p className="text-sm text-red-500 text-center">{state.message}</p>
            )}
        </form>
    );
}


export function LoginForm() {
    const { user, claims, loading } = useUser();
    
    // If loading, show nothing to prevent flash of content
    if (loading) {
        return null; 
    }

    // If user is logged in but has no role claim, show role selection
    if (user && !claims?.role) {
        return <RoleSelectionForm />;
    }

    // Default to Google Sign In
    return (
        <form action={loginWithGoogle}>
            <GoogleSignInButton />
        </form>
    );
}
