import { Router } from "express";
import { authMiddleware } from "../../infrastructure/middlewares/AuthMiddleware";
import { UrlController } from "../controllers/UrlController";
import { PrismaUrlRepository } from "../../infrastructure/repositories/PrismaUrlRepository";
import { ShortenUrlUseCase } from "../../application/ShortenUrlUseCase";
import { RedirectUrlUseCase } from "../../application/RedirectUrlUseCase";
import { DeleteUrlUseCase } from "../../application/DeleteUrlUseCase";
import { UpdateUrlUseCase } from "../../application/UpdateUrlUseCase";

/**
 * Roteador para as rotas de URL.
 */
const router = Router();

const urlRepository = new PrismaUrlRepository();
const shortenUrlUseCase = new ShortenUrlUseCase(urlRepository);
const redirectUrlUseCase = new RedirectUrlUseCase(urlRepository);
const deleteUrlUseCase = new DeleteUrlUseCase(urlRepository);
const updateUrlUseCase = new UpdateUrlUseCase(urlRepository);
const urlController = new UrlController(
  shortenUrlUseCase,
  redirectUrlUseCase,
  deleteUrlUseCase,
  updateUrlUseCase
);

/**
 * @route POST /url/shorten
 * @description Cria uma URL encurtada
 * @access Private (Requer ou não autenticação)
 */
router.post("/shorten", authMiddleware, (req, res) =>
  urlController.shortenUrl(req, res)
);

/**
 * @route GET /url/:hash
 * @description Redireciona para a URL original com base no hash fornecido
 * @access Public
 */
router.get("/:hash", (req, res) => urlController.findHashBd(req, res));

/**
 * @route DELETE /url/:hash
 * @description Deleta uma URL encurtada com base no hash fornecido
 * @access Private (Requer autenticação)
 */
router.delete("/:hash", authMiddleware, (req, res) =>
  urlController.deleteShortenedUrl(req, res)
);

/**
 * @route PUT /url/:hash
 * @description Atualiza a URL original de uma URL encurtada com base no hash fornecido
 * @access Private (Requer autenticação)
 */
router.put("/:hash", authMiddleware, (req, res) =>
  urlController.updateOriginalUrl(req, res)
);

export { router as urlRoutes };
