import { Book } from "../../../domain/entities/Book";

export interface BookRepository {
  addBook(book: Book): Promise<void>;
  getBooks(): Promise<Array<Book>>
}