import { ModeToggle } from "@/components/shared/ModeToggle";
import { AppSidebar } from "@/components/shared/Sidebar";
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
        <div className="flex min-h-screen w-full flex-col">
            <ModeToggle />
            <SidebarProvider>
                <AppSidebar user={user}>
                    <SidebarInset>
                        <header className="flex h-16 shrink-0 items-center gap-2 px-4"></header>
                        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                            <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                                <div className="bg-muted/50 aspect-video rounded-xl" />
                                <div className="bg-muted/50 aspect-video rounded-xl" />
                                <div className="bg-muted/50 aspect-video rounded-xl" />
                            </div>
                            <div className="bg-muted/50 min-h-screen flex-1 rounded-xl md:min-h-min" />
                        </div>
                    </SidebarInset>
                </AppSidebar>
                <main className="flex-1 wrapper p-4 mb-8">
                    <SidebarTrigger className="cursor-pointer" />
                    {children}
                </main>
            </SidebarProvider>
        </div>
    );
}
