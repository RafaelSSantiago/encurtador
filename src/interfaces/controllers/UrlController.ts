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
   * @swagger
   * /url:
   *   post:
   *     summary: Cria uma URL encurtada
   *     tags: [URLs]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               originalUrl:
   *                 type: string
   *     responses:
   *       200:
   *         description: URL encurtada criada com sucesso
   *       400:
   *         description: Erro na requisição
   */
  async shortenUrl(req: Request, res: Response): Promise<Response> {
    const body: ShortenUrlDto = req.body;
    try {
      const httpResponse = await this.shortenUrlUseCase.execute(body);
      return res.status(httpResponse.statusCode).json(httpResponse.body);
    } catch (error) {
      const errorResponse = serverError(error as any);
      return res.status(errorResponse.statusCode).json(errorResponse.body);
    }
  }

  /**
   * @swagger
   * /url/{hash}:
   *   get:
   *     summary: Redireciona para a URL original com base no hash fornecido
   *     tags: [URLs]
   *     parameters:
   *       - in: path
   *         name: hash
   *         required: true
   *         schema:
   *           type: string
   *         description: Hash da URL encurtada
   *     responses:
   *       302:
   *         description: Redireciona para a URL original
   *       404:
   *         description: URL não encontrada
   */
  async findHashBd(req: Request, res: Response): Promise<void> {
    const { hash } = req.params;
    const link: any = await this.redirectUrlUseCase.execute(hash);
    res.status(302).redirect(link);
  }

  /**
   * @swagger
   * /url/{hash}:
   *   delete:
   *     summary: Deleta uma URL encurtada com base no hash fornecido
   *     tags: [URLs]
   *     parameters:
   *       - in: path
   *         name: hash
   *         required: true
   *         schema:
   *           type: string
   *         description: Hash da URL encurtada
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               user:
   *                 type: string
   *     responses:
   *       200:
   *         description: URL encurtada deletada com sucesso
   *       400:
   *         description: Erro na requisição
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
   * @swagger
   * /url/{hash}:
   *   put:
   *     summary: Atualiza a URL original de uma URL encurtada com base no hash fornecido
   *     tags: [URLs]
   *     parameters:
   *       - in: path
   *         name: hash
   *         required: true
   *         schema:
   *           type: string
   *         description: Hash da URL encurtada
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               originalUrl:
   *                 type: string
   *     responses:
   *       200:
   *         description: URL original atualizada com sucesso
   *       400:
   *         description: Erro na requisição
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
