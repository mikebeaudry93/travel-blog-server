require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const { imageUploadRouter } = require("./route/uploadImageRoute");
const { userUploadRouter } = require("./route/userRouter");

const app = express();

const cors = require("cors");
app.use(
  cors({
    origin: ["http://localhost:3000", "https://travellogger.netlify.app"],
    credentials: true,
  })
);

const fs = require("fs");
const path = require("path");

// Port
const port = process.env.PORT || 5002;

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

async function startApp() {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      bufferCommands: true,
      useFindAndModify: false,
    });
    console.log(`Database connected`);

    app.use("/api", imageUploadRouter);
    app.use("/auth", userUploadRouter);

    app.listen(port, (err) => {
      console.log(`Server started on port ${port}`);
      if (err) throw error;
      console.log("Server listening on port", port);
    });
  } catch (err) {
    console.log("an errorccurred==>>", err);
  }
}

startApp();
