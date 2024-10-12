import { InvalidIsbn } from "../errors/InvalidIsbn";

export class Isbn {
  public constructor(public readonly value: string) {
    if (value.length !== 13) {
      throw new InvalidIsbn(value);
    }
  }
}