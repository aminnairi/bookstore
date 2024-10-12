import { Router } from "express";
import { ListBooks } from "@bookstore/application/usecases/ListBooks";
import { AddBook } from "@bookstore/application/usecases/AddBook";
import { InvalidIsbn } from "@bookstore/domain/errors/InvalidIsbn";
import { BookRepository } from "@bookstore/application/ports/repositories/BookRepository";
import { BookNotificationService } from "@bookstore/application/ports/services/BookNotificationService";
import { BadRequestError } from "../errors/BadRequestError";

export const createBooksRouter = (bookRepository: BookRepository, bookNotificationService: BookNotificationService) => {
  const booksRouter = Router();

  booksRouter.get("/", async (request, response) => {
    try {
      const listBooks = new ListBooks(bookRepository);
      const books = await listBooks.execute();

      response.json(books);
    } catch (error) {
      response.status(500).json({
        error: String(error)
      });
    }
  });

  booksRouter.post("/", async (request, response) => {
    try {
      const { title, isbn, availableCopies } = request.body;
      const addBook = new AddBook(bookRepository, bookNotificationService);

      await addBook.execute(title, isbn, availableCopies);

      response.status(201).end();
    } catch (error) {
      if (error instanceof InvalidIsbn) {
        return response.status(400).json({
          error: BadRequestError.BecauseInvalidIsbn
        });
      }

      response.status(500).json({
        error: String(error)
      });
    }
  });

  return booksRouter;
};