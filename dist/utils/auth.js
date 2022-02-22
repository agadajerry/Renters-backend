"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authoriseUser = void 0;
const userModel_1 = __importDefault(require("../Models/userModel"));
const jwt = require("jsonwebtoken");
function authoriseUser(req, res, next) {
    try {
        const token = req.cookies.jwt_token;
        if (token) {
            jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
                if (err)
                    return res.status(404).json({ msg: "You are not authorised to view this page..." });
                const user2 = await userModel_1.default.findOne({ email: decodedToken.email });
                //   console.log(decodedToken.email)
                req.user = decodedToken;
                next();
            });
        }
        else {
            //307 -redirect status code
            res.status(404).json({ msg: "No token found . You are redirect to login page" });
        }
    }
    catch (err) {
        res.sendStatus(401);
    }
}
exports.authoriseUser = authoriseUser;
