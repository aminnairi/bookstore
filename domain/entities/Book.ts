import { Isbn } from "../value-objects/Isbn";

export class Book {
  public constructor(
    public isbn: Isbn,
    public title: string,
    public availableCopies: number,
  ) {}
}