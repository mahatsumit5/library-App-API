import express from "express";
import {
  addBurrow,
  getBurrow,
  getBurrowByUserId,
  updateBurrow,
} from "../models/burrow/BurrowModel.js";
import { updateBook } from "../models/book/BookModel.js";

const router = express.Router();
const twoWeeks = 2 * 7;
router.post("/", async (req, res) => {
  try {
    console.log(req.body);
    const dueDate = new Date();
    req.body.dueDate = dueDate.setDate(dueDate.getDate() + twoWeeks);
    const result = await addBurrow(req.body);

    if (result?._id) {
      //make book ntot availabel
      const update = await updateBook(req.body.bookId, {
        isAvailable: false,
        dueDate,
      });
      if (update?._id) {
        return res.json({
          status: "success",
          message: "Your book has been burrowed and update in the system",
        });
      }
    }
    res.json({
      status: "error",
      message: "error in the system",
    });
  } catch (error) {
    res.json({
      status: "error",
      message: error.message,
    });
  }
});

router.get("/", async (req, res) => {
  try {
    const { role, _id } = req.userInfo;
    const burrowList =
      role === "admin" ? await getBurrow() : await getBurrowByUserId(_id);
    res.json({
      status: "success",
      message: "burrow list shown",
      burrowList,
    });
  } catch (error) {
    res.json({
      status: "error",
      message: error.message,
    });
  }
});

router.put("/", async (req, res) => {
  try {
    const { _id, bookId } = req.body;
    console.log(req.body);
    const returnedDate = new Date();
    req.body.returnedDate = returnedDate.setDate(returnedDate.getDate());
    const result = await updateBurrow(_id, {
      isReturned: true,
      returnedDate,
      dueDate: null,
    });

    if (result?._id) {
      //make book not availabel
      const update = await updateBook(bookId, {
        isAvailable: true,
        returnedDate,
      });
      if (update?._id) {
        return res.json({
          status: "success",
          message: "Book return Successfull",
        });
      }
    }
    res.json({
      status: "error",
      message: "error in the system",
    });
  } catch (error) {
    res.json({
      status: "error",
      message: error.message,
    });
  }
});

export default router;
