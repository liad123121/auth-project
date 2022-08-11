import { Request, Response, NextFunction } from "express";
import { ErrorTemplate } from "../errors/errorTemplate";

export const errorCheck = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof ErrorTemplate) {
    return res.status(err.statusCode).send(err.errorMessage());
  }

  return res.send(err.message);
};
