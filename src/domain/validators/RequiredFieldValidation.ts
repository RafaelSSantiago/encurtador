import { MissingParamError } from "../errors/MissingParamError";
import { Validation } from "../protocols/validation";

export class RequiredFieldValidation implements Validation {
  constructor(private readonly fieldName: string) {}

  validate(input: any): any {
    if (!input[this.fieldName]) {
      return new MissingParamError(this.fieldName);
    }
  }
}
