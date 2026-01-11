"use server";

import { prisma } from "@/lib/prisma";
import { registerSchema } from "@/schemas/auth.schema";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";

export type RegisterState = {
    error?: string;
};

export async function registerUser(
    _: RegisterState,
    formData: FormData
): Promise<RegisterState> {
    const parsed = registerSchema.safeParse({
        name: formData.get("name"),
        email: formData.get("email"),
        password: formData.get("password"),
    });

    if (!parsed.success) {
        return {
            error: parsed.error.issues[0].message,
        };
    }

    const { name, email, password } = parsed.data;

    const exists = await prisma.user.findUnique({
        where: { email },
    });

    if (exists) {
        return { error: "Email already registered" };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.create({
        data: {
            name,
            email,
            passwordHash: hashedPassword,
        },
    });

    redirect(`/?email=${encodeURIComponent(email)}`);
}
