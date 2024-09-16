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
import { authMiddleware } from "./infrastructure/middlewares/AuthMiddleware";
import { DeleteUrlUseCase } from "./application/DeleteUrlUseCase";
import UpdateUrlUseCase from "./application/UpdateUrlUseCase";

const app = express();
app.use(express.json());

const urlRepository = new PrismaUrlRepository();
const userRepository = new UserRepository();
const LoginRepository = new LoginUserRepository();
const redirectUrlUseCase = new RedirectUrlUseCase(urlRepository);
const updateUrlUseCase = new UpdateUrlUseCase(urlRepository);
const shortenUrlUseCase = new ShortenUrlUseCase(urlRepository);
const registerUserUseCase = new RegisterUserUseCase(userRepository);
const deleteUrlUseCase = new DeleteUrlUseCase(urlRepository);
const loginUseCase = new LoginUserUseCase(LoginRepository);
const urlController = new UrlController(
  shortenUrlUseCase,
  redirectUrlUseCase,
  deleteUrlUseCase,
  updateUrlUseCase
);
const userContoller = new Usercontroller(registerUserUseCase);
const loginController = new LoginController(loginUseCase);

// rota de encurtar
app.post("/shorten", authMiddleware, (req, res) =>
  urlController.shortenUrl(req, res)
);

//rota de encontrar o hash
app.get("/:hash", (req, res) => urlController.findHashBd(req, res));

// rota de cadastro
app.post("/user", (req, res) => userContoller.createUSerdDb(req, res));

// rota de login
app.post("/login", (req, res) => loginController.login(req, res));

// retornar as urls do user
app.get("/user/url", authMiddleware, (req, res) =>
  userContoller.listUserUrls(req, res)
);

app.delete("/url/:hash", authMiddleware, (req, res) =>
  urlController.deleteShortenedUrl(req, res)
);

app.put("/url/:hash", authMiddleware, (req, res) =>
  urlController.updateOriginalUrl(req, res)
);

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
