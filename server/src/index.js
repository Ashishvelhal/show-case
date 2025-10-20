import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import { connectDB } from "./lib/db.js";

import authRoutes from "./routes/auth.route.js"
import messageRoutes from "./routes/message.route.js"
import inquiryRoutes from "./routes/inquiry.route.js"
import productRoutes from "./routes/product.route.js"

dotenv.config()
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(cookieParser());
app.use(express.json({ limit: '1000mb' })); 
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
})
);

app.use("/api/auth", authRoutes);
app.use("/api/messages",messageRoutes);
app.use("/api/inquiries", inquiryRoutes);
app.use("/api/products", productRoutes);


app.listen(PORT, () =>{ 
    console.log("server is running on port:"+ PORT)
    connectDB();
});