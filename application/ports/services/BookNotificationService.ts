import { Book } from "@bookstore/domain/entities/Book";

export interface BookNotificationService {
  sendBookAddedNotification(book: Book): Promise<void>;
}