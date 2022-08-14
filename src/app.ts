import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import "express-async-errors";
import "dotenv/config";

import { errorCheck } from "./middleware/errorCheck";
import { signUpRouter } from "./routes/auth/signup";
import { signOutRouter } from "./routes/auth/signout";
import { NotFoundError } from "./errors/notFoundError";
import { DBConnectionError } from "./errors/DBConnectionError";
import { signInRouter } from "./routes/auth/signin";
import { currentUserRouter } from "./routes/auth/currentUser";

const app = express();

app.use(cors());
app.use(express.json());

app.use(signUpRouter);
app.use(signOutRouter);
app.use(signInRouter);
app.use(currentUserRouter);

app.all("*", () => {
  throw new NotFoundError("The page isn't available!");
});

app.use(errorCheck);

const start = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new NotFoundError("No URI has been given!");
    }
    if (!process.env.SECRET_TOKEN) {
      throw new NotFoundError("No secret token has been given!");
    }

    await mongoose.connect(process.env.MONGO_URI);
  } catch (err) {
    throw new DBConnectionError(
      "Something wrong with the connection to the DB!"
    );
  }

  app.listen(4000, () => {
    console.log("Server is up on port 4000!");
  });
};

start();
