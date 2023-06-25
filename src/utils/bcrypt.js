import bcrypt from "bcryptjs";

const salt = 10;
export const hashPassword = (plainPassword) => {
  return bcrypt.hashSync(plainPassword, salt);
};
