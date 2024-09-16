import { UserToken } from "../interfaces/UserToken";

export interface ShortenUrlDto {
  originalUrl: string;
  user?: UserToken;
}
