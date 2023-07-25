import reviewSchema from "./ReviewSchema.js";

export const addReview = (reviewObj) => {
  return reviewSchema(reviewObj).save();
};

export const getReview = () => {
  return reviewSchema.find();
};

export const updateReview = (_id, obj) => {
  return reviewSchema.findByIdAndUpdate(_id, obj);
};

export const deleteReview = (_id) => {
  return reviewSchema.findByIdAndDelete(_id);
};
