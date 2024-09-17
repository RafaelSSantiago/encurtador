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
   * @swagger
   * /login:
   *   post:
   *     summary: Realiza o login de um usuário
   *     tags: [Login]
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
   *         description: Login realizado com sucesso
   *       400:
   *         description: Erro na requisição
   *       401:
   *         description: Credenciais inválidas
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
