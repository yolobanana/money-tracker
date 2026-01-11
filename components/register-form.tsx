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
import Link from "next/link";
import { registerUser } from "@/app/actions/register";
import { useFormState, useFormStatus } from "react-dom";
import { useActionState } from "react";

function SubmitButton() {
    const { pending } = useFormStatus();

    return (
        <Button type="submit" disabled={pending}>
            {pending ? "Creating account..." : "Sign up"}
        </Button>
    );
}

export function RegisterForm({
    className,
    ...props
}: React.ComponentProps<"div">) {
    const [state, action] = useActionState(registerUser, {});
    const { pending: isPending } = useFormStatus();

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card>
                <CardHeader>
                    <CardTitle>Create an account</CardTitle>
                    <CardDescription>
                        Enter your details below to create your account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form action={action}>
                        <FieldGroup>
                            <Field>
                                <FieldLabel htmlFor="name">Name</FieldLabel>
                                <Input
                                    id="name"
                                    name="name"
                                    required
                                    disabled={isPending}
                                />
                            </Field>

                            <Field>
                                <FieldLabel htmlFor="email">Email</FieldLabel>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    disabled={isPending}
                                />
                            </Field>

                            <Field>
                                <FieldLabel htmlFor="password">
                                    Password
                                </FieldLabel>
                                <Input
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                    disabled={isPending}
                                />
                            </Field>

                            {state?.error && (
                                <FieldDescription className="text-sm text-red-500 text-center">
                                    {state.error}
                                </FieldDescription>
                            )}

                            <Field>
                                <SubmitButton />

                                <FieldDescription className="text-center">
                                    Already have an account?{" "}
                                    <Link
                                        href="/login"
                                        className="underline underline-offset-4"
                                    >
                                        Login
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
