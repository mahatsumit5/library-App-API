import express, { Router } from "express";
import {
  addReview,
  deleteReview,
  getReview,
} from "../models/reviews/ReviewModel.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const reviewList = await getReview();
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
  }
});

router.delete("/", async (req, res) => {
  try {
    const { _id } = req.body;
    console.log(_id);
    const result = await deleteReview(_id);
    result?._id
      ? res.json({
          status: "success",
          message: "Review Deleted",
        })
      : res.json({
          status: "error",
          message: "Delete Not Successfull",
        });
  } catch (error) {
    res.json({
      status: "error",
      message: error.message,
    });
  }
});

export default router;
