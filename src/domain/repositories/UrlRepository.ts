import { DeleteUrlDTO } from "../../dtos/deleteUrl.dto";
import { Url } from "../entities/Url";

export interface UrlRepository {
  create(url: Url): Promise<Url>;
  findByShortenedUrl(shortenedUrl: string): Promise<string | undefined>;
  findByUserId(userId: string): Promise<UrlDTO[]>;
  updateClicks(url: Url): Promise<void>;
  updateUrl(url: Partial<Url>): Promise<any>;
  softDelete(body: DeleteUrlDTO): Promise<void>;
}
