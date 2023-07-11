import reviewSchema from "./ReviewSchema.js";

export const addReview = (reviewObj) => {
  return reviewSchema(reviewObj).save();
};

export const getReview = () => {
  return reviewSchema.find();
};

// export const updateBook = (_id, obj) => {
//   return bookSchema.findByIdAndUpdate(_id, obj);
// };

// export const deleteBook = (_id) => {
//   return bookSchema.findByIdAndDelete(_id);
// };
