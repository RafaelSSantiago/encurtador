import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class UserExistingValidation {
  constructor(private readonly user: number) {}

  async validate() {
    const userExisting = await prisma.user.findUnique({
      where: { id: this.user as number },
    });

    return !!userExisting;
  }
}
