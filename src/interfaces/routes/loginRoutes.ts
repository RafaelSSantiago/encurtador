import { Router } from "express";
import { LoginController } from "../controllers/LoginController";
import LoginUserUseCase from "../../application/LoginUserCase";
import LoginUserRepository from "../../infrastructure/repositories/LoginUserRepository";

const router = Router();

const loginRepository = new LoginUserRepository();
const loginUseCase = new LoginUserUseCase(loginRepository);
const loginController = new LoginController(loginUseCase);

router.post("/", (req, res) => loginController.login(req, res));

export { router as loginRoutes };
