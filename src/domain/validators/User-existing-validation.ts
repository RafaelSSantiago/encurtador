import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class UserExistingValidation {
  constructor(private readonly email: string) {}

  async validate() {
    const userExisting = await prisma.user.findUnique({
      where: { email: this.email as string },
    });

    return !!userExisting;
  }
}
