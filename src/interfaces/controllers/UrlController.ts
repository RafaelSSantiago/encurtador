import { Request, Response } from "express";
import { ShortenUrlUseCase } from "../../application/ShortenUrlUseCase";
import { RedirectUrlUseCase } from "../../application/RedirectUrlUseCase";
import { DeleteUrlUseCase } from "../../application/DeleteUrlUseCase";
import { serverError } from "../../domain/helpers/httpHelpers";
import { UpdateUrlUseCase } from "../../application/UpdateUrlUseCase";
import { Url } from "../../domain/entities/Url";
import { ShortenUrlDto } from "../../dtos/shortenUrl.dto";
import { DeleteUrlDTO } from "../../dtos/deleteUrl.dto";

export class UrlController {
  constructor(
    private shortenUrlUseCase: ShortenUrlUseCase,
    private redirectUrlUseCase: RedirectUrlUseCase,
    private deleteUrlUseCase: DeleteUrlUseCase,
    private updateUrlUseCase: UpdateUrlUseCase
  ) {}

  async shortenUrl(req: Request, res: Response) {
    const body: ShortenUrlDto = req.body;
    const url = await this.shortenUrlUseCase.execute(body);
    res.json({ shortenedUrl: `http://localhost/${url.shortenedUrl}` });
  }

  async findHashBd(req: Request, res: Response) {
    const { hash } = req.params;
    const link: any = await this.redirectUrlUseCase.execute(hash);
    res.status(302).redirect(link);
  }

  async deleteShortenedUrl(req: Request, res: Response) {
    const body: DeleteUrlDTO = req.body
    try {
      const { hash } = req.params;

      if (!hash) {
        return res.status(400).json({ message: "Hash parameter is required" });
      }

      const httpResponse = await this.deleteUrlUseCase.execute(body);
      return res.status(httpResponse.statusCode).json(httpResponse.body);
    } catch (error) {
      const errorResponse = serverError(error as any);
      return res.status(errorResponse.statusCode).json(errorResponse.body);
    }
  }

  async updateOriginalUrl(req: Request, res: Response) {
    console.log("oi");
    const { hash } = req.params;
    const { originalUrl } = req.body;
    const { user } = req.body;

    const url: Partial<Url> = {
      shortenedUrl: hash,
      originalUrl: originalUrl,
      jwtUser: user,
    };
    try {
      const httpResponse = await this.updateUrlUseCase.execute(url);
      return res.status(httpResponse.statusCode).json(httpResponse.body);
    } catch (error) {
      const errorResponse = serverError(error as any);
      return res.status(errorResponse.statusCode).json(errorResponse.body);
    }
  }
}
