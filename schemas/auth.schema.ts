import { z } from "zod";

export const signInSchema = z.object({
  email: z
    .email("Invalid email address"),
  password: z
    .string("Password is required" )
    .min(8, "Password must be at least 8 characters"),
});

export const registerSchema = z.object({
  name: z
    .string({ error: "Name is required" })
    .min(2, "Name must be at least 2 characters"),
  email: z
    .email("Invalid email address"),
  password: z
    .string({ error: "Password is required" })
    .min(8, "Password must be at least 8 characters"),
})

export type RegisterInput = z.infer<typeof registerSchema>;

export type SignInInput = z.infer<typeof signInSchema>;
