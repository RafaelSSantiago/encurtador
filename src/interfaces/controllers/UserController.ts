import { RegisterUserUseCase } from "../../application/RegisterUserUseCase";
import { Request, Response } from "express";

export class Usercontroller {
  constructor(private registerUserUseCase: RegisterUserUseCase) {}

  async createUSerdDb(req: Request, res: Response) {
    const user = await this.registerUserUseCase.execute(req.body);
  }
}
