import jwt from "jsonwebtoken";
import ErrorHandler from "./ErrorHandler.js";

const verifyUser = (req, res, next) => {

    const token = req.cookies.library_user;
    if (!token) return next(ErrorHandler(401, "user is not authenticated!!!"));

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            next(err)
            console.log(err);
        } else {
            req.user = user;
            next();
        }
    })
}

export default verifyUser;