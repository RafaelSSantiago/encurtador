import { Request, Response } from "express";
import { ShortenUrlUseCase } from "../../application/ShortenUrlUseCase";
import { RedirectUrlUseCase } from "../../application/RedirectUrlUseCase";

export class UrlController {
  constructor(
    private shortenUrlUseCase: ShortenUrlUseCase,
    private redirectUrlUseCase: RedirectUrlUseCase
  ) {}

  async shortenUrl(req: Request, res: Response) {
    const { userId, originalUrl } = req.body;
    const url = await this.shortenUrlUseCase.execute(originalUrl, userId);
    res.json({ shortenedUrl: `http://localhost/${url.shortenedUrl}` });
  }

  async findHashBd(req: Request, res: Response) {
    const { hash } = req.params;
    const link: any = await this.redirectUrlUseCase.execute(hash);
    res.status(302).redirect(link);
  }
}
