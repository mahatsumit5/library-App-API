import express, { Router } from "express";
import { addReview, getReview } from "../models/reviews/ReviewModel.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const { bookId } = req.body;
    console.log(bookId);
    const reviewList = await getReview(bookId);
    console.log(reviewList);
    reviewList
      ? res.json({
          status: "success",
          message: "ReviewList shown",
          reviewList,
        })
      : res.json({
          status: "error",
          Message: "unableto get review ",
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

    const result = await addReview(req.body);

    result?._id
      ? res.json({
          status: "success",
          message: "Review Added successfully",
        })
      : res.json({
          status: "error",
          Message: "unable to add reviews ",
        });
  } catch (error) {
    res.json({
      status: "error",
      message: error.message,
    });
    console.log(error);
  }
});

export default router;
