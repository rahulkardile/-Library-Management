import express from "express"
import ErrorHandler from "../utils/ErrorHandler.js";
import verifyUser from "../utils/verifyUser.js";
import Book from "../models/Book.js";

const router = express.Router();

router.post("/new", verifyUser, async (req, res, next) => {
    try {
        const { id, role, username, email } = req.user;
        if (role !== "admin") return next(ErrorHandler(401, "protected route!!"));

        const { name, description } = req.body;
        if (!name || !description) return next(ErrorHandler(404, "All fields are required!!"));

        const newBook = await Book.create({
            name,
            description,
            author: { id, name: username },
        })

        res.status(201).json({
            success: true,
            message: `create: ${name}`,
            id: newBook._id
        });

    } catch (error) {
        next(error);
    }
});

router.post("/issue", verifyUser, async (req, res, next) => {
    try {
        const { id, username, email } = req.user;
        const bookId = req.query;

        if (!bookId) return next(ErrorHandler(404, "book not found!!"));

        const newBook = await Book.findByIdAndUpdate(bookId, {
            $set: {
                status: false
            }
        })

        res.status(201).json({
            success: true,
            message: `create: ${name}`,
            id: newBook._id
        });

    } catch (error) {
        next(error);
    }
});

router.delete("/remove/:id", verifyUser, async (req, res, next)=>{
    try {
        
        const { id, role } = req.user;
        const bookId = req.params.id;

        if(role != "admin") return next(ErrorHandler(401, "unauthorized!!"));
        
        const book = await Book.findByIdAndDelete(bookId);

        res.status(204).json({
            success: true,
            message: "resource deleted successfully!"
        })

    } catch (error) {
        next(error);
    }
})

export default router;