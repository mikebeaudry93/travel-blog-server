const TravelStorySchema = require("../model");

const cloudinary = require("../api/cloudinary");

// Fs is filesystem
const fs = require("fs").promises;

const UploadTravelStory = async (req, res) => {
  try {
    // console.log("req.file:", req.file);
    // w3schools MDN
    var uploadedFile = await new Promise((res, rej) => {
      cloudinary.v2.uploader.upload(
        req.file.path,
        {
          resource_type: "image",
        },
        (err, val) => {
          if (err) return rej(err);
          res(val);
        }
      );
    });

    // console.log("uploadedFile:", uploadedFile);

    const travelStoryUploaded = new TravelStorySchema({
      title: req.body.title,
      country: req.body.country,
      city: req.body.city,
      date: req.body.date,
      description: req.body.description,
      cloudinary_asset_id: uploadedFile.asset_id,
      cloudinary_public_id: uploadedFile.public_id,
      cloudinary_secure_url: uploadedFile.secure_url,
    });

    const savedTravelStory = await travelStoryUploaded.save();

    // Delete unneeded file after finished uploaded
    await fs.unlink(req.file.path);

    res.json(savedTravelStory);
  } catch (error) {
    return res.status(400).json({
      message: `image upload failed, check ot see the ${error}`,
      status: "error",
    });
  }
};

module.exports = { UploadTravelStory };
