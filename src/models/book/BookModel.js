import bookSchema from "./bookSchema.js";

export const addBook = (bookObj) => {
  return bookSchema(bookObj).save();
};

export const getBook = () => {
  return bookSchema.find();
};

export const updateBook = (_id, obj) => {
  return bookSchema.findByIdAndUpdate(_id, obj);
};

export const deleteBook = (_id) => {
  return bookSchema.findByIdAndDelete(_id);
};
