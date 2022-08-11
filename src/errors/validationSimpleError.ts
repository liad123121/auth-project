import { ErrorTemplate } from "./errorTemplate";

export class ValidationSimpleError extends ErrorTemplate {
  statusCode = 400;

  constructor(public msg: string) {
    super();
    Object.setPrototypeOf(this, ValidationSimpleError.prototype);
  }

  errorMessage() {
    return [{ message: this.msg }];
  }
}
