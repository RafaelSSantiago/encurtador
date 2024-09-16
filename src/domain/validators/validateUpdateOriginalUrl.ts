// Adicione validações de entrada
import { validationResult, body, param } from "express-validator";

export const validateUpdateOriginalUrl = [
  param("hash").isString().notEmpty().withMessage("Hash is required"),
  body("originalUrl").isURL().withMessage("Valid URL is required"),
  body("user").isString().notEmpty().withMessage("User is required"),
];
