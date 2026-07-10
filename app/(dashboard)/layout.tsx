import { ModeToggle } from "@/components/shared/ModeToggle";
import { AppSidebar } from "@/components/shared/Sidebar";
import { MobileNav } from "@/components/shared/MobileNav";
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar";
import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const user = await getCurrentUser();
    if (!user) {
        redirect("/");
    }

    return (
        <SidebarProvider>
            <AppSidebar user={user} />
            <SidebarInset>
                <header className="sticky top-0 z-30 flex h-14 shrink-0 items-center gap-2 border-b bg-background/80 px-3 backdrop-blur sm:h-16 sm:px-4">
                    <SidebarTrigger className="hidden cursor-pointer md:flex" />
                    <span className="font-semibold">Money Tracker</span>
                </header>
                <main className="flex-1 p-3 pb-28 sm:p-4 sm:pb-8">
                    {children}
                </main>
            </SidebarInset>
            <MobileNav />
            <ModeToggle />
        </SidebarProvider>
    );
}
