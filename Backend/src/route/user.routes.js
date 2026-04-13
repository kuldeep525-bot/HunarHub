import express from "express";
import {
  deleteAccount,
  forgotPassword,
  login,
  logout,
  profile,
  profileUpdated,
  register,
  resetPassword,
  verifyOtp,
} from "../controller/user.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const route = express.Router();

route.post("/register", register);
route.post("/login", login);
route.post("/logout", logout);
route.get("/profile", authMiddleware, profile);
route.put("/profileUpdate", authMiddleware, profileUpdated);
route.delete("/delete", authMiddleware, deleteAccount);
route.post("/forgot", forgotPassword);
route.post("/verify", verifyOtp);
route.post("/resetPassword", resetPassword);
export default route;
