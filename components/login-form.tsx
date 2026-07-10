"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { signInWithCredentials, signInWithGoogle } from "@/app/actions/auth";
import Link from "next/link";
import React, { useState, useTransition } from "react";

interface LoginFormProps extends React.ComponentProps<"div"> {
    /** Render without the outer Card (e.g. inside a dialog). */
    embedded?: boolean;
    /** When provided, the "Register" link switches mode instead of navigating. */
    onSwitchToRegister?: () => void;
}

export function LoginForm({
    className,
    embedded = false,
    onSwitchToRegister,
    ...props
}: LoginFormProps) {
    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<string | null>(null);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setError(null);

        const form = new FormData(e.currentTarget);
        const data = {
            email: String(form.get("email") ?? "").trim(),
            password: String(form.get("password") ?? ""),
        };

        startTransition(async () => {
            const res = await signInWithCredentials(data);
            if (res?.error) {
                setError(res.error);
            } else {
                // successful sign in — redirect (adjust path as desired)
                window.location.href = "/dashboard";
            }
        });
    }

    const formBody = (
        <form onSubmit={handleSubmit}>
                        <FieldGroup>
                            <Field>
                                <FieldLabel htmlFor="email">Email</FieldLabel>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="m@example.com"
                                    required
                                    disabled={isPending}
                                />
                            </Field>
                            <Field>
                                <div className="flex items-center">
                                    <FieldLabel htmlFor="password">
                                        Password
                                    </FieldLabel>
                                    <a
                                        href="#"
                                        className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                                    >
                                        Forgot your password?
                                    </a>
                                </div>
                                <Input
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                />
                            </Field>
                            {error && (
                                <FieldDescription className="text-sm text-red-500 text-center">
                                    {error}
                                </FieldDescription>
                            )}
                            <Field>
                                <Button type="submit" disabled={isPending}>
                                    {isPending
                                        ? "Signing account..."
                                        : "Log In"}
                                </Button>
                                <Button
                                    variant="outline"
                                    type="button"
                                    disabled={isPending}
                                    onClick={() => signInWithGoogle()}
                                >
                                    Login with Google
                                </Button>
                                <FieldDescription className="text-center">
                                    Don&apos;t have an account?{" "}
                                    {onSwitchToRegister ? (
                                        <button
                                            type="button"
                                            onClick={onSwitchToRegister}
                                            className="underline underline-offset-4"
                                        >
                                            Register
                                        </button>
                                    ) : (
                                        <Link
                                            href="/register"
                                            className="underline underline-offset-4"
                                        >
                                            Register
                                        </Link>
                                    )}
                                </FieldDescription>
                            </Field>
                        </FieldGroup>
                    </form>
    );

    if (embedded) {
        return (
            <div className={cn("flex flex-col gap-6", className)} {...props}>
                {formBody}
            </div>
        );
    }

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card>
                <CardHeader>
                    <CardTitle>Login to your account</CardTitle>
                    <CardDescription>
                        Enter your email below to login to your account
                    </CardDescription>
                </CardHeader>
                <CardContent>{formBody}</CardContent>
            </Card>
        </div>
    );
}
