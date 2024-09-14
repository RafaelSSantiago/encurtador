import { User } from "../domain/entities/User";
import { UserRepository } from "../infrastructure/repositories/UserRepository";

export class RegisterUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(user: User) {
    return await this.userRepository.create(user);
  }
}
