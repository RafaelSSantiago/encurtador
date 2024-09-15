import express from "express";
import { UrlController } from "./interfaces/controllers/UrlController";
import { ShortenUrlUseCase } from "./application/ShortenUrlUseCase";
import { PrismaUrlRepository } from "./infrastructure/repositories/PrismaUrlRepository";
import { RedirectUrlUseCase } from "./application/RedirectUrlUseCase";
import { RegisterUserUseCase } from "./application/RegisterUserUseCase";
import { UserRepository } from "./infrastructure/repositories/UserRepository";
import { Usercontroller } from "./interfaces/controllers/UserController";
import { LoginController } from "./interfaces/controllers/LoginController";
import LoginUserUseCase from "./application/LoginUserCase";
import LoginUserRepository from "./infrastructure/repositories/LoginUserRepository";

const app = express();
app.use(express.json());

const urlRepository = new PrismaUrlRepository();
const userRepository = new UserRepository();
const LoginRepository = new LoginUserRepository();
const redirectUrlUseCase = new RedirectUrlUseCase(urlRepository);
const shortenUrlUseCase = new ShortenUrlUseCase(urlRepository);
const registerUserUseCase = new RegisterUserUseCase(userRepository);
const loginUseCase = new LoginUserUseCase(LoginRepository);
const urlController = new UrlController(shortenUrlUseCase, redirectUrlUseCase);
const userContoller = new Usercontroller(registerUserUseCase);
const loginController = new LoginController(loginUseCase);

app.post("/shorten", (req, res) => urlController.shortenUrl(req, res));

app.get("/:hash", (req, res) => urlController.findHashBd(req, res));

app.post("/user", (req, res) => userContoller.createUSerdDb(req, res));

app.post("/login", (req, res) => loginController.login(req, res));

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
