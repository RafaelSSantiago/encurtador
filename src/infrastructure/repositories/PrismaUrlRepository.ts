import { PrismaClient } from "@prisma/client";
import { UrlRepository } from "../../domain/repositories/UrlRepository";
import { Url } from "../../domain/entities/Url";

const prisma = new PrismaClient();

export class PrismaUrlRepository implements UrlRepository {
  async create(url: Url): Promise<Url> {
    return prisma.url.create({
      data: {
        originalUrl: url.originalUrl,
        shortenedUrl: url.shortenedUrl,
        userId: url.userId,
      },
    });
  }

  async findByShortenedUrl(shortenedUrl: string): Promise<Url | null> {
    return null;
  }

  async findByUserId(userId: number): Promise<Url[]> {
    return [];
  }

  async softDelete(url: Url): Promise<void> {}

  async updateClicks(url: Url): Promise<void> {}

  async updateUrl(url: Url): Promise<void> {}
}
