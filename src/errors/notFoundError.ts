import { ErrorTemplate } from "./errorTemplate";

export class NotFoundError extends ErrorTemplate {
  statusCode = 404;

  constructor(public msg: string) {
    super();
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }

  errorMessage() {
    return [{ message: this.msg }];
  }
}
