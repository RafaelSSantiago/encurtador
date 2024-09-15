import jwt from "jsonwebtoken";
import { UserRepository } from "../repositories/UserRepository";
import { HashService } from "./EncryptService";

export class AuthService {
  private userRepository: UserRepository;
  private bcrypt: HashService;

  constructor() {
    this.userRepository = new UserRepository();
    this.bcrypt = new HashService();
  }
  generateToken(userId: number, email: string) {
    return jwt.sign({ id: userId, email }, process.env.JWT_SECRET!, {
      expiresIn: "3h",
    });
  }

  verifyToken(token: string) {
    return jwt.verify(token, process.env.JWT_SECRET!);
  }

  async login(email: string, password: string): Promise<string | null> {
    const user = await this.userRepository.findByEmail(email as string);

    if (!user) {
      return null;
    }

    const isPasswordValid = await this.bcrypt.comparePassword(
      password,
      user.password as string
    );

    if (!isPasswordValid) {
      return null;
    }

    return this.generateToken(user.id, user.email);
  }
}
