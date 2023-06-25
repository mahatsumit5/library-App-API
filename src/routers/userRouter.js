import express from "express";
import { insertUser } from "../models/user/UserModel.js";
import { hashPassword } from "../utils/bcrypt.js";
const router = express.Router();

router.get("/", (req, res) => {
  try {
    console.log(req.body);
    res.json({
      status: "success",
      message: "Here are the user information",
    });
  } catch (error) {
    console.log(error);
  }
});

router.post("/", async (req, res) => {
  try {
    req.body.password = hashPassword(req.body.password);
    const user = await insertUser(req.body);
    user?._id
      ? res.json({
          status: "success",
          message: "new user have been created",
        })
      : res.json({
          status: "error",
          message: "unabale to create user",
        });
  } catch (error) {
    let msg = error.message;

    if (msg.includes("E11000 duplicate key error")) {
      msg = "Ther is another user who uses this email in the system";
    }
    res.json({
      statu: "error",
      message: msg,
    });
  }
});

export default router;
