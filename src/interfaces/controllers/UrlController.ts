import { Request, Response } from "express";
import { ShortenUrlUseCase } from "../../application/ShortenUrlUseCase";

export class UrlController {
  constructor(private shortenUrlUseCase: ShortenUrlUseCase) {}

  async shortenUrl(req: Request, res: Response) {
    const { originalUrl } = req.body;
    const userId = undefined
    const url = await this.shortenUrlUseCase.execute(originalUrl, userId);
    res.json({ shortenedUrl: `http://localhost/${url.shortenedUrl}` });
  }
}
