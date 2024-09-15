import { RegisterUserUseCase } from "../../application/RegisterUserUseCase";
import { Request, Response } from "express";
import { badRequest, ok, serverError } from "../../domain/helpers/httpHelpers";
import { RequiredFieldValidation } from "../../domain/validators/RequiredFieldValidation";

export class Usercontroller {
  constructor(private registerUserUseCase: RegisterUserUseCase) {}

  async createUSerdDb(req: Request, res: Response) {
    try {
      for (const field of ["email", "password"]) {
        const error = new RequiredFieldValidation(field).validate(req.body);
        if (error) {
          const missingParam = badRequest(error);
          return res.status(missingParam.statusCode).json(missingParam.body);
        }
      }
      const httpResponse = await this.registerUserUseCase.execute(req.body);
      return res.status(httpResponse.statusCode).json(httpResponse.body);
    } catch (error) {
      const errorResponse = serverError(error as any);
      return res.status(errorResponse.statusCode).json(errorResponse.body);
    }
  }
}
