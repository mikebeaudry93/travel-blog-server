const imageUploadRouter = require("express").Router();
const { UploadTravelStory } = require("../controller/uploadTravelStory");
const upload = require("../middleware/cloudinary.config.js");
const TravelStorySchema = require("../modules/model");
const cloudinary = require("../api/cloudinary");
const auth = require("../middleware/auth");

// Fs is filesystem
const fs = require("fs").promises;

// Get Request
imageUploadRouter.get("/travel-post", auth, async (req, res) => {
  try {
    const memory = await TravelStorySchema.find({ user: req.user });
    res.json(memory);
  } catch (err) {
    res.status(500).send();
  }
});

// Post Request
imageUploadRouter.post(
  "/travel-post",
  (req, res, next) => {
    console.log("TRAVEL-POST BEFORE PARSE");
    next();
  },
  auth,
  upload.single("img"),
  (req, res, next) => {
    console.log("TRAVEL-POST AFTER PARSE");
    next();
  },
  UploadTravelStory
);

// Put Request
// imageUploadRouter.put(
//   "/travel-post/:id",
//   upload.single("img"),
//   async (req, res) => {
//     try {
//       const postId = req.params.id;

//       const { title, country, city, date, description } = req.body;

//       const updatedFile = await new Promise((res, rej) => {
//         cloudinary.v2.uploader.upload(
//           req.file.path,
//           { resource_type: "image" },
//           (err, val) => {
//             if (err) return rej(err);
//             res(val);
//           }
//         );
//       });

//       const originalPost = await TravelStorySchema.findById(postId);

//       if (!originalPost) {
//         return res.status(400).json({
//           errorMessage:
//             "No post with this id was found. Please contact the developer.",
//         });
//       }

//       originalPost.title = title;
//       originalPost.country = country;
//       originalPost.city = city;
//       originalPost.date = date;
//       originalPost.description = description;
//       originalPost.cloudinary_asset_id = updatedFile.asset_id;
//       originalPost.cloudinary_public_id = updatedFile.public_id;
//       originalPost.cloudinary_secure_url = updatedFile.secure_url;

//       const updatedPost = await originalPost.save();

//       res.json(updatedPos);
//     } catch (err) {
//       res.status(500).send();
//     }
//   }
// );

// Delete Request

imageUploadRouter.delete("/travel-post/:id", async (req, res) => {
  try {
    const postId = req.params.id;

    await new Promise((res, rej) => {
      cloudinary.v2.uploader.destroy(postId, (err, val) => {
        if (err) return rej(err);
        res(val);
      });
    });

    const existingPost = await TravelStorySchema.findOneAndDelete({
      cloudinary_public_id: postId,
    });

    if (!existingPost) {
      return res.status(400).json({
        errorMessage:
          "No post was found with this Id. Please contact the developer.",
      });
    }

    // if (existingPost.user.toString() !== req.user)
    //   return res.status(401).json({ errorMessage: "Unauthorized." });

    // await existingPost.delete();
    res.json(existingPost);
  } catch (err) {
    res.status(500).send();
  }
});

module.exports = { imageUploadRouter };

// module.exports.imageUploadRouter = imageUploadRouter
