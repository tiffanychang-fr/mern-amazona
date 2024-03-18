import express from "express";
import expressAsyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import User from "../models/userModel.js";
import { generateToken } from "../utils.js";

const userRouter = express.Router();

// POST localhost:5000/api/users/signin
userRouter.post(
  "/signin",
  expressAsyncHandler(async (req, res) => {
    const foundUser = await User.findOne({ email: req.body.email });
    if (foundUser) {
      if (bcrypt.compareSync(req.body.password, foundUser.password)) {
        res.send({
          _id: foundUser._id,
          name: foundUser.name,
          email: foundUser.email,
          isAdmin: foundUser.isAdmin,
          token: generateToken(foundUser),
        });
        return;
      }
    }
    res.status(401).send({ message: "Invalid email or password" });
  })
);

// POST localhost:5000/api/users/signup
userRouter.post(
  "/signup",
  expressAsyncHandler(async (req, res) => {
    // create a new user
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password),
    });

    const user = await newUser.save();
    // send the new user info to the frontend
    res.send({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user),
    });
  })
);

export default userRouter;
