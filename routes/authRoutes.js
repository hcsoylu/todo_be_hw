import express from "express";
import {
  login,
  register,
  getMe,
  logout,
} from "../controllers/authControllers.js";

const router = express.Router();

router.get("/me", getMe);
router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);

export default router;
