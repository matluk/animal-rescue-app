const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const saltRounds = 10;

const register = async (req, res, next) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
      role: req.body.role
    });

    await newUser.save();
    res.status(201).send("User registered successfully.");
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(401).send("Invalid email.");
    }

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!validPassword) {
      return res.status(401).send("Invalid password.");
    }

    const token = jwt.sign({ userId: user._id, role: user.role }, process.env.SECRET_KEY , {
      expiresIn: "1h",
    });
    res.json({ token: token, role: user.role, username: user.username, email: user.email });
  } catch (error) {
    next(error);
  }
};


module.exports = { register, login}