import { z } from "zod";

export const cuidSchema = z.string().cuid();

export const amountSchema = z
  .number()
  .positive("Amount must be greater than 0");

export const dateSchema = z.coerce.date();
