import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import cors from "cors";

import userRouter from "./routes/User.js";
import bookRouter from "./routes/Book.js";

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(helmet());

app.use(cors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:3300' || "*",
    optionsSuccessStatus: 200
}));

dotenv.config();
const PORT = process.env.PORT || 3300;
const MONGO_URI = process.env.MONGO_URI;

try {
    mongoose.connect(MONGO_URI).then(() => console.log("Database is connected"));
} catch (error) {
    console.log("Database connection failed!!!");
}

// rate limiting middleware
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100,
    message: 'Too many requests, please try again later.'
});

app.use(limiter);

app.get("/", (req, res, next) => {
    try {
        res.send("server is running fine!");
    } catch (error) {
        console.log(error);
    }
});

// all api routes
app.use("/api/user", userRouter);
app.use("/api/book", bookRouter);

// 404
app.get("*", (req, res, next) => {
    try {
        res.send("Not Found!");
    } catch (error) {
        console.log(error);
    }
});

// error handling middleware
app.use((err, req, res, next)=>{
    const statusCode = err.statusCode || 404;

    if (err.code === '11000') return err.message = "user already exist!"
    const message = err.message || 'Internal Server Error';

    return res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    });
})

app.listen(PORT, () => {
    console.log(`server is running at ${PORT} . . . `);
});