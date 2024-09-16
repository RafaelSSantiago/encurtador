import { UrlRepository } from "../domain/repositories/UrlRepository";
import { Url } from "../domain/entities/Url";
import { ShortenUrlDto } from "../dtos/shortenUrl.dto";

export class ShortenUrlUseCase {
  constructor(private urlRepository: UrlRepository) {}

  async execute(body: ShortenUrlDto): Promise<Url> {

    const shortenedUrl = this.generateShortUrl();
    const url = new Url(0, body.originalUrl, shortenedUrl, 0, null, body.user);
    return this.urlRepository.create(url);
  }

  private generateShortUrl(): string {
    return Math.random().toString(36).substring(2, 8);
  }
}
