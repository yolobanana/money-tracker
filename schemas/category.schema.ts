import { z } from "zod";

export const categoryTypeEnum = z.enum([
  "INCOME",
  "OUTCOME",
  "TRANSFER",
]);

export const createCategorySchema = z.object({
  name: z.string().min(1).max(50),
  type: categoryTypeEnum,
  parentId: z.string().cuid().optional(),
});

export type CreateCategoryInput = z.infer<
  typeof createCategorySchema
>;
