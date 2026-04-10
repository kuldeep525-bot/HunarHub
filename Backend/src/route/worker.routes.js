import express from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import {
  getAllWorker,
  getWorker,
  updateBookingStatus,
  workerRegister,
} from "../controller/worker.controller.js";
import { isNotWorker } from "../middleware/isworker.middleware.js";

const route = express.Router();

route.post("/workerRegister", authMiddleware,isNotWorker, workerRegister);
route.get("/getAllWorker", getAllWorker);
route.get("/getWorker/:workerId", authMiddleware, getWorker);
route.patch("/update/:bookingId", authMiddleware, updateBookingStatus);

export default route;
