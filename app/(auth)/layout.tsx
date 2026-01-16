import { ModeToggle } from "@/components/shared/ModeToggle";

export default function AuthLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="flex h-screen flex-col">
            <ModeToggle />
            <main className="flex-1 wrapper">{children}</main>
        </div>
    );
}
