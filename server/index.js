import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import ErrorHandler from "./utils/ErrorHandler.js";

const app = express();
app.use(express.json());

dotenv.config();
const PORT = process.env.PORT || 3300;
const MONGO_URI = process.env.MONGO_URI;

try {
    mongoose.connect(MONGO_URI).then(() => console.log("Database is connected"));
} catch (error) {
    console.log("Database connection failed!!!");
}

app.get("/", (req, res, next) => {
    try {
        
        next(ErrorHandler(403, "error"));
        res.send("server is running fine!");

    } catch (error) {
        console.log(error);
    }
});

app.get("*", (req, res, next) => {
    try {

        res.send("Not Found!");
    } catch (error) {
        console.log(error);
    }
});

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