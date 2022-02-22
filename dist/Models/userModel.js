"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
exports.registerSchema = new mongoose_1.default.Schema({
    fullname: {
        type: String,
        required: [true, "full Name field is required"]
    },
    dob: {
        type: Date,
        required: [true, "Date of birth is required"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true
    },
    password: {
        type: String,
        minlength: [8, "password most at least 8 character long"]
    },
}, { timestamps: true });
const userRegistration = mongoose_1.default.model("Registereduser", exports.registerSchema);
exports.default = userRegistration;
