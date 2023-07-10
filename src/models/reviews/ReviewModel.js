import reviewSchema from "./ReviewSchema.js";

export const addReview = (reviewObj) => {
  return reviewSchema(reviewObj).save();
};

export const getReview = (bookId) => {
  return reviewSchema.find({ bookId });
};

// export const updateBook = (_id, obj) => {
//   return bookSchema.findByIdAndUpdate(_id, obj);
// };

// export const deleteBook = (_id) => {
//   return bookSchema.findByIdAndDelete(_id);
// };
