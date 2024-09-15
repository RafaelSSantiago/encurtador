import { User } from "../domain/entities/User";
import { ok, unauthorized } from "../domain/helpers/httpHelpers";
import { HttpResponse } from "../domain/protocols/http";
import LoginUserRepository from "../infrastructure/repositories/LoginUserRepository";
import { UserRepository } from "../infrastructure/repositories/UserRepository";

export default class LoginUserUseCase {
  constructor(private loginUserRepository: LoginUserRepository) {}

  async execute(user: Partial<User>): Promise<HttpResponse> {
    const login = await this.loginUserRepository.login(user);
    console.log(login)
    if (!login) {
      return unauthorized();
    }
    return ok(login);
  }
}
