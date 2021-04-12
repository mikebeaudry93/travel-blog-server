const mongoose = require("mongoose");

const travelSchema = new mongoose.Schema(
  {
    title: String,
    country: String,
    city: String,
    date: String,
    description: String,
    cloudinary_asset_id: String,
    cloudinary_public_id: String,
    cloudinary_secure_url: String
//    img: { type: String },
  },
  {
    timestamps: true,
  }
);

const TravelStorySchema = mongoose.model("travel-story", travelSchema);

module.exports = TravelStorySchema;
