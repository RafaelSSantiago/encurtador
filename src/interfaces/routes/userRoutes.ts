import { Router } from "express";
import { Usercontroller } from "../controllers/UserController";
import { UserRepository } from "../../infrastructure/repositories/UserRepository";
import { RegisterUserUseCase } from "../../application/RegisterUserUseCase";
import { authMiddleware } from "../../infrastructure/middlewares/AuthMiddleware";

/**
 * Roteador para as rotas de usuários.
 */
const router = Router();

const userRepository = new UserRepository();
const registerUserUseCase = new RegisterUserUseCase(userRepository);
const userController = new Usercontroller(registerUserUseCase);

/**
 * @route POST /user
 * @description Registra um novo usuário
 * @access Public
 */
router.post("/", (req, res) => userController.createUSerdDb(req, res));

/**
 * @route GET /user/url
 * @description Lista todas as URLs encurtadas do usuário autenticado
 * @access Private (Requer autenticação)
 */
router.get("/url", authMiddleware, (req, res) =>
  userController.listUserUrls(req, res)
);

export { router as userRoutes };
