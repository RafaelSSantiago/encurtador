import { PrismaClient } from "@prisma/client";
import { UrlRepository } from "../../domain/repositories/UrlRepository";
import { Url } from "../../domain/entities/Url";
import { UrlNotFound } from "../../domain/errors/UrlNotFound.error";
import { DeleteUrlDTO } from "../../dtos/deleteUrl.dto";
import { UrlDTO } from "../../dtos/responseUrl.dto";


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
      where: { shortenedUrl: hash, deletedAt: null },
      select: { originalUrl: true, clicks: true },
    });

    if (!url) {
      return new UrlNotFound();
    }

    const _url = {
      ...url,
      hash,
    };

    await this.updateClicks(_url);

    return url?.originalUrl;
  }

  async findByUserId(userId: string): Promise<UrlDTO[]> {
    const urls = await prisma.url.findMany({
      where: { userId },
    });

    return urls;
  }

  async softDelete(body: DeleteUrlDTO): Promise<any> {
    const url = await prisma.url.findFirst({
      where: {
        shortenedUrl: body.url,
        userId: body.user?.id,
        deletedAt: null,
      },
    });

    if (!url) {
      return new UrlNotFound();
    }

    return await prisma.url.update({
      where: { id: url.id },
      data: { deletedAt: new Date() },
    });
  }

  async updateClicks(url: any): Promise<void> {
    await prisma.url.update({
      where: { shortenedUrl: url.hash },
      data: { clicks: url.clicks + 1 },
    });
  }

  async updateUrl(url: Partial<Url>): Promise<UrlDTO> {
    const urlData = await prisma.url.findFirst({
      where: {
        shortenedUrl: url.shortenedUrl,
      },
    });

    return await prisma.url.update({
      where: {
        id: urlData?.id,
      },
      data: {
        originalUrl: url.originalUrl,
        updatedAt: new Date(),
      },
    });
  }

  async existsByUserAndUrl(
    userId: string,
    originalUrl: string
  ): Promise<boolean> {
    const count = await prisma.url.count({
      where: {
        userId: userId,
        originalUrl: originalUrl,
      },
    });
    return count > 0;
  }
}
