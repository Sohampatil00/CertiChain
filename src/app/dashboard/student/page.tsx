import CredentialsList from "@/components/student/credentials-list";
import RequestForm from "@/components/student/request-form";
import { Separator } from "@/components/ui/separator";

export default function StudentDashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-headline tracking-tight">Student Dashboard</h1>
        <p className="text-muted-foreground">Request new credentials and view your issued certificates.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
            <RequestForm />
        </div>
        <div className="lg:col-span-2">
            <CredentialsList />
        </div>
      </div>
    </div>
  );
}
