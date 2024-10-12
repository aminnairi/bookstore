import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";

export const client = createClient({ url: "file:bookstore.sqlite" });
export const database = drizzle(client);

export type Database = typeof database;