import express from "express"
import ErrorHandler from "../utils/ErrorHandler.js";
import verifyUser from "../utils/verifyUser.js";
import Book from "../models/Book.js";

const router = express.Router();

router.get("/all", async (req, res, next) => {
    try {

        const { page = 1, limit = 10, sortBy = 'title', order = 'asc' } = req.query;

        console.log(page);

        const getBooks = await Book.find();
        res.status(201).json({
            success: true,
            data: getBooks
        })
    } catch (error) {
        next(error);
    }
})

router.post("/new", verifyUser, async (req, res, next) => {
    try {
        const { id, role, username, email } = req.user;
        if (role !== "admin") return next(ErrorHandler(401, "protected route!!"));

        const { title, description } = req.body;
        if (!title || !description) return next(ErrorHandler(404, "All fields are required!!"));

        const newBook = await Book.create({
            title,
            description,
            author: { id, name: username },
        })

        res.status(201).json({
            success: true,
            message: `create: ${newBook.title}`,
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

        if (!bookId) return next(ErrorHandler(404, "invalid credentials!!"));

        const book = await Book.findById(bookId);

        

        res.status(201).json({
            success: true,
            message: `create: ${name}`,
            id: newBook._id
        });

    } catch (error) {
        next(error);
    }
});

router.delete("/remove/:id", verifyUser, async (req, res, next) => {
    try {

        const { id, role } = req.user;
        const bookId = req.params.id;

        if (role != "admin") return next(ErrorHandler(401, "unauthorized!!"));

        if (!bookId.match(/^[0-9a-fA-F]{24}$/)) {
            return next(ErrorHandler(400, "Invalid book ID"));
        }

        const book = await Book.findById(bookId);

        if (!book) {
            return next(ErrorHandler(404, "Book not found"));
        }

        await Book.deleteOne(book);

        res.status(200).json({
            success: true,
            message: "resource deleted successfully!"
        })

    } catch (error) {
        next(error);
    }
})

export default router;