import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { createJwt } from "../utils/createJwt.js";

export const register = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.json({ msg: "Please fill in all required fields!" });
    }

    if (password.length < 6) {
      return res.json({
        msg: "The password must contain at least 6 character",
      });
    }

    const user = await new User({ email, password });

    const savedUser = await user.save();

    const token = createJwt(savedUser._id);

    res.cookie("token", token).json({ user: savedUser });
  } catch (error) {
    console.log(error);
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.json({ msg: "Please fill in all required fields!" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.json({ msg: "Invalid credentials" });
    }

    const isMatch = bcrypt.compareSync(password, user.password);

    if (!isMatch) {
      return res.json({ msg: "Invalid credentials" });
    }

    const token = createJwt(user._id);

    res.cookie("token", token).json({ user });
  } catch (error) {
    console.log(error);
  }
};

export const getMe = async (req, res) => {
  try {
    const token = req.cookies.token;

    if (!token) return res.status(401).json({ msg: "you are not authorized" });

    const payload = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(payload.id);

    res.status(200).json({ user });
  } catch (error) {
    console.log(error);
    console.log("hey");
  }
};

export const logout = async (req, res) => {
  res.cookie("token", "").send();
};
