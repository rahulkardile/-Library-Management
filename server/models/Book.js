import mongoose from "mongoose";

const BookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    author: {
        id: {
            type: mongoose.Types.ObjectId,
            ref: "User",
            required: true
        },
        name: {
            type: String,
            required: true
        }
    },
    status: {
        type: Boolean,
        default: true
    },
    currentConsumer: {
        type: mongoose.Types.ObjectId,
        ref: "User",
    }
}, {
    timestamps: true
})

const Book = mongoose.model("Book", BookSchema);

export default Book;