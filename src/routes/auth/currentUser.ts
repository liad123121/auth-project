import express, { Request, Response } from "express";
import { tokenCheck } from "../../middleware/tokenCheck";

const router = express.Router();

router.get(
  "/api/auth/currentuser",
  tokenCheck,
  (req: Request, res: Response) => {
    res.send(req.user);
  }
);

export { router as currentUserRouter };
