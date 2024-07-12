import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"

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
        res.send("server is running fine!");
    } catch (error) {
        console.log(error);
    }
})

app.listen(PORT, () => {
    console.log(`server is running at ${PORT} . . . `);
})