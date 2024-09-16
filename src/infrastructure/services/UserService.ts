import { UserNotFound } from "../../domain/errors/UserNotFound.error";
import { notFoundError, ok } from "../../domain/helpers/httpHelpers";
import { HttpResponse } from "../../domain/protocols/http";
import { UserExistingValidation } from "../../domain/validators/User-existing-validation";
import { UserToken } from "../../interfaces/UserToken";
import { PrismaUrlRepository } from "../repositories/PrismaUrlRepository";

export class UserService {
  private urlRepository: PrismaUrlRepository;

  constructor() {
    this.urlRepository = new PrismaUrlRepository();
  }

  async getUserUrls(user: UserToken): Promise<HttpResponse> {
    const userExisting = await new UserExistingValidation(
      user.email
    ).validate();
    if (!userExisting) {
      return notFoundError(new UserNotFound(user.email));
    }
    const urls = await this.urlRepository.findByUserId(user.id);
    return ok(urls);
  }
}
