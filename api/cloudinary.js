const cloudinary = require("cloudinary");

require("dotenv").config();

console.log("C_HOST:",process.env.CLOUDINARY_HOST)
console.log("C_API_KEY:", process.env.CLOUDINARY_API_KEY)
console.log("C_API_SECRET:", process.env.CLOUDINARY_API_SECRET)


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_HOST,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

module.exports = cloudinary;
