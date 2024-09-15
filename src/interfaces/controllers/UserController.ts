import { RegisterUserUseCase } from "../../application/RegisterUserUseCase";
import { Request, Response } from "express";
import { UserExistingValidation } from "../../domain/validators/user-existing-validation";
import { conflict, ok, serverError } from "../../domain/helpers/httpHelpers";
import { ExistingUser } from "../../domain/errors/ExistingUser.error";

export class Usercontroller {
  constructor(private registerUserUseCase: RegisterUserUseCase) {}

  async createUSerdDb(req: Request, res: Response) {
    try {
      const userExisting = await new UserExistingValidation(
        req.body.email
      ).validate();

      if (userExisting) {
        const conflictResponse = conflict(new ExistingUser());
        return res
          .status(conflictResponse.statusCode)
          .json(conflictResponse.body);
      }

      const user = await this.registerUserUseCase.execute(req.body);
      const sucess = ok(user);
      return res.status(sucess.statusCode).json(user);
    } catch (error) {
      const errorResponse = serverError(error as any);
      return res.status(errorResponse.statusCode).json(errorResponse.body);
    }
  }
}
