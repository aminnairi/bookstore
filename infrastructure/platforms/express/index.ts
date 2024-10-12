import express from "express";
import { open } from "sqlite";
import { Database } from "sqlite3";
import { SqliteBookRepository } from "./adapters/repositories/SqliteBookRepository";
import cors from "cors";
import bodyParser from "body-parser";
import { ResendBookNotificationService } from "./adapters/services/ResendBookNotificationService";
import { Resend } from "resend";
import { createBooksRouter } from "./routers/books";

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

  server.use(cors({ origin: "*" }));
  server.use(bodyParser.json());
  server.use("/books", createBooksRouter(bookRepository, bookNotificationService));

  server.listen(port, host, () => {
    console.log(`Server listening on http://${host}:${port}`);
  });
};

main().catch(error => {
  console.error(`An error occurred: ${error}`);
});