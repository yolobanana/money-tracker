import { z } from "zod";
import { amountSchema } from "./common.schema";

export const createBudgetSchema = z.object({
  categoryId: z.string().cuid(),
  amount: amountSchema,
  month: z
    .string()
    .regex(/^\d{4}-\d{2}$/, "Format: YYYY-MM"),
});

export type CreateBudgetInput = z.infer<
  typeof createBudgetSchema
>;
