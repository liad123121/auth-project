import { ErrorTemplate } from "./errorTemplate";

export class AuthorizationError extends ErrorTemplate {
  statusCode = 401;

  constructor(public msg: string) {
    super();
    Object.setPrototypeOf(this, AuthorizationError.prototype);
  }

  errorMessage() {
    return [{ message: this.msg }];
  }
}
