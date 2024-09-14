import { PrismaClient } from "@prisma/client";
import { UrlRepository } from "../../domain/repositories/UrlRepository";
import { Url } from "../../domain/entities/Url";
import { UserExistingValidation } from "../../domain/validators/user-existing-validation";

const prisma = new PrismaClient();

export class PrismaUrlRepository implements UrlRepository {
  async create(url: Url): Promise<any> {
    const userExisting = new UserExistingValidation(url.userId as number);
    const hasUser = await userExisting.validate();
    const params = {
      originalUrl: url.originalUrl,
      shortenedUrl: url.shortenedUrl,
      ...(hasUser && { userId: url.userId }),
    };

    return await prisma.url.create({
      data: params,
    });
  }

  async findByShortenedUrl(hash: string): Promise<string | undefined> {
    const value = await prisma.url.findUnique({
      where: { shortenedUrl: hash },
      select: { originalUrl: true },
    });
    return value?.originalUrl;
  }

  async findByUserId(userId: number): Promise<Url[]> {
    return [];
  }

  async softDelete(url: Url): Promise<void> {}

  async updateClicks(url: Url): Promise<void> {}

  async updateUrl(url: Url): Promise<void> {}
}
