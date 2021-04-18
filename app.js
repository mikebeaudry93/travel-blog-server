const express = require("express");
const app = express();
const mongoose = require("mongoose");
const { imageUploadRouter } = require("./route/uploadImageRoute");
const { userUploadRouter } = require("./route/userRouter");
const cookieParser = require("cookie-parser");

const cors = require("cors");
app.use(
  cors({
    origin: ["http://localhost:3000", "https://travellogger.netlify.app"],
    credentials: true,
  })
);

const fs = require("fs");
const path = require("path");
require("dotenv").config();

// Port
const port = process.env.PORT || 5002;

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

async function connectMongoose() {
  try {
    await mongoose.connect(
      process.env.MONGO_URL,
      { useNewUrlParser: true, useUnifiedTopology: true, bufferCommands: true },
      (err) => {
        console.log("connected to MongoDB");
      }
    );
  } catch (err) {
    console.log("error");
  }
}

connectMongoose();

// const connectMongoos = async () => {
//   const result = await mongoose.connect(
//     process.env.MONGO_URL,
//     { useNewUrlParser: true, useUnifiedTopology: true, bufferCommands: true },
//     (err) => {
//       console.log("connected to MongoDB");
//     }
//   );

//   return result;
// };

// connectMongoos();

app.use("/api", imageUploadRouter);
app.use("/auth", userUploadRouter);

// Set EJS templating engine
app.set("view engine", "ejs");

app.listen(port, (err) => {
  console.log(`Server started on port ${port}`);
  if (err) throw error;
  console.log("Server listening on port", port);
});
