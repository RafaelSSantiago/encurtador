export interface UrlDTO {
  id: number;
  originalUrl: string;
  shortenedUrl: string;
  clicks: number;
  userId?: string | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
}

