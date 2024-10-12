import { Book } from "@bookstore/domain/entities/Book";
import { Isbn } from "@bookstore/domain/value-objects/Isbn";
import { BookRepository } from "@bookstore/application/ports/repositories/BookRepository";
import { BookNotificationService } from "../ports/services/BookNotificationService";

export class AddBook {
  public constructor(
    private readonly bookRepository: BookRepository,
    private readonly bookNotificationService: BookNotificationService
  ) {}

  public async execute(title: string, isbn: string, availableCopies: number) {
    const book = new Book(new Isbn(isbn), title, availableCopies);

    await this.bookRepository.addBook(book);
    await this.bookNotificationService.sendBookAddedNotification(book)
  }
}