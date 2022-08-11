import { ErrorTemplate } from "./errorTemplate";

export class DBConnectionError extends ErrorTemplate {
  statusCode = 500;

  constructor(public msg: string) {
    super();
    Object.setPrototypeOf(this, DBConnectionError.prototype);
  }

  errorMessage() {
    return [{ message: this.msg }];
  }
}
