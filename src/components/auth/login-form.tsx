"use client";

import { useFormState, useFormStatus } from "react-dom";
import { login } from "@/lib/actions";
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
import { ArrowRight, CaseSensitive, GraduationCap, UserCog } from "lucide-react";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full bg-accent hover:bg-accent/90" disabled={pending} aria-disabled={pending}>
      {pending ? "Accessing..." : "Proceed"}
      {!pending && <ArrowRight className="ml-2"/>}
    </Button>
  );
}

export function LoginForm() {
  const [state, formAction] = useFormState(login, undefined);
  const [role, setRole] = useState("verifier");

  return (
    <form action={formAction} className="space-y-6">
      <div>
        <Label htmlFor="role-select">Select Your Role</Label>
        <Select name="role" required defaultValue="verifier" onValueChange={setRole}>
          <SelectTrigger id="role-select" className="w-full mt-2">
            <SelectValue placeholder="Select a role..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="verifier">
                <div className="flex items-center gap-2">
                    <CaseSensitive className="w-4 h-4"/>
                    <span>Employer / Verifier</span>
                </div>
            </SelectItem>
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
          </SelectContent>
        </Select>
      </div>
      
      <SubmitButton />

      {state?.message && (
        <p className="text-sm text-red-500 text-center">{state.message}</p>
      )}
    </form>
  );
}
