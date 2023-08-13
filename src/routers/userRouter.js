import express from "express";
import {
  getUser,
  getUserByEmail,
  getUserById,
  getUserByRole,
  insertUser,
  updateUser,
} from "../models/user/UserModel.js";
import { comparePass, hashPassword } from "../utils/bcrypt.js";
import { adminAuth, auth } from "../middleware/authMiddleware.js";
const router = express.Router();
import multer from "multer";
const imgPath = "public/user/images";
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log("from multer", file);
    cb(null, imgPath);
  },
  filename: (req, file, cb) => {
    const fullFileName = Date.now() + "=" + file.originalname;
    cb(null, fullFileName);
  },
});

const upload = multer({ storage });
router.get("/", auth, async (req, res) => {
  try {
    const { _id } = req.userInfo;
    const user = await getUserById(_id);
    res.json({
      status: "success",
      message: "Here is the user information",
      user,
    });
  } catch (error) {
    res.json({
      stateus: "error",
      message: error.message,
    });
    console.log(error);
  }
});

router.get("/students", auth, adminAuth, async (req, res) => {
  try {
    const studentList = await getUserByRole("student");
    studentList?.map((student) => (student.password = undefined));
    res.json({
      status: "success",
      message: "Here are the list of Students",
      studentList,
    });
  } catch (error) {
    res.json({
      stateus: "error",
      message: error.message,
    });
    console.log(error);
  }
});

router.post("/login", async (req, res) => {
  try {
    //get the data
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
        return res.json({
          status: "success",
          message: `Welcome Back ${user.fName} ${user.lName} `,
          user,
        });
      }
    }
    res.json({
      status: "error",
      message: `Invalid Credintails`,
    });
  } catch (error) {
    res.json({
      status: "error",
      message: error.message,
    });
  }
});

router.post("/", async (req, res) => {
  try {
    console.log(req.body);
    req.body.password = hashPassword(req.body.password);
    const user = await insertUser(req.body);
    user?._id
      ? res.json({
          status: "success",
          message: "Congratulations, New user has been created",
        })
      : res.json({
          status: "error",
          message: " Unable to create user",
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

router.put("/update", auth, async (req, res) => {
  try {
    const { __v, _id, ...rest } = req.body;
    console.log(rest);
    const user = await updateUser(_id, rest);
    user?._id
      ? res.json({
          status: "success",
          message: "Update Successfull",
          user,
        })
      : res.json({
          status: "error",
          message: " unable to Update",
        });
  } catch (error) {
    res.json({
      status: "error",
      message: error.messages,
    });
  }
});

router.put("/uploadImg", upload.single("profile"), auth, async (req, res) => {
  try {
    const { _id } = req.userInfo;
    console.log(_id);

    const user = await updateUser(_id, { profile: req.file.path });
    user?._id
      ? res.json({
          status: "success",
          message: "Update Successfull",
          user,
        })
      : res.json({
          status: "error",
          message: " unable to Update",
        });
  } catch (error) {
    res.json({
      status: "error",
      message: error.messages,
    });
  }
});

export default router;
