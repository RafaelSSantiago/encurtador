import LoginUserUseCase from "../../application/LoginUserCase";
import { Request, Response } from "express";
import { RequiredFieldValidation } from "../../domain/validators/RequiredFieldValidation";
import { badRequest, serverError } from "../../domain/helpers/httpHelpers";

/**
 * Controlador para operações relacionadas ao login.
 */
export class LoginController {
  constructor(private loginUserUseCase: LoginUserUseCase) {}

  /**
   * @function login
   * @description Realiza o login de um usuário.
   * @param {Request} req - Objeto de requisição do Express.
   * @param {Response} res - Objeto de resposta do Express.
   * @returns {Promise<Response>} Resposta HTTP com o status da operação.
   */
  async login(req: Request, res: Response): Promise<Response> {
    const body: LoginDTO = req.body;
    try {
      for (const field of ["email", "password"]) {
        const error = new RequiredFieldValidation(field).validate(body);
        if (error) {
          const missingParam = badRequest(error);
          return res.status(missingParam.statusCode).json(missingParam.body);
        }
      }

      const httpResponse = await this.loginUserUseCase.execute(body);
      return res.status(httpResponse.statusCode).json(httpResponse.body);
    } catch (error) {
      const errorResponse = serverError(error as any);
      return res.status(errorResponse.statusCode).json(errorResponse.body);
    }
  }
}
