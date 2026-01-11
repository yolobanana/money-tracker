import { z } from "zod";
import { amountSchema } from "./common.schema";

export const createWalletSchema = z.object({
  name: z.string().min(1).max(50),
  initialBalance: amountSchema.default(0),
});

export type CreateWalletInput = z.infer<
  typeof createWalletSchema
>;
