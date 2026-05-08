import express from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import {
  cancelBooking,
  createBooking,
  getMyBooking,
  getWorkerBookings,
} from "../controller/booking.controller.js";

const route = express.Router();

route.post("/create", authMiddleware, createBooking);
route.patch("/cancel/:bookingId", authMiddleware, cancelBooking);
route.get("/myBooking", authMiddleware, getMyBooking);
route.get("/workerBookings", authMiddleware, getWorkerBookings);

export default route;
