import { ok, serverError } from "../domain/helpers/httpHelpers";
import { HttpResponse } from "../domain/protocols/http";
import { UrlRepository } from "../domain/repositories/UrlRepository";
import { DeleteUrlDTO } from "../dtos/deleteUrlDTO";

export class DeleteUrlUseCase {
  constructor(private urlRepository: UrlRepository) {}

  async execute(data: DeleteUrlDTO): Promise<HttpResponse> {
    try {
      const bodyDelete = await this.urlRepository.softDelete(data);
      return ok(bodyDelete);
    } catch (error) {
      return serverError(error as any);
    }
  }
}
