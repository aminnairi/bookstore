import { z } from "zod";

export const bookSchema = z.object({
  isbn: z.string(),
  title: z.string(),
  availableCopies: z.number()
});

export type Book = z.infer<typeof bookSchema>;