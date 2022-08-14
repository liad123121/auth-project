import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { NotFoundError } from "../../errors/notFoundError";
import { ValidationSimpleError } from "../../errors/validationSimpleError";
import { User, UserAttrs } from "../../models/User";

const router = express.Router();

router.post("/api/auth/signin", async (req: Request, res: Response) => {
  const { username, password } = req.body as UserAttrs;
  const exists = await User.findOne({
    username: username.trim().toLowerCase(),
  });

  if (!exists) {
    throw new NotFoundError("Username doesn't exist!");
  }

  const compare = await exists.comparePasswords(password);
  if (!compare) {
    throw new ValidationSimpleError("Password is incorrect!");
  }

  const token = jwt.sign({ username }, process.env.SECRET_TOKEN!);

  res.send(token);
});

export { router as signInRouter };
