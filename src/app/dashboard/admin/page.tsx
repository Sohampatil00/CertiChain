import RequestsTable from "@/components/admin/requests-table";
import { credentialRequests } from "@/lib/data";

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
       <div>
        <h1 className="text-3xl font-bold font-headline tracking-tight">Admin Dashboard</h1>
        <p className="text-muted-foreground">Review and manage incoming credential requests.</p>
      </div>
      <RequestsTable requests={credentialRequests} />
    </div>
  );
}
