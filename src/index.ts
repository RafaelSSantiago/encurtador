import express from "express";
import { UrlController } from "./interfaces/controllers/UrlController";
import { ShortenUrlUseCase } from "./application/ShortenUrlUseCase";
import { PrismaUrlRepository } from "./infrastructure/repositories/PrismaUrlRepository";

const app = express();
app.use(express.json());

const urlRepository = new PrismaUrlRepository();
const shortenUrlUseCase = new ShortenUrlUseCase(urlRepository);
const urlController = new UrlController(shortenUrlUseCase);

app.post("/shorten", (req, res) => urlController.shortenUrl(req, res));

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
