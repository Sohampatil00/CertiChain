import { redirect } from "next/navigation";

export default function DashboardRootPage() {
    // Default redirect for anyone landing on /dashboard
    redirect('/login');
}
