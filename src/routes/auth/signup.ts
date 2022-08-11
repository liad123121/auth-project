import express, { Request, Response } from "express";
import { body } from "express-validator";

const router = express.Router();

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
  (req: Request, res: Response) => {}
);

export { router as signUpRouter };
