import SectionCards from "@/components/section-cards";
import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
    const user = await getCurrentUser();
    if (!user) {
        redirect("/");
    }

    return (
        <div>
            <h1 className="text-2xl font-bold">
                Welcome to your dashboard, {user.name}!
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-1 py-4">
                    <SectionCards userId={user.id} />
                </div>
            </h1>
        </div>
    );
}
