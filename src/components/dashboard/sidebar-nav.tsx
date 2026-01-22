"use client";

import {
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarContent
} from "@/components/ui/sidebar";
import { Shield, LayoutDashboard, FileText, UserCog, GraduationCap, LifeBuoy } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";

const studentLinks = [
    { href: "/dashboard/student", label: "My Credentials", icon: FileText },
];

const adminLinks = [
    { href: "/dashboard/admin", label: "Requests", icon: LayoutDashboard },
];


export function SidebarNav() {
    const pathname = usePathname();
    const isAdmin = pathname.startsWith('/dashboard/admin');

    const links = isAdmin ? adminLinks : studentLinks;
    const role = isAdmin ? 'Admin' : 'Student';
    const Icon = isAdmin ? UserCog : GraduationCap;

    return (
        <>
            <SidebarHeader>
                <div className="flex items-center gap-2">
                    <Shield className="w-8 h-8 text-primary" />
                    <div className="flex flex-col">
                        <span className="text-lg font-headline font-semibold">CertiChain</span>
                        <div className="flex items-center gap-1.5">
                            <Icon className="w-3.5 h-3.5" />
                            <span className="text-xs text-muted-foreground">{role} Portal</span>
                        </div>
                    </div>
                </div>
            </SidebarHeader>

            <SidebarContent>
                <SidebarMenu>
                    {links.map((link) => (
                    <SidebarMenuItem key={link.href}>
                        <SidebarMenuButton
                        asChild
                        isActive={pathname === link.href}
                        >
                            <Link href={link.href}>
                                <link.icon/>
                                <span>{link.label}</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarContent>

            <SidebarFooter>
                <Button variant="ghost">
                    <LifeBuoy className="mr-2"/>
                    Support
                </Button>
            </SidebarFooter>
        </>
    );
}
