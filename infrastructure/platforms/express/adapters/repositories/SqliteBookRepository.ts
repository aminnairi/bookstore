import { BookRepository } from "@bookstore/application/ports/repositories/BookRepository";
import { Book } from "@bookstore/domain/entities/Book";
import { Database } from "sqlite";

export class SqliteBookRepository implements BookRepository {
  public constructor(private readonly database: Database) {}

  public async addBook(book: Book): Promise<void> {
    await this.database.run("INSERT INTO books(title, isbn, available_copies) VALUES(?, ?, ?)", book.title, book.isbn.value, book.availableCopies)
  }

  public async getBooks(): Promise<Book[]> {
    const books = await this.database.all("SELECT * FROM books;");

    return books.map(book => {
      return new Book(
        book.isbn,
        book.title,
        book.available_copies
      );
    });
  }
}