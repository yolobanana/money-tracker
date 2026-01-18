import { z } from "zod";
import { amountSchema, dateSchema } from "./common.schema";

export const transactionTypeEnum = z.enum([
  "INCOME",
  "EXPENSE",
  "TRANSFER",
]);

const baseTransactionSchema = z.object({
    amount: amountSchema,
    date: dateSchema,
    description: z.string().optional(),
});

export const createTransactionSchema = z.discriminatedUnion("type", [
    baseTransactionSchema.extend({
        type: z.literal("INCOME"),
        categoryId: z.string().cuid(),
        walletId: z.string().cuid(),
    }),
    baseTransactionSchema.extend({
        type: z.literal("EXPENSE"),
        categoryId: z.string().cuid(),
        walletId: z.string().cuid(),
    }),
    baseTransactionSchema.extend({
        type: z.literal("TRANSFER"),
        walletId: z.string().cuid(), // Source Wallet
        destinationWalletId: z.string().cuid(), // Destination Wallet
    }),
]);

export type CreateTransactionInput = z.infer<
  typeof createTransactionSchema
>;
