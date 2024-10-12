import express from "express";
import { DrizzleSqliteBookRepository } from "./adapters/repositories/DrizzleSqliteBookRepository";
import cors from "cors";
import bodyParser from "body-parser";
import { ResendBookNotificationService } from "./adapters/services/ResendBookNotificationService";
import { Resend } from "resend";
import { createBooksRouter } from "./routers/books";
import { database } from "./database";

const main = async () => {
  const port = 8000;
  const host = "0.0.0.0";
  const server = express();

  const resend = new Resend("RESEND_API_KEY_HERE_DO_NOT_COMPROMISE_!!!!!");

  const bookRepository = new DrizzleSqliteBookRepository(database);
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