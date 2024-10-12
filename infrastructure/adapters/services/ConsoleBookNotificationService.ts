import { BookNotificationService } from "@bookstore/application/ports/services/BookNotificationService";
import { Book } from "@bookstore/domain/entities/Book";

export class ConsoleBookNotificationService implements BookNotificationService {
  public async sendBookAddedNotification(book: Book): Promise<void> {
    console.log(`Le livre ${book.title} a bien été ajouté !`);
  }
}