const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const multer = require("multer");
const TravelStory = require("./model");

const cors = require("cors");
app.use(
  cors({
    origin: "http://localhost:3000",
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

// Get request
app.get("/", async (req, res) => {
  try {
    const travelMemory = await TravelStory.find();
    res.json(travelMemory);
  } catch (err) {
    res.status(500).send();
  }
});

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now());
  },
});

var upload = multer({ storage: storage });


// Post request
app.post("/", upload.single("img"), (req, res, next) => {
  var obj = {
    title: req.body.title,
    country: req.body.country,
    city: req.body.city,
    date: req.body.date,
    description: req.body.description,
    img: {
      data: fs.readFileSync(
        path.join(__dirname + "/uploads/" + req.file.filename)
      ),
      contentType: "image/png",
    },
  };
  TravelStory.create(obj, (err, item) => {
    if (err) {
      console.log(err);
    } else {
      item.save();
      res.redirect("/");
    }
  });
});

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
