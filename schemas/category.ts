import { z } from "zod";

export const CreateCategorySchema = z.object({
    name: z.string().min(1, "Name is required").max(20, "Name is too long"),
    type: z.enum(["INCOME", "EXPENSE", "TRANSFER"]),
    parentId: z.string().optional().nullable(),
});

export type CreateCategorySchemaType = z.infer<typeof CreateCategorySchema>;
