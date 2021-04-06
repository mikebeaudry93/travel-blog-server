const mongoose = require("mongoose");

const travelSchema = new mongoose.Schema(
  {
    title: String,
    country: String,
    city: String,
    date: String,
    description: String,
    img: {
      data: Buffer,
      contentType: String,
    },
  },
  {
    timestamps: true,
  }
);

const TravelStory = mongoose.model("travel-story", travelSchema);

module.exports = TravelStory;
