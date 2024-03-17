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

export default userRouter;
