import { RegisterUserUseCase } from "../../application/RegisterUserUseCase";
import { Request, Response } from "express";
import { badRequest, ok, serverError } from "../../domain/helpers/httpHelpers";
import { RequiredFieldValidation } from "../../domain/validators/RequiredFieldValidation";
import { UserService } from "../../infrastructure/services/UserService";
import { User } from "../../domain/entities/User";
import { UserToken } from "../UserToken";

/**
 * Controlador para operações relacionadas a usuários.
 */
export class Usercontroller {
  private userService: UserService;

  constructor(private registerUserUseCase: RegisterUserUseCase) {
    this.userService = new UserService();
  }

  /**
   * @swagger
   * /user:
   *   post:
   *     summary: Registra um novo usuário
   *     tags: [Users]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               email:
   *                 type: string
   *               password:
   *                 type: string
   *     responses:
   *       200:
   *         description: Usuário registrado com sucesso
   *       400:
   *         description: Erro na requisição
   */
  async createUSerdDb(req: Request, res: Response): Promise<Response> {
    const body: User = req.body;
    try {
      for (const field of ["email", "password"]) {
        const error = new RequiredFieldValidation(field).validate(req.body);
        if (error) {
          const missingParam = badRequest(error);
          return res.status(missingParam.statusCode).json(missingParam.body);
        }
      }
      const httpResponse = await this.registerUserUseCase.execute(body);
      return res.status(httpResponse.statusCode).json(httpResponse.body);
    } catch (error) {
      const errorResponse = serverError(error as any);
      return res.status(errorResponse.statusCode).json(errorResponse.body);
    }
  }

  /**
   * @swagger
   * /user/url:
   *   get:
   *     summary: Lista todas as URLs encurtadas do usuário autenticado
   *     tags: [Users]
   *     security:
   *       - bearerAuth: []
   *     responses:
   *       200:
   *         description: Lista de URLs encurtadas
   *       401:
   *         description: Não autorizado
   */
  async listUserUrls(req: Request, res: Response): Promise<Response> {
    const body: UserToken = req.body.user;
    try {
      const httpResponse = await this.userService.getUserUrls(body);
      return res.status(httpResponse.statusCode).json(httpResponse.body);
    } catch (error) {
      const errorResponse = serverError(error as any);
      return res.status(errorResponse.statusCode).json(errorResponse.body);
    }
  }
}