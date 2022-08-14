import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AuthorizationError } from "../errors/authorizationError";

export const tokenCheck = (req: Request, res: Response, next: NextFunction) => {
  if (!req.user) {
    throw new AuthorizationError("Token isn't valid!");
  }

  const reqToken =
    req.headers.authorization && req.headers.authorization.split(" ")[1];

  if (!reqToken) {
    throw new AuthorizationError("Token isn't valid!");
  }

  const token = jwt.verify(reqToken, process.env.SECRET_TOKEN!);
  if (!token) {
    throw new AuthorizationError("Token isn't valid!");
  }

  next();
};
