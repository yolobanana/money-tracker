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
import { useActionState } from "react";
import Link from "next/link";
import { useFormStatus } from "react-dom";

export function LoginForm({
    className,
    ...props
}: React.ComponentProps<"div">) {
    const [state, action] = useActionState(signInWithCredentials, {});
    const { pending: isPending } = useFormStatus();

    const SignInButton = () => {
        const { pending } = useFormStatus();
        return (
            <Button type="submit" disabled={pending}>
                {pending ? "Signing account..." : "Log In"}
            </Button>
        );
    };

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card>
                <CardHeader>
                    <CardTitle>Login to your account</CardTitle>
                    <CardDescription>
                        Enter your email below to login to your account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form action={action}>
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
                            {state?.error && (
                                <FieldDescription className="text-sm text-red-500 text-center">
                                    {state.error}
                                </FieldDescription>
                            )}
                            <Field>
                                <SignInButton />
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
                                    <Link
                                        href="/register"
                                        className="underline underline-offset-4"
                                    >
                                        Register
                                    </Link>
                                </FieldDescription>
                            </Field>
                        </FieldGroup>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
