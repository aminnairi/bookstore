import { BookRepository } from "@bookstore/application/ports/repositories/BookRepository";
import { BookNotificationService } from "@bookstore/application/ports/services/BookNotificationService";
import { AddBook } from "@bookstore/application/usecases/AddBook";
import { ListBooks } from "@bookstore/application/usecases/ListBooks";
import { input } from "@inquirer/prompts";
import { printTable } from "console-table-printer";

export class BookController {
  public constructor(
    private readonly bookRepository: BookRepository,
    private readonly bookNotificationService: BookNotificationService
  ) { }

  public async listBooks() {
    const listBooks = new ListBooks(this.bookRepository);

    const books = await listBooks.execute();

    if (books.length === 0) {
      console.error("Merci d'ajouter au moins un livre avant de les lister.");
      return;
    }

    printTable(books.map(book => {
      return {
        "ISBN": book.isbn.value,
        "Titre": book.title,
        "Copies disponibles": book.availableCopies
      };
    }));
  }

  public async addBook() {
    const title = await input({
      message: "Titre du livre"
    });

    const isbn = await input({
      message: "Numéro ISBN du livre"
    });

    const availableCopies = Number(await input({
      message: "Nombre de copies disponibles"
    }));

    const addBook = new AddBook(this.bookRepository, this.bookNotificationService);

    await addBook.execute(title, isbn, availableCopies);
  }
}