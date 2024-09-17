import { Request, Response } from "express";
import { ShortenUrlUseCase } from "../../application/ShortenUrlUseCase";
import { RedirectUrlUseCase } from "../../application/RedirectUrlUseCase";
import { DeleteUrlUseCase } from "../../application/DeleteUrlUseCase";
import { serverError } from "../../domain/helpers/httpHelpers";
import { UpdateUrlUseCase } from "../../application/UpdateUrlUseCase";
import { Url } from "../../domain/entities/Url";
import { ShortenUrlDto } from "../../dtos/shortenUrl.dto";
import { DeleteUrlDTO } from "../../dtos/deleteUrl.dto";

/**
 * Controlador para operações relacionadas a URLs.
 */
export class UrlController {
  constructor(
    private shortenUrlUseCase: ShortenUrlUseCase,
    private redirectUrlUseCase: RedirectUrlUseCase,
    private deleteUrlUseCase: DeleteUrlUseCase,
    private updateUrlUseCase: UpdateUrlUseCase
  ) {}

  /**
   * @function shortenUrl
   * @description Cria uma URL encurtada.
   * @param {Request} req - Objeto de requisição do Express.
   * @param {Response} res - Objeto de resposta do Express.
   * @returns {Promise<void>} Resposta HTTP com a URL encurtada.
   */
  async shortenUrl(req: Request, res: Response): Promise<void> {
    const body: ShortenUrlDto = req.body;
    const url = await this.shortenUrlUseCase.execute(body);
    res.json({ shortenedUrl: `http://localhost/${url.shortenedUrl}` });
  }

  /**
   * @function findHashBd
   * @description Redireciona para a URL original com base no hash fornecido.
   * @param {Request} req - Objeto de requisição do Express.
   * @param {Response} res - Objeto de resposta do Express.
   * @returns {Promise<void>} Redireciona para a URL original.
   */
  async findHashBd(req: Request, res: Response): Promise<void> {
    const { hash } = req.params;
    const link: any = await this.redirectUrlUseCase.execute(hash);
    res.status(302).redirect(link);
  }

  /**
   * @function deleteShortenedUrl
   * @description Deleta uma URL encurtada com base no hash fornecido.
   * @param {Request} req - Objeto de requisição do Express.
   * @param {Response} res - Objeto de resposta do Express.
   * @returns {Promise<Response>} Resposta HTTP com o status da operação.
   */
  async deleteShortenedUrl(req: Request, res: Response): Promise<Response> {
    const body: DeleteUrlDTO = req.body;
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

  /**
   * @function updateOriginalUrl
   * @description Atualiza a URL original de uma URL encurtada com base no hash fornecido.
   * @param {Request} req - Objeto de requisição do Express.
   * @param {Response} res - Objeto de resposta do Express.
   * @returns {Promise<Response>} Resposta HTTP com o status da operação.
   */
  async updateOriginalUrl(req: Request, res: Response): Promise<Response> {
    const { hash } = req.params;

    if (!hash) {
      return res.status(400).json({ message: "Hash parameter is required" });
    }

    const { originalUrl, user } = req.body;

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
