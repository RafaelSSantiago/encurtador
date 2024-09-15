import { User } from "../domain/entities/User";
import { ExistingUser } from "../domain/errors/ExistingUser.error";
import { conflict, ok } from "../domain/helpers/httpHelpers";
import { UserExistingValidation } from "../domain/validators/User-existing-validation";
import { UserRepository } from "../infrastructure/repositories/UserRepository";
import { HttpResponse } from "../domain/protocols/http";

export class RegisterUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(user: User): Promise<HttpResponse> {
    const userExisting = new UserExistingValidation(user.email);
    if (await userExisting.validate()) {
      return conflict(new ExistingUser());
    }
    const newUser = await this.userRepository.create(user);
    return ok(newUser);
  }
}
