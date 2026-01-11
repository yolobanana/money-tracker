"use client";

import { signInSchema } from "@/schemas/auth.schema";
import { signIn, signOut } from "next-auth/react";
import { redirect } from "next/navigation";

export async function signInWithCredentials(
    data: unknown
): Promise<{ error?: string }> {
    console.log("Signing in with credentials", data);
    const parsed = signInSchema.safeParse(data);

    if (!parsed.success) {
        console.log(parsed.error);
        return { error: `Invalid input` };
    }

    const { email, password } = parsed.data;

    try {
        const result = await signIn("credentials", {
            email,
            password,
            redirect: false,
        });

         // @ts-ignore
        if (result?.error) {
            // @ts-ignore
            return { error: "Invalid credentials" };
        }

        return {};
    } catch (error) {
        return { error: `Something went wrong. ${error}` };
    }
}

export async function signInWithGoogle() {
    await signIn("google", {
        redirectTo: "/dashboard",
    });
}

export async function logout() {
    await signOut({});
    redirect("/");
}
