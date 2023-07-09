import burrowSchema from "./BurrowSchema.js";

export const addBurrow = (obj) => {
  return burrowSchema(obj).save();
};
// get all burrows for admin only

export const getBurrow = () => {
  return burrowSchema.find();
};

// get burrows based on id provided

export const getBurrowByUserId = (userId) => {
  return burrowSchema.find({ userId });
};

export const updateBurrow = (_id, obj) => {
  return burrowSchema.findByIdAndUpdate(_id, obj);
};
