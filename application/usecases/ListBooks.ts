import { BookRepository } from "../ports/repositories/BookRepository";

export class ListBooks {
  public constructor(
    private readonly bookRepository: BookRepository
  ) { } 

  public async execute() {
    const books = await this.bookRepository.getBooks();

    return books;
  }
}