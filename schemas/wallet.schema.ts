import { z } from "zod";

export const createWalletSchema = z.object({
  name: z.string().min(1).max(50),
  initialBalance: z.number().min(0).default(0),
});

export type CreateWalletInput = z.infer<
  typeof createWalletSchema
>;

export const updateWalletSchema = z.object({
    name: z.string().min(1).max(50),
    balance: z.number().min(0).default(0),
});

export type UpdateWalletInput = z.infer<typeof updateWalletSchema>;
