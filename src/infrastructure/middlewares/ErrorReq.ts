import { Request, Response, NextFunction } from "express";

export function errorReq(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error(err.stack);
  res.status(500).send({ error: "Something went wrong!" });
}