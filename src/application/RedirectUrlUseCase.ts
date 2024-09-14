import { UrlRepository } from "../domain/repositories/UrlRepository";

export class RedirectUrlUseCase {
  constructor(private urlRepository: UrlRepository) {}

  async execute(hash: string) {
    return await this.urlRepository.findByShortenedUrl(hash)
  }
}
