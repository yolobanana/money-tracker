"use client";

import { ChevronUp, DollarSign, LogOut, User2 } from "lucide-react";

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { logout } from "@/app/actions/auth";
import { useActionState } from "react";

// Navigation items
const navItems = [
    {
        title: "Dashboard",
        url: "/dashboard",
    },
    {
        title: "Transactions",
        url: "/transactions",
    },
    {
        title: "Wallets",
        url: "/wallets",
    },
    {
        title: "Categories",
        url: "/categories",
    },
];

export function AppSidebar({
    ...props
}: React.ComponentProps<typeof Sidebar> & {
    user: {
        id: string;
        name?: string | null | undefined;
        email?: string | null | undefined;
        image?: string | null | undefined;
    };
}) {
    const [_, handleSignout] = useActionState(logout, undefined);
    const pathname = usePathname();

    return (
        <Sidebar variant="floating" {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <div>
                                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                                    <DollarSign className="size-4" />
                                </div>
                                <div className="flex flex-col gap-0.5 leading-none">
                                    <span className="font-medium">
                                        Money Tracker
                                    </span>
                                    <span className="">v1.0.0</span>
                                </div>
                            </div>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarMenu className="gap-2">
                        {navItems.map((item) => (
                            <SidebarMenuItem key={item.title}>
                                <SidebarMenuButton
                                    asChild
                                    isActive={pathname === item.url || pathname.startsWith(item.url + "/")}
                                >
                                    <Link
                                        href={item.url}
                                        className="font-medium"
                                    >
                                        {item.title}
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        ))}
                    </SidebarMenu>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <SidebarMenuButton>
                                    <User2 /> {props.user.name}
                                    <ChevronUp className="ml-auto" />
                                </SidebarMenuButton>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                side="top"
                                className="w-[--radix-popper-anchor-width]"
                            >
                                <DropdownMenuItem
                                    onClick={() => handleSignout()}
                                >
                                    <LogOut />
                                    <span>Sign out</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    );
}
