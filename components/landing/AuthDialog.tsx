"use client";

import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LoginForm } from "@/components/login-form";
import { RegisterForm } from "@/components/register-form";

type AuthMode = "login" | "register";

interface AuthDialogProps {
    trigger: React.ReactNode;
    defaultMode?: AuthMode;
}

export function AuthDialog({ trigger, defaultMode = "login" }: AuthDialogProps) {
    const [open, setOpen] = useState(false);
    const [mode, setMode] = useState<AuthMode>(defaultMode);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>{trigger}</DialogTrigger>
            <DialogContent className="sm:max-w-[440px]">
                <DialogHeader>
                    <DialogTitle>
                        {mode === "login"
                            ? "Welcome back"
                            : "Create your account"}
                    </DialogTitle>
                    <DialogDescription>
                        {mode === "login"
                            ? "Log in to keep tracking your money."
                            : "Start tracking your money in seconds."}
                    </DialogDescription>
                </DialogHeader>

                <Tabs
                    value={mode}
                    onValueChange={(v) => setMode(v as AuthMode)}
                    className="w-full"
                >
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="login">Log in</TabsTrigger>
                        <TabsTrigger value="register">Sign up</TabsTrigger>
                    </TabsList>

                    <TabsContent value="login" className="mt-4">
                        <LoginForm
                            embedded
                            onSwitchToRegister={() => setMode("register")}
                        />
                    </TabsContent>

                    <TabsContent value="register" className="mt-4">
                        <RegisterForm
                            embedded
                            onSwitchToLogin={() => setMode("login")}
                        />
                    </TabsContent>
                </Tabs>
            </DialogContent>
        </Dialog>
    );
}
