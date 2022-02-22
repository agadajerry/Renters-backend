"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connect = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
require("dotenv").config();
const uri = "mongodb+srv://" +
    process.env.USERNAME +
    ":" +
    process.env.PASSWORD +
    "@cluster-renter.wtjjt.mongodb.net/renterApp?retryWrites=true&w=majority";
const connect = async () => {
    try {
        await mongoose_1.default.connect(uri);
        console.log("database is connected successfully...");
    }
    catch (err) {
        console.log("connection error occurred. ensure you are connected to db...");
    }
};
exports.connect = connect;
