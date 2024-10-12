import { bookSchema } from "./bookSchema";
import { z } from "zod";

export const booksSchema = z.array(bookSchema);

export type Books = z.infer<typeof booksSchema>;