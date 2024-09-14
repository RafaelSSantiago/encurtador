import { PrismaClient } from "@prisma/client";
import { User } from "../../domain/entities/User";
import { HashService } from "../services/EncryptService";

const prisma = new PrismaClient();
const hashService = new HashService();

export class UserRepository {
  async create(user: User) {
    const hashedPassword = await hashService.hashPassword(user.password);

    const createUser = await prisma.user.create({
      data: {
        email: user.email,
        password: hashedPassword,
      },
    });

    return new User(createUser.id, createUser.email, createUser.password);
  }
}
