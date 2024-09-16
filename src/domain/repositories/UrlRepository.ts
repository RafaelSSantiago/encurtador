import { DeleteUrlDTO } from "../../dtos/deleteUrlDTO";
import { Url } from "../entities/Url";

export interface UrlRepository {
  create(url: Url): Promise<Url>;
  findByShortenedUrl(shortenedUrl: string): Promise<string | undefined>;
  findByUserId(userId: number): Promise<Url[]>;
  updateClicks(url: Url): Promise<void>;
  updateUrl(url: Url): Promise<void>;
  softDelete(body: DeleteUrlDTO): Promise<void>;
}
