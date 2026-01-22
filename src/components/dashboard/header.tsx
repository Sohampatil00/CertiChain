// src/components/dashboard/header.tsx
'use client';
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { LogOut } from "lucide-react";
import { useUser } from "@/firebase";
import { logout } from "@/lib/actions";
import { Skeleton } from "../ui/skeleton";

function UserAvatar() {
  const { user, loading } = useUser();

  if (loading) {
    return <Skeleton className="h-10 w-10 rounded-full" />;
  }
  
  if (!user) {
    return null;
  }

  const fallback = user.displayName ? user.displayName.charAt(0).toUpperCase() : user.email!.charAt(0).toUpperCase();

  return (
    <Avatar>
      {user.photoURL && <AvatarImage src={user.photoURL} alt={user.displayName || 'User Avatar'} />}
      <AvatarFallback>{fallback}</AvatarFallback>
    </Avatar>
  );
}

export default function DashboardHeader() {
  return (
    <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-card px-4 md:px-6">
      <SidebarTrigger className="md:hidden" />
      <div className="flex-1">
        {/* Can add breadcrumbs or page title here */}
      </div>
      <div className="flex items-center gap-4">
        <UserAvatar />
        <form action={logout}>
            <Button variant="ghost" size="icon" type="submit">
                <LogOut className="h-4 w-4"/>
                <span className="sr-only">Logout</span>
            </Button>
        </form>
      </div>
    </header>
  );
}
