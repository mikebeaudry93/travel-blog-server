const express = require("express");
const app = express();
const mongoose = require("mongoose");
const { imageUploadRouter } = require("./route/uploadImageRoute");
const { userUploadRouter } = require("./route/userRouter");
const cookieParser = require("cookie-parser");

const cors = require("cors");
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

const fs = require("fs");
const path = require("path");
require("dotenv/config");

// Port
const port = process.env.PORT || "5000";

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

app.use("/api", imageUploadRouter);
app.use("/auth", userUploadRouter);

// Set EJS templating engine
app.set("view engine", "ejs");

app.listen(port, (err) => {
  if (err) throw error;
  console.log("Server listening on port", port);
});

mongoose.connect(
  process.env.MONGO_URL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    console.log("connected to MongoDB");
  }
);
