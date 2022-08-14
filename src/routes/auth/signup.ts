import express, { Request, Response } from "express";
import { body } from "express-validator";
import { ValidationSimpleError } from "../../errors/validationSimpleError";
import { validationCheck } from "../../middleware/validationCheck";
import { User } from "../../models/User";
import jwt from "jsonwebtoken";

const router = express.Router();

interface UserAttrs {
  username: string;
  password: string;
}

declare global {
  namespace Express {
    interface Request {
      user: string;
    }
  }
}

router.post(
  "/api/auth/signup",
  [
    body("username")
      .trim()
      .not()
      .isEmpty()
      .withMessage("Username must be provided!"),
    body("password").not().isEmpty().withMessage("Password must be provided!"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must contain atleast 6 characters!"),
  ],
  validationCheck,
  async (req: Request, res: Response) => {
    const { username, password } = req.body as UserAttrs;
    const exists = await User.findOne({
      username: username.trim().toLowerCase(),
    });

    if (exists) {
      throw new ValidationSimpleError("User already exists!");
    }

    const user = User.build({
      username: username.trim().toLowerCase(),
      password,
    });

    const token = jwt.sign({ username }, process.env.SECRET_TOKEN!);
    req.user = token;

    await user.save();

    res.status(201).send(user);
  }
);

export { router as signUpRouter };
