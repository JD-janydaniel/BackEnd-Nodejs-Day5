import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./Database/config.js";
import userRouter from "./Routers/userRouter.js";

dotenv.config();
const app = express();

//middleware
app.use(express.json());
app.use(
  cors({
    origin: "*",
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true,
  })
);

//Db connection
connectDB();

// Default route
app.get("/", (req, res) => {
  res.status(200).send("Hi welcome to Culineties API");
});

//Api Routes
app.use("/api/user", userRouter);

//listen
app.listen(process.env.PORT, () => {
  console.log("App is started and running on Port");
});
