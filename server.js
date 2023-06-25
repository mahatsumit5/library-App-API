import dotenv from "dotenv";
dotenv.config();
const PORT = process.env.PORT || 8000;

import express from "express";
const app = express();

app.use("/", (req, res) => {
  res.json({
    status: "sucess",
    message: "Server is running",
  });
});

app.listen(PORT, (error) => {
  error
    ? console.log("Error starting server")
    : console.log(`Server is up and running in http://localhost:${PORT}`);
});
