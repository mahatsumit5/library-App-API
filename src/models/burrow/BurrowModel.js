import burrowSchema from "./BurrowSchema.js";

export const addBurrow = (obj) => {
  return burrowSchema(obj).save();
};

export const getBurrow = () => {
  return burrowSchema.find();
};

export const getBurrowbyUserId = (userId) => {
  return burrowSchema.find({ userId });
};

export const updateBurrow = (_id, formData) => {
  return burrowSchema.findByIdAndUpdate(_id, formData);
};

export const deleteBurrow = (_id) => {
  return burrowSchema.findByIdAndDelete(_id);
};
