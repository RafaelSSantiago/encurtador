import { ServerError } from "../errors/ServerError";
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
