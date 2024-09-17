import { UrlRepository } from "../domain/repositories/UrlRepository";
import { Url } from "../domain/entities/Url";
import { ShortenUrlDto } from "../dtos/shortenUrl.dto";
import { conflict, ok } from "../domain/helpers/httpHelpers";
import { HttpResponse } from "../domain/protocols/http";

export class ShortenUrlUseCase {
  constructor(private urlRepository: UrlRepository) {}

  async execute(body: ShortenUrlDto): Promise<HttpResponse> {
    if (body.user) {
      const urlExists = await this.urlRepository.existsByUserAndUrl(
        body.user.id,
        body.originalUrl as string
      );
      if (urlExists) {
        return conflict(new Error("URL already exists for this user."));
      }
    }

    const shortenedUrl = this.generateShortUrl();
    const url = new Url(0, body.originalUrl, shortenedUrl, 0, null, body.user);
    const ulrResponse = await this.urlRepository.create(url);
    const shorturl = { url: `http://localhost/${ulrResponse.shortenedUrl}` };
    return ok(shorturl);
  }

  private generateShortUrl(): string {
    return Math.random().toString(36).substring(2, 8);
  }
}
