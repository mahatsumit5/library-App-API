import express from "express";
import { getUserByEmail, insertUser } from "../models/user/UserModel.js";
import { comparePass, hashPassword } from "../utils/bcrypt.js";
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
          message: "New user has been created",
        })
      : res.json({
          status: "error",
          message: "unabale to create user",
        });
  } catch (error) {
    let msg = error.message;

    if (msg.includes("E11000 duplicate key error")) {
      msg = "There is another user who uses this email in the system";
    }
    res.json({
      status: "error",
      message: msg,
    });
  }
});

router.post("/login", async (req, res) => {
  try {
    //get the data
    console.log(req.body);
    const { email, password } = req.body;
    // check if the user exit with received  email and get user
    const user = await getUserByEmail(email);
    if (user?._id) {
      // check the password using bycrypt
      const isMatch = comparePass(password, user.password);
      console.log(isMatch);
      if (isMatch) {
        user.password = undefined;
        // const { password,..rest } = user;
        res.json({
          status: "success",
          message: "login successfull",
          user,
        });
      }
    } else {
      res.json({
        status: "error",
        message: "Invalid Credentials",
      });
    }
  } catch (error) {
    let msg = error.message;

    if (msg.includes("E11000 duplicate key error")) {
      msg = "There is another user who uses this email in the system";
    }
    res.json({
      status: "error",
      message: msg,
    });
  }
});

export default router;
