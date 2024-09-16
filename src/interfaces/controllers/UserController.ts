import { RegisterUserUseCase } from "../../application/RegisterUserUseCase";
import { Request, Response } from "express";
import { badRequest, ok, serverError } from "../../domain/helpers/httpHelpers";
import { RequiredFieldValidation } from "../../domain/validators/RequiredFieldValidation";
import { UserService } from "../../infrastructure/services/UserService";
import { User } from "../../domain/entities/User"; 

export class Usercontroller {
  private userService: UserService;

  constructor(private registerUserUseCase: RegisterUserUseCase) {
    this.userService = new UserService();
  }

  async createUSerdDb(req: Request, res: Response) {
    const body: User = req.body
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

  async listUserUrls(req: Request, res: Response) {
    try {
      const httpResponse = await this.userService.getUserUrls(req.body);
      return res.status(httpResponse.statusCode).json(httpResponse.body);
    } catch (error) {
      const errorResponse = serverError(error as any);
      return res.status(errorResponse.statusCode).json(errorResponse.body);
    }
  }
}
