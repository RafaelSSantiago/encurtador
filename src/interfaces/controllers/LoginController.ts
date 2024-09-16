import LoginUserUseCase from "../../application/LoginUserCase";
import { Request, Response } from "express";
import { RequiredFieldValidation } from "../../domain/validators/RequiredFieldValidation";
import { badRequest, serverError } from "../../domain/helpers/httpHelpers";

export class LoginController {
  constructor(private loginUserUseCase: LoginUserUseCase) {}

  async login(req: Request, res: Response) {
    const body: LoginDTO = req.body;
    try {
      for (const field of ["email", "password"]) {
        const error = new RequiredFieldValidation(field).validate(req.body);
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
