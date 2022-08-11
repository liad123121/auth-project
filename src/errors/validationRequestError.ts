import { ErrorTemplate } from "./errorTemplate";
import { ValidationError } from "express-validator";

export class ValidationRequestError extends ErrorTemplate {
  statusCode = 400;
  constructor(public msg: ValidationError[]) {
    super();
    Object.setPrototypeOf(this, ValidationRequestError.prototype);
  }

  errorMessage() {
    const error = this.msg.map((err) => {
      return { message: err.msg };
    });

    return error;
  }
}
