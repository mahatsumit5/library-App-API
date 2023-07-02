import bookSchema from "./bookSchema.js";

export const addBook = (bookObj) => {
  return bookSchema(bookObj).save();
};

export const getBook = () => {
  return bookSchema.find();
};

export const updateBook = (_id, formData) => {
  return bookSchema.findByIdAndUpdate(_id, formData);
};

export const deleteBook = (_id) => {
  return bookSchema.findByIdAndDelete(_id);
};
