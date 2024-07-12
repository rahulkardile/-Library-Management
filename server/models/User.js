import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
        min: 4,
        max: 20
    },
    email: {
        type: String,
        required: true,
        unique: true,
        min: 6,
        max: 30
    },
    password: {
        type: String,
        required: true,
        min: 6
    },
    contact: {
        type: Number,
        required: true
    },
    role: {
        type: String,
        enum: ["admin", "user"],
        default: "user"
    },
}, {
    timestamps: true
});

const User = mongoose.model("User", UserSchema);

export default User;
