import { BookRepository } from "@bookstore/application/ports/repositories/BookRepository";
import { Book } from "@bookstore/domain/entities/Book";
import { Database } from "../../database";
import { Isbn } from "@bookstore/domain/value-objects/Isbn";
import { booksTable } from "../../database/schema";

export class DrizzleSqliteBookRepository implements BookRepository {
  public constructor(private readonly database: Database) {}

  public async addBook(book: Book): Promise<void> {
    await this.database.insert(booksTable).values({
      isbn: book.isbn.value,
      title: book.title,
      available_copies: book.availableCopies
    });
  }

  public async getBooks(): Promise<Book[]> {
    const books = await this.database.select().from(booksTable);

    return books.map(book => {
      return new Book(
        new Isbn(book.isbn),
        book.title,
        book.available_copies
      );
    });
  }
}