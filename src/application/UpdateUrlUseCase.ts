import { Url } from "../domain/entities/Url";
import { ok, serverError } from "../domain/helpers/httpHelpers";
import { UrlRepository } from "../domain/repositories/UrlRepository";
import { HttpResponse } from "../domain/protocols/http";

export default class UpdateUrlUseCase {
  constructor(private urlRepository: UrlRepository) {}

  async execute(url: Partial<Url>): Promise<HttpResponse> {
    try {
      const update = await this.urlRepository.updateUrl(url);
      return ok(update);
    } catch (error) {
      return serverError(error as any);
    }
  }
}
