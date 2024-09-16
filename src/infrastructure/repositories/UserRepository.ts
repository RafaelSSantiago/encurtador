import { PrismaClient } from "@prisma/client";
import { User } from "../../domain/entities/User";
import { HashService } from "../services/EncryptService";
import { UserRepositoryInterface } from "../../domain/repositories/UserRepositoryInterface";

const prisma = new PrismaClient();
const hashService = new HashService();

export class UserRepository implements UserRepositoryInterface {
  async create(user: User) {
    const hashedPassword = await hashService.hashPassword(
      user.password as string
    );

    const createUser = await prisma.user.create({
      data: {
        email: user.email,
        password: hashedPassword,
      },
    });

    return new User(Number(createUser.id), createUser.email);
  }

  async findByEmail(email: string): Promise<User | undefined> {
    const user = await prisma.user.findUnique({ where: { email } });
    if (user) {
      return new User(Number(user.id), user.email);
    }
    return undefined;
  }
}
