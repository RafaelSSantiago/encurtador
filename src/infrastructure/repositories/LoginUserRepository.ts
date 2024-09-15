import { User } from "../../domain/entities/User";
import { LoginRepository } from "../../domain/repositories/LoginRepository";
import { AuthService } from "../services/AuthService";

export default class LoginUserRepository implements LoginRepository {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  async login(data: Partial<User>): Promise<any> {
    const { email, password } = data;
    const token = await this.authService.login(
      email as string,
      password as string
    );
    return token;
  }
}
