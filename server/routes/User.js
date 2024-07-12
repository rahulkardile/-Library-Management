import express from "express"
import bcrypt from "bcryptjs"
import ErrorHandler from "../utils/ErrorHandler.js";
import User from "../models/User.js";

const router = express.Router();

router.post("/new", async (req, res, next) => {
    try {
        const { name, email, username, password, contact } = await req.body;

        if (!name, !email, !password, !username, !contact) return next(ErrorHandler(404, "Some Fields are missing!!!"));

        const hash = bcrypt.hashSync(password, 10);

        const newUser = await User.create({
            name,
            username,
            email,
            contact,
            password: hash,
        });

        res.status(200).json(`Welcome ${newUser.name}`)

    } catch (error) {
        next(error);
    }
})

router.post("/get", async (req, res, next) => {
    try {

        const { email, password } = req.body;
        const getUser = await User.find({ email });

        res.status(200).json({
            success: true,
            user: getUser
        })

    } catch (error) {
        next(error);
    }
})

export default router;