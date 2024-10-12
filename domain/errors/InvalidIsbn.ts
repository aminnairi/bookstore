export class InvalidIsbn extends Error {
  public constructor(public readonly isbn: string) {
    super();
    this.name = "InvalidIsbn";
  }
}