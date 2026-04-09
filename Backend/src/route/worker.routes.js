import express from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import {
  getAllWorker,
  getWorker,
  workerRegister,
} from "../controller/worker.controller.js";

const route = express.Router();

route.post("/workerRegister", authMiddleware, workerRegister);
route.get("/getAllWorker", getAllWorker);
route.get("/getWorker/:workerId", authMiddleware, getWorker);

export default route;
