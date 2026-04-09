import express from "express";
import {
  login,
  logout,
  profile,
  profileUpdated,
  register,
} from "../controller/user.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const route = express.Router();

route.post("/register", register);
route.post("/login", login);
route.post("/logout", logout);
route.get("/profile", authMiddleware, profile);
route.put("/profileUpdate", authMiddleware, profileUpdated);

export default route;
