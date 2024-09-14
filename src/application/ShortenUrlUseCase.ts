import { UrlRepository } from "../domain/repositories/UrlRepository";
import { Url } from "../domain/entities/Url";

export class ShortenUrlUseCase {
  constructor(private urlRepository: UrlRepository) {}

  async execute(originalUrl: string, userId?: number): Promise<Url> {
    const shortenedUrl = this.generateShortUrl();
    const url = new Url(0, originalUrl, shortenedUrl, 0, userId);
    return this.urlRepository.create(url);
  }

  private generateShortUrl(): string {
    return Math.random().toString(36).substring(2, 8);
  }
}
