import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
dotenv.config();
import connectDb from "./src/config/db.js";
import userRoute from "./src/route/user.routes.js";

const app = express();

const port = process.env.PORT || 7000;

//global middleware
app.use(express.json());
app.use(cookieParser());

//routes connected

app.use("/api/user", userRoute);

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
