import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import router from "./route.js";
import authRouter from "./routes/authRoutes.js"
import dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/api", router);
app.use("/api/auth", authRouter);

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
  }
};

app.listen(PORT, async () => {
  await connectDb();
  console.log(`Server is running at http://localhost:${PORT}`);
});
