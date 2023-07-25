import dotenv from "dotenv";
dotenv.config();
const PORT = process.env.PORT || 8000;

import express from "express";
import morgan from "morgan";
const app = express();
//connect database
import connectMongoDB from "./src/config/mongoConfig.js";
connectMongoDB();
//middlewares
app.use(morgan("dev"));
app.use(express.json()); //to send file from fron end to server
import cors from "cors";
app.use(cors());

import path from "path";
const _dirName = path.resolve();
app.use(express.static(_dirName + "/build"));

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

app.listen(PORT, (error) => {
  error
    ? console.log("Error starting server")
    : console.log(`Server is up and running in http://localhost:${PORT}`);
});
