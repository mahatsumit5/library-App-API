import express from "express";
import { addBurrow } from "../models/burrow/BurrowModel.js";
import { updateBook } from "../models/book/BookModel.js";

const router = express.Router();
const twoWeeks = 2 * 7;
router.post("/", async (req, res) => {
  console.log(req.body);
  try {
    const dueDate = new Date();
    req.body.dueDate = dueDate.setDate(dueDate.getDate() + twoWeeks);
    const result = await addBurrow(req.body);
    if (result?._id) {
      //make book ntot availabel
      const update = await updateBook(req.body.bookId, {
        isAvailable: false,
        dueDate,
      });
      res.json({
        status: "success",
        message: "Your book has been burrowd and update in the system",
      });
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
