import { Url } from "../entities/Url";

export interface UrlRepository {
  create(url: Url): Promise<Url>;
  findByShortenedUrl(shortenedUrl: string): Promise<Url | null>;
  findByUserId(userId: number): Promise<Url[]>;
  updateClicks(url: Url): Promise<void>;
  updateUrl(url: Url): Promise<void>;
  softDelete(url: Url): Promise<void>;
}
