"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const renterPaymentModel = new mongoose_1.default.Schema({
    userEmail: {
        type: String
    },
    accomodationStatus: {
        type: String,
    },
    rentAmount: {
        type: Number,
        required: true,
    },
    monthlyIncome: {
        type: Number,
    },
    paymentPlan: {
        type: String,
    },
}, { timestamps: true });
const Renters = mongoose_1.default.model("renterDetails", renterPaymentModel);
exports.default = Renters;
