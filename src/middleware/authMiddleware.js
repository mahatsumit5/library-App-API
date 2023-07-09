import { getUserById } from "../models/user/UserModel.js";

export const auth = async (req, res, next) => {
  //let it go th next router
  //or
  //stop here and response to client
  try {
    const { authorization } = req.headers;
    //every request have special key|| userId
    //get the user from database
    // console.log(authorization);
    const user = await getUserById(authorization);
    // console.log(user);
    //check the role
    if (user?._id) {
      user.password = undefined;
      req.userInfo = user;
      //let it go to next router
      return next();
    }
    //stop here and response to client
    res.status(403).json({
      status: "error",
      message: "Permission Denied",
    });
  } catch (error) {
    res.json({
      status: "error",
      message: error.message || "Something went wrong",
    });
  }
};

export const adminAuth = async (req, res, next) => {
  //let it go th next router
  //or
  //stop here and response to client
  try {
    const { role } = req.userInfo;
    role === "admin"
      ? next()
      : res.status(403).json({
          status: "error",
          message: "not allowed because you are not admin",
        });
  } catch (error) {
    res.json({
      status: "error",
      message: error.message || "Something went wrong",
    });
  }
};
