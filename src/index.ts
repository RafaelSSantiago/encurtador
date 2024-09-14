import express from "express";
import { UrlController } from "./interfaces/controllers/UrlController";
import { ShortenUrlUseCase } from "./application/ShortenUrlUseCase";
import { PrismaUrlRepository } from "./infrastructure/repositories/PrismaUrlRepository";
import { RedirectUrlUseCase } from "./application/RedirectUrlUseCase";

const app = express();
app.use(express.json());

const urlRepository = new PrismaUrlRepository();
const redirectUrlUseCase = new RedirectUrlUseCase(urlRepository);
const shortenUrlUseCase = new ShortenUrlUseCase(urlRepository);
const urlController = new UrlController(shortenUrlUseCase, redirectUrlUseCase);

app.post("/shorten", (req, res) => urlController.shortenUrl(req, res));
app.get("/:hash", (req, res) => urlController.findHashBd(req, res));

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
