"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUserLogin = exports.validateUser = exports.validateInput = void 0;
const joi_1 = __importDefault(require("joi"));
//payment plans
const validateInput = (data) => {
    const schema = joi_1.default.object({
        accomodationStatus: joi_1.default.string().error(new Error("Accommodation status is required")),
        paymentPlan: joi_1.default.string().error(new Error("payment plan is required")),
        rentAmount: joi_1.default.number().required().error(new Error("Provide rent amount")),
        monthlyIncome: joi_1.default.number().required().error(new Error("provide monthly salary amount")),
    }).unknown();
    const options = {
        errors: {},
    };
    return schema.validate(data, options);
};
exports.validateInput = validateInput;
const validateUser = (data) => {
    const schema = joi_1.default.object({
        fullname: joi_1.default.string()
            .trim()
            .min(3)
            .max(64)
            .error(new Error("first name must be provided")),
        email: joi_1.default.string().trim().email().lowercase().required(),
        dob: joi_1.default.string().trim().required(),
        password: joi_1.default.string().min(8).required(),
        password_repeat: joi_1.default.ref("password"),
    }).unknown();
    const options = {
        errors: {},
    };
    return schema.validate(data, options);
};
exports.validateUser = validateUser;
//user login
const validateUserLogin = (data) => {
    const schema = joi_1.default.object({
        email: joi_1.default.string().trim().lowercase().required(),
        password: joi_1.default.string().min(8).required(),
        password_repeat: joi_1.default.ref("password"),
    }).unknown();
    const options = {
        errors: {
            wrap: {
                label: "",
            },
        },
    };
    return schema.validate(data, options);
};
exports.validateUserLogin = validateUserLogin;
