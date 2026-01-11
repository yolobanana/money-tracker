import { RegisterForm } from "@/components/register-form";
import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function RegisterPage() {
    const user = await getCurrentUser();
    if (user) {
        redirect("/dashboard");
    }
    return (
        <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
            <main className="flex min-h-screen w-full flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
                <div className="flex w-full items-center justify-center p-6 md:p-10">
                    <div className="w-full max-w-sm">
                        <RegisterForm />
                    </div>
                </div>
            </main>
        </div>
    );
}
