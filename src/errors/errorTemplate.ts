import { ValidationError } from "express-validator";

export abstract class ErrorTemplate extends Error {
  abstract statusCode: number;
  abstract msg: string | ValidationError[];

  constructor() {
    super();
    Object.setPrototypeOf(this, ErrorTemplate.prototype);
  }

  abstract errorMessage(): { message: string }[];
}
