import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
dotenv.config();
import connectDb from "./src/config/db.js";
import userRoute from "./src/route/user.routes.js";
import workerRoute from "./src/route/worker.routes.js";
import BookingRoute from "./src/route/booking.routes.js";
import reviewRoute from "./src/route/review.routes.js";
import chatRoute from "./src/route/chat.route.js";

const app = express();

const port = process.env.PORT || 7000;

//global middleware
app.use(express.json());
app.use(cookieParser());

//routes connected
app.use("/api/user", userRoute);
app.use("/api/worker", workerRoute);
app.use("/api/booking", BookingRoute);
app.use("/api/review", reviewRoute);
app.use("/api/chat", chatRoute);

app.get("/", (req, res) => {
  res.send("hunarhub");
});

const startServer = async () => {
  await connectDb();
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
};

startServer();
