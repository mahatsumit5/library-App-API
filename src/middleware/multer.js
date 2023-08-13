import multer from "multer";
const imgPath = "public/user/images";
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log("from multer", file);
    cb(null, imgPath);
  },
  filename: (req, file, cb) => {
    const fullFileName = Date.now() + "=" + file.originalname;
    cb(null, fullFileName);
  },
});

export const upload = multer({ storage });
