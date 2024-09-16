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
   * @function createUSerdDb
   * @description Registra um novo usuário no banco de dados.
   * @param {Request} req - Objeto de requisição do Express.
   * @param {Response} res - Objeto de resposta do Express.
   * @returns {Promise<Response>} Resposta HTTP com o status e o corpo da resposta.
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
   * @function listUserUrls
   * @description Lista todas as URLs encurtadas do usuário autenticado.
   * @param {Request} req - Objeto de requisição do Express.
   * @param {Response} res - Objeto de resposta do Express.
   * @returns {Promise<Response>} Resposta HTTP com o status e o corpo da resposta.
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
