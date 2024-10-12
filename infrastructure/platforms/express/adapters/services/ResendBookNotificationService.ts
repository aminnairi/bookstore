import { BookNotificationService } from "@bookstore/application/ports/services/BookNotificationService";
import { Book } from "@bookstore/domain/entities/Book";
import { Resend } from "resend";

export class ResendBookNotificationService implements BookNotificationService {
  public constructor(private readonly resend: Resend) { }

  public async sendBookAddedNotification(book: Book): Promise<void> {
    await this.resend.emails.send({
      from: "noreply@bookstore.com",
      to: "storekeeper@bookstore.com",
      subject: "Nouveau livre ajouté",
      text: `Un nouveau livre a été ajouté : ${book.title}.`
    });
  }
}