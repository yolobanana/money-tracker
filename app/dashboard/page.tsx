import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
    const user = await getCurrentUser();
    if (!user) {
        redirect("/");
    }

    return <div>Welcome {user.name} to your dashboard!</div>;
}
