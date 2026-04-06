import express from "express";
import dotenv from "dotenv";
dotenv.config();
import connectDb from "./src/config/db.js";
import userRoute from "./src/route/user.routes.js";

const app = express();

const port = process.env.PORT || 7000;
await connectDb();

//global middleware
app.use(express.json());

//routes connected

app.use("/api/user", userRoute);

app.get("/", (req, res) => {
  res.send("hunarhub");
});

app.listen(port, () => {
  console.log(`server connected successfully port ${port}`);
});
