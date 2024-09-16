import { Request, Response } from "express";
import { ShortenUrlUseCase } from "../../application/ShortenUrlUseCase";
import { RedirectUrlUseCase } from "../../application/RedirectUrlUseCase";
import { DeleteUrlUseCase } from "../../application/DeleteUrlUseCase";
import { serverError } from "../../domain/helpers/httpHelpers";

export class UrlController {
  constructor(
    private shortenUrlUseCase: ShortenUrlUseCase,
    private redirectUrlUseCase: RedirectUrlUseCase,
    private deleteUrlUseCase: DeleteUrlUseCase
  ) {}

  async shortenUrl(req: Request, res: Response) {
    const { originalUrl, user } = req.body;
    const url = await this.shortenUrlUseCase.execute(originalUrl, user);
    res.json({ shortenedUrl: `http://localhost/${url.shortenedUrl}` });
  }

  async findHashBd(req: Request, res: Response) {
    const { hash } = req.params;
    const link: any = await this.redirectUrlUseCase.execute(hash);
    res.status(302).redirect(link);
  }

  async deleteShortenedUrl(req: Request, res: Response) {
    try {
      const { hash } = req.params;
      const { user } = req.body;

      if (!hash) {
        return res.status(400).json({ message: "Hash parameter is required" });
      }

      const requestPayload = { url: hash, user };

      const httpResponse = await this.deleteUrlUseCase.execute(requestPayload);
      return res.status(httpResponse.statusCode).json(httpResponse.body);
    } catch (error) {
      const errorResponse = serverError(error as any);
      return res.status(errorResponse.statusCode).json(errorResponse.body);
    }
  }
}
