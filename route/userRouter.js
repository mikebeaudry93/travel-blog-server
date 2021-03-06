const userUploadRouter = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../modules/userModel");
const auth = require("../middleware/auth");

userUploadRouter.post("/", async (req, res) => {
  try {
    const { email, password, passwordVerify } = req.body;

    //   validation

    if (!email || !password || !passwordVerify)
      return res
        .status(400)
        .json({ errorMessage: "Please fill out all required fields." });

    if (password.length < 6)
      return res
        .status(400)
        .json({ errorMessage: "Password must be at least 6 characters" });

    if (password !== passwordVerify)
      return res.status(400).json({ errorMessage: "Passwords do not match" });

    //   make sure no account exists for this email
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res
        .status(400)
        .json({ errorMessage: "An account with that email already exists." });

    // hash the password
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    // save the user in the database
    const newUser = new User({
      email,
      passwordHash,
    });

    const savedUseer = await newUser.save();

    // create JWT token
    const token = jwt.sign(
      {
        id: savedUseer._id,
      },
      process.env.JWT_SECRET
    );

    res.send({ token });
  } catch (err) {
    res.status(500).send();
  }
});

userUploadRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // validation
    if (!email || !password)
      return res
        .status(401)
        .json({ errorMessage: "Please fill out all required fields." });

    // get existing user
    const existingUser = await User.findOne({ email });
    if (!existingUser)
      return res.status(401).json({ errorMessage: "Wrong email or password." });

    const correctPassword = await bcrypt.compare(
      password,
      existingUser.passwordHash
    );

    if (!correctPassword)
      return res.status(401).json({ errorMessage: "Wrong email or password." });

    //   create jwt token

    const token = jwt.sign(
      {
        id: existingUser._id,
      },
      process.env.JWT_SECRET
    );

    res.send({ token });
  } catch (err) {
    console.log("ERROR MESSAGE", err.message);
    res.status(500).send();
  }
});

userUploadRouter.get("/loggedIn", auth, (req, res) => {
  try {
    res.json(req.user);
  } catch (err) {
    res.json(null);
  }
});

module.exports = { userUploadRouter };
