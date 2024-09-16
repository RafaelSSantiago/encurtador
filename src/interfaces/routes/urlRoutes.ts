import { Router } from "express";
import { authMiddleware } from "../../infrastructure/middlewares/AuthMiddleware";
import { UrlController } from "../controllers/UrlController";
import { PrismaUrlRepository } from "../../infrastructure/repositories/PrismaUrlRepository";
import { ShortenUrlUseCase } from "../../application/ShortenUrlUseCase";
import { RedirectUrlUseCase } from "../../application/RedirectUrlUseCase";
import { DeleteUrlUseCase } from "../../application/DeleteUrlUseCase";
import { UpdateUrlUseCase } from "../../application/UpdateUrlUseCase";

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

router.post("/shorten", authMiddleware, (req, res) =>
  urlController.shortenUrl(req, res)
);
router.get("/:hash", (req, res) => urlController.findHashBd(req, res));
router.delete("/:hash", authMiddleware, (req, res) =>
  urlController.deleteShortenedUrl(req, res)
);
router.put("/:hash", authMiddleware, (req, res) =>
  urlController.updateOriginalUrl(req, res)
);

export { router as urlRoutes };
