export class UrlNotFound extends Error {
  constructor() {
    super(`Url not found`);
    this.name = "UrlNotFound";
  }
}
