import express from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import {
  createReview,
  getWorkerReview,
} from "../controller/review.controller.js";

const route = express.Router();

route.post("/create", authMiddleware, createReview);
route.get("/worker/:workerId", authMiddleware, getWorkerReview);

export default route;
