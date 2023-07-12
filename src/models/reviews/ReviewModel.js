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

export const deleteReview = (_id) => {
  return reviewSchema.findByIdAndDelete(_id);
};
