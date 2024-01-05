import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export function authenticate(req, res, next) {
    // const authHeader = req.headers.authorization;
    const authHeader = req.cookies.token;
    console.log(authHeader);
    if (authHeader) {
        const token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) {
                return res.status(403).json("Token is not valid");
            }
            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401);
    }
}