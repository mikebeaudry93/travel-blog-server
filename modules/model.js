const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const travelSchema = new mongoose.Schema(
  {
    title: String,
    country: String,
    city: String,
    date: String,
    description: String,
    cloudinary_asset_id: String,
    cloudinary_public_id: String,
    cloudinary_secure_url: String,
    user: { type: ObjectId, required: true },
  },
  {
    timestamps: true,
  }
);

const TravelStorySchema = mongoose.model("travel-story", travelSchema);

module.exports = TravelStorySchema;
