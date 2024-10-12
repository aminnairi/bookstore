import { z } from "zod";
import { BadRequestError } from "@bookstore/express/errors/BadRequestError";

export const badRequestSchema = z.object({
  error: z.nativeEnum(BadRequestError)
});