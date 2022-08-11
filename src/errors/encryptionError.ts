import { ErrorTemplate } from "./errorTemplate";

export class EncryptionError extends ErrorTemplate {
  statusCode = 500;

  constructor(public msg: string) {
    super();
    Object.setPrototypeOf(this, EncryptionError.prototype);
  }

  errorMessage() {
    return [{ message: this.msg }];
  }
}
