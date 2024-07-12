import mongoose from "mongoose";

const BookSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
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
    }
}, {
    timestamps: true
})

const Book = mongoose.model("Book", BookSchema);

export default Book;