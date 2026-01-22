// src/app/dashboard/page.tsx
'use client';
import { useUser } from "@/firebase";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardRootPage() {
    const { user, loading, claims } = useUser();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !user) {
            // If not loading and no user, redirect to login
            router.push('/login');
        } else if (!loading && user && claims) {
            // Once we have user and claims, redirect based on role
            if (claims.role === 'admin') {
                router.push('/dashboard/admin');
            } else if (claims.role === 'student') {
                router.push('/dashboard/student');
            } else {
                // Default redirect for other roles or if role is not set
                router.push('/verify');
            }
        }
    }, [user, loading, claims, router]);

    // Display a loading state while determining the redirect
    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="space-y-4 w-full max-w-md">
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-32 w-full" />
                <Skeleton className="h-12 w-full" />
            </div>
        </div>
    );
}
