import express from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import {
  deleteWorkerProfile,
  getAllWorker,
  getWorker,
  toggleAvalilabilty,
  updateBookingStatus,
  updateWorkerProfile,
  workerRegister,
} from "../controller/worker.controller.js";
import { isNotWorker } from "../middleware/isworker.middleware.js";

const route = express.Router();

route.post("/workerRegister", authMiddleware, isNotWorker, workerRegister);
route.get("/getAllWorker", getAllWorker);
route.get("/getWorker/:workerId", authMiddleware, getWorker);
route.patch("/update/:bookingId", authMiddleware, updateBookingStatus);
route.put("/updateWorker", authMiddleware, updateWorkerProfile);
route.delete("/deleteWorker", authMiddleware, deleteWorkerProfile);
route.patch("/toggle", authMiddleware, toggleAvalilabilty);

export default route;
