import express, { Router } from "express";
import {
  addBook,
  getBook,
  updateBook,
  deleteBook,
} from "../models/book/BookModel.js";
import { adminAuth, auth } from "../middleware/authMiddleware.js";
const router = express.Router();

router.post("/", auth, adminAuth, async (req, res) => {
  try {
    console.log(req.body);

    const result = await addBook(req.body);

    result?._id
      ? res.json({
          status: "success",
          message: "Book added Successfully",
        })
      : res.json({
          status: "error",
          Message: "Unable to add books, Try Again",
        });
  } catch (error) {
    res.json({
      status: "error",
      message: error.message,
    });
    console.log(error);
  }
});

router.get("/", async (req, res) => {
  try {
    const books = await getBook();

    res.json({
      status: "success",
      message: "book list shown",
      books,
    });
  } catch (error) {}
});

router.put("/", auth, adminAuth, async (req, res) => {
  try {
    const { __v, _id, ...rest } = req.body;
    const result = await updateBook(_id, rest);
    console.log(req.body);
    result?._id
      ? res.json({
          status: "success",
          message: "Book has been updated",
        })
      : res.json({
          status: "error",
          message: "unable to update book",
        });
  } catch (error) {
    res.json({
      status: "error",
      message: error.message,
    });
  }
});
router.delete("/:_id", auth, adminAuth, async (req, res) => {
  //colon will be variable now
  try {
    const { _id } = req.params;
    console.log(_id);
    const result = await deleteBook(_id);
    result?._id
      ? res.json({
          status: "success",
          message: "The book has been deleted",
        })
      : res.json({
          status: "error",
          message: "unable to delete book",
        });
  } catch (error) {
    res.json({
      status: "error",
      message: error.message,
    });
  }
});

export default router;
