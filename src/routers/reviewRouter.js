import express, { Router } from "express";
import {
  addReview,
  deleteReview,
  getReview,
  updateReview,
} from "../models/reviews/ReviewModel.js";
import { auth, adminAuth } from "../middleware/authMiddleware.js";

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
router.post("/", auth, async (req, res) => {
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

router.put("/", auth, adminAuth, async (req, res) => {
  try {
    const { __v, _id, ...rest } = req.body;
    const result = await updateReview(_id, rest);
    console.log(req.body);
    result?._id
      ? res.json({
          status: "success",
          message: "Review has been updated",
        })
      : res.json({
          status: "error",
          message: "unable to update review",
        });
  } catch (error) {
    res.json({
      status: "error",
      message: error.message,
    });
  }
});

router.delete("/:_id", auth, async (req, res) => {
  try {
    const { _id } = req.params;
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
