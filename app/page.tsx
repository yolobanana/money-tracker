import { LandingPage } from "@/components/landing/LandingPage";
import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Home() {
    const user = await getCurrentUser();
    if (user) {
        redirect("/dashboard");
    }
    return <LandingPage />;
}
