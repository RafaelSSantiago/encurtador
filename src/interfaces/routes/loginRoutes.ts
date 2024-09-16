import { Router } from "express";
import { LoginController } from "../controllers/LoginController";
import LoginUserUseCase from "../../application/LoginUserCase";
import LoginUserRepository from "../../infrastructure/repositories/LoginUserRepository";

/**
 * Roteador para as rotas de login.
 */
const router = Router();

const loginRepository = new LoginUserRepository();
const loginUseCase = new LoginUserUseCase(loginRepository);
const loginController = new LoginController(loginUseCase);

/**
 * @route POST /login
 * @description Realiza o login de um usuário
 * @access Public
 */
router.post("/", (req, res) => loginController.login(req, res));

export { router as loginRoutes };
