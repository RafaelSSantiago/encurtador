import { ServerError } from "../errors/ServerError";
import { UnauthorizedError } from "../errors/UnauthorizedError";
import { HttpResponse } from "../protocols/http";

export const conflict = (error: Error): HttpResponse => ({
  statusCode: 409,
  body: {
    name: error.name,
    message: error.message,
  },
});

export const ok = (data: any): HttpResponse => ({
  statusCode: 200,
  body: data,
});

export const serverError = (error: Error): HttpResponse => ({
  statusCode: 500,
  body: new ServerError(error.stack as string),
});

export const badRequest = (error: Error): HttpResponse => ({
  statusCode: 400,
  body: {
    name: error.name,
    message: error.message,
  },
});

export const unauthorized = (): HttpResponse => ({
  statusCode: 401,
  body: new UnauthorizedError(),
});

export const notFoundError = (error: Error): HttpResponse => ({
  statusCode: 401,
  body: error
});
