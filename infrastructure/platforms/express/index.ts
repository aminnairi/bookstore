import { ListBooks } from "@bookstore/application/usecases/ListBooks";
import express from "express";
import { open } from "sqlite";
import { Database } from "sqlite3";
import { SqliteBookRepository } from "./adapters/repositories/SqliteBookRepository";
import cors from "cors";
import bodyParser from "body-parser";
import { AddBook } from "@bookstore/application/usecases/AddBook";
import { ResendBookNotificationService } from "./adapters/services/ResendBookNotificationService";
import { Resend } from "resend";
import { InvalidIsbn } from "@bookstore/domain/errors/InvalidIsbn";

const main = async () => {
  const port = 8000;
  const host = "0.0.0.0";
  const server = express();

  const database = await open({
    filename: "bookstore.sqlite",
    driver: Database
  });

  await database.exec("DROP TABLE IF EXISTS books;");
  await database.exec("CREATE TABLE books(isbn TEXT PRIMARY KEY, title TEXT NOT NULL, available_copies INTEGER NOT NULL);");
  
  const resend = new Resend("RESEND_API_KEY_HERE_DO_NOT_COMPROMISE_!!!!!");

  const bookRepository = new SqliteBookRepository(database);
  const bookNotificationService = new ResendBookNotificationService(resend);

  server.use(cors({
    origin: "*"
  }));

  server.use(bodyParser.json());

  server.get("/books", async (request, response) => {
    try {
      const listBooks = new ListBooks(bookRepository);
      const books = await listBooks.execute();

      if (books.length === 0) {
        response.status(204).end();
        return;
      }

      response.json({
        books
      });
    } catch (error) {
      response.status(500).json({
        error: String(error)
      });
    }
  });

  server.post("/books", async (request, response) => {
    try {
      const { title, isbn, available_copies } = request.body;
      const addBook = new AddBook(bookRepository, bookNotificationService);

      await addBook.execute(title, isbn, available_copies);

      response.status(201).end();
    } catch (error) {
      if (error instanceof InvalidIsbn) {
        return response.status(400).json({
          error: "ISBN is invalid, it should be 13 characters long."
        });
      }

      response.status(500).json({
        error: String(error)
      });
    }
  });

  server.listen(port, host, () => {
    console.log(`Server listening on http://${host}:${port}`);
  });
};

main().catch(error => {
  console.error(`An error occurred: ${error}`);
});