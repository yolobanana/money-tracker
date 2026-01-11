import { z } from "zod";
import { amountSchema, dateSchema } from "./common.schema";

export const transactionTypeEnum = z.enum([
  "INCOME",
  "OUTCOME",
  "TRANSFER",
]);

export const createTransactionSchema = z.object({
  name: z.string().min(1).max(100),
  amount: amountSchema,
  type: transactionTypeEnum,
  categoryId: z.string().cuid(),
  walletId: z.string().cuid(),
  date: dateSchema,
  isCounted: z.boolean().default(true),
});

export type CreateTransactionInput = z.infer<
  typeof createTransactionSchema
>;
