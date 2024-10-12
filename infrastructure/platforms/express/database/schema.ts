import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const booksTable = sqliteTable("books", {
  isbn: text().primaryKey(),
  title: text().notNull(),
  available_copies: int().notNull()
});