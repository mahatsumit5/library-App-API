import dotenv from "dotenv";
dotenv.config();
const PORT = process.env.PORT || 8000;

import express from "express";
import morgan from "morgan";
const app = express();
//connect database

//middlewares
app.use(morgan("dev"));
app.use(express.json()); //to send file from fron end to server
import cors from "cors";
app.use(cors());

import path from "path";
const _dirName = path.resolve();
app.use(express.static(_dirName + "/build")); //GIVE ACCESS TO USE FILE INSIDE OF BUILD FOLDER

import { auth } from "./src/middleware/authMiddleware.js";
//apis
import userRouter from "./src/routers/userRouter.js";
import bookRouter from "./src/routers/bookRouter.js";
import burrowRouter from "./src/routers/burrowRouter.js";
import reviewRouter from "./src/routers/reviewRouter.js";
app.use("/api/v1/user", userRouter);
app.use("/api/v1/book", bookRouter);
app.use("/api/v1/burrow", auth, burrowRouter);
app.use("/api/v1/review", reviewRouter);

app.use("/", (req, res) => {
  res.sendFile(_dirName + "/build/index.html");
});

import mongoose from "mongoose";

const dbLink =
  process.env.NODE_ENV === "production"
    ? process.env.MONGO_CLIENT
    : "mongodb://127.0.0.1:27017/librarySystem";

mongoose
  .connect(dbLink)
  .then(() => {
    console.log("mongo connected");
    app.listen(PORT, (err) => {
      err
        ? console.log(err.message)
        : console.log(`Server running at http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error.message);
  });
