import { BookRepository } from "@bookstore/application/ports/repositories/BookRepository";
import { Book } from "@bookstore/domain/entities/Book";

export class InMemoryBookRepository implements BookRepository {
  public constructor(private readonly books: Array<Book>) {}

  public async addBook(book: Book): Promise<void> {
    this.books.push(book);
  }

  public async getBooks(): Promise<Book[]> {
    return this.books;
  }
}