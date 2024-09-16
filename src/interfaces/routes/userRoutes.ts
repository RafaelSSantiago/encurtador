import { Router } from "express";
import { Usercontroller } from "../controllers/UserController";
import { UserRepository } from "../../infrastructure/repositories/UserRepository";
import { RegisterUserUseCase } from "../../application/RegisterUserUseCase";
import { authMiddleware } from "../../infrastructure/middlewares/AuthMiddleware";

const router = Router();

const userRepository = new UserRepository();
const registerUserUseCase = new RegisterUserUseCase(userRepository);
const userController = new Usercontroller(registerUserUseCase);

router.post("/", (req, res) => userController.createUSerdDb(req, res));
router.get("/url", authMiddleware, (req, res) =>
  userController.listUserUrls(req, res)
);

export { router as userRoutes };
