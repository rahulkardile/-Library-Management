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

        res.status(200).json(`Welcome ${newUser.username}`)

    } catch (error) {
        next(error);
    }
})

router.post("/get", async (req, res, next) => {
    try {

        const { email, password } = req.body;

        if (!email) return next(ErrorHandler(404, "Please enter email!"));
        if (!password) return next(ErrorHandler(404, "Please enter password!!"));

        const getUser = await User.findOne({ email }).select(["role", "password", "username", "email", "_id"]);
        if (!getUser) return next(ErrorHandler(404, "User Not Found"));

        const comparePass = bcrypt.compareSync(password, getUser.password);
        if (!comparePass) return next(ErrorHandler(401, "Wrong Password"));

        const { password: pass, ...rest } = await getUser._doc;

        res.status(200).json({
            success: true,
            user: rest
        })

    } catch (error) {
        next(error);
    }
})

export default router;