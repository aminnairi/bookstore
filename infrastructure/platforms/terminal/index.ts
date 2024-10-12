import { select } from "@inquirer/prompts";
import { InMemoryBookRepository } from "@bookstore/adapters/repositories/InMemoryBookRepository";
import { ConsoleBookPresenter } from "@bookstore/adapters/presenters/ConsoleBookPresenter";
import { exhaustive } from "exhaustive";
import { BookController } from "./controllers/BookController";
import { ConsoleBookNotificationService } from "@bookstore/adapters/services/ConsoleBookNotificationService";

enum Menu {
  ListBooks = "LIST_BOOKS",
  AddBook = "ADD_BOOK",
  Quit = "QUIT"
}

const QUIT = true;

const bookRepository = new InMemoryBookRepository([]);
const bookNotificationService = new ConsoleBookNotificationService();

const bookController = new BookController(bookRepository, bookNotificationService);

const main = async () => {
  const menu = await select({
    message: "Choisissez une option",
    choices: [
      {
        name: "Lister tous les livres",
        value: Menu.ListBooks
      },
      {
        name: "Ajouter un livre",
        value: Menu.AddBook
      },
      {
        name: "Quitter",
        value: Menu.Quit
      }
    ]
  });

  const quit = await exhaustive(menu, {
    [Menu.ListBooks]: async () => {
      await bookController.listBooks();
    },
    [Menu.AddBook]: async () => {
      await bookController.addBook();
    },
    [Menu.Quit]: () => {
      return QUIT;
    }
  });

  if (quit) {
    console.log("Okay bye.");
    return;
  }

  return await main();
};

main().catch(() => {
  console.error("Une erreur innatendue est survenue.");
});