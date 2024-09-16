import { PrismaClient } from "@prisma/client";
import { UrlRepository } from "../../domain/repositories/UrlRepository";
import { Url } from "../../domain/entities/Url";
import { UrlNotFound } from "../../domain/errors/UrlNotFound.error";

const prisma = new PrismaClient();

export class PrismaUrlRepository implements UrlRepository {
  async create(url: Partial<Url>): Promise<any> {
    const params = {
      originalUrl: url.originalUrl,
      shortenedUrl: url.shortenedUrl,
      ...(url.jwtUser && { userId: url.jwtUser.id }),
    };

    return await prisma.url.create({
      data: params,
    });
  }

  async findByShortenedUrl(hash: string): Promise<any> {
    const url = await prisma.url.findUnique({
      where: { shortenedUrl: hash },
      select: { originalUrl: true, clicks: true },
    });

    if (!url) {
      return new UrlNotFound();
    }

    await prisma.url.update({
      where: { shortenedUrl: hash },
      data: { clicks: url.clicks + 1 },
    });
    return url?.originalUrl;
  }

  async findByUserId(userId: number): Promise<Url[]> {
    return await prisma.url.findMany({
      where: { userId },
    });
  }

  async softDelete(url: Url): Promise<void> {}

  async updateClicks(url: Url): Promise<void> {}

  async updateUrl(url: Url): Promise<void> {}
}
