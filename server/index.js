const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const { mongoose } = require("mongoose");
const cookieParser = require("cookie-parser");

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("connected!"))
  .catch((err) => console.log(err));

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

app.use("/", require("./routes/authRoutes"));
const port = 8000;

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
