"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.editLoanRequest = exports.userRenter = exports.userLogin = exports.registerUser = void 0;
const renterPaymentModel_1 = __importDefault(require("../Models/renterPaymentModel"));
const userModel_1 = __importDefault(require("../Models/userModel"));
const inputValidation_1 = require("../utils/inputValidation");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// user registration
/*****************************************************************************************
 *  User registration and login with it validation
 * ************************************************************************************ */
const registerUser = async (req, res, next) => {
    try {
        const { fullname, dob, email, password, password_repeat } = req.body;
        //validate user input
        const { error } = (0, inputValidation_1.validateUser)(req.body);
        if (error) {
            return res.status(404).json(error.message);
        }
        //check if user already existed in the collection
        userModel_1.default.findOne({ email: email }, async (err, user) => {
            if (err) {
                return res.json({ msg: "Error occured at finding user in db..." });
            }
            if (user) {
                return res
                    .status(404)
                    .json({ msg: "user already register in our platform..." });
            }
            else {
                user = new userModel_1.default({
                    fullname,
                    dob,
                    email,
                    password: await bcrypt_1.default.hash(password, 10),
                });
                await user.save(); //new user register
                return res
                    .status(201)
                    .json({ msg: "New User registered successfully...." });
            }
        });
    }
    catch (error) {
        console.error("error occurred in user registration...");
    }
};
exports.registerUser = registerUser;
/**************************************************************************************
 *  User  login with it validation
 * ************************************************************************************ */
const userLogin = (req, res, next) => {
    const { error } = (0, inputValidation_1.validateUserLogin)(req.body);
    try {
        if (error) {
            return res.status(404).json({
                msg: "validation error in login. Check your entry...",
            });
        }
        //find user now
        userModel_1.default.findOne({ email: req.body.email }, async (err, user) => {
            if (err)
                return res
                    .status(404)
                    .json({ msg: "Error occurred in finding user" });
            if (!user) {
                return res.status(404).json({ msg: "No Such user exist..." });
            }
            //   res.status(200).json({ msg: "User exist in database..." });
            //Decrypt incomeing password from the body
            const decrptPassword = await bcrypt_1.default.compare(req.body.password, user.password);
            if (!decrptPassword) {
                return res.status(200).json({ msg: "Password / email invalid..." });
            }
            else {
                const token = jsonwebtoken_1.default.sign({ email: req.body.email }, process.env.JWT_SECRET, {
                    expiresIn: 60 * 60 * 60,
                });
                res.cookie("jwt_token", token, { httpOnly: true });
                return res
                    .status(200)
                    .json({ msg: "User Login successful...", details: user });
            }
        });
    }
    catch (e) {
        console.error(e);
    }
};
exports.userLogin = userLogin;
// A user can create new request form
const userRenter = async (req, res) => {
    try {
        const { error } = (0, inputValidation_1.validateInput)(req.body);
        if (error)
            return res.status(404).json({ msg: error.message });
        const monthlyPament = 0.02 * Number(req.body.rentAmount) +
            Number(req.body.rentAmount);
        //   userEmail: req.user.email,
        const data = {
            accomodationStatus: req.body.accomodationStatus,
            rentAmount: req.body.rentAmount,
            monthlyIncome: req.body.monthlyIncome,
            paymentPlan: req.body.paymentPlan,
        };
        const rent = new renterPaymentModel_1.default(data);
        await rent.save();
        res.status(201).json({ msg: "renter details saved..." });
    }
    catch (error) {
        console.error(error);
    }
};
exports.userRenter = userRenter;
// A user can edit his created request
const editLoanRequest = async (req, res, next) => {
    try {
        const user = await renterPaymentModel_1.default.findOne({ userEmail: req.user.email });
        const updateData = {
            accomodationStatus: req.body.accomodationStatus || (user === null || user === void 0 ? void 0 : user.accomodationStatus),
            rentAmount: req.body.rentAmount || user.rentAmount,
            monthlyIncome: req.body.monthlyIncome || (user === null || user === void 0 ? void 0 : user.monthlyIncome),
            paymentPlan: req.body.paymentPlan || user.paymentPlan,
        };
        const result = await renterPaymentModel_1.default.updateOne({ userEmail: req.user.email }, updateData, { new: true });
        if (result) {
            return res.status(200).json({ success: result });
        }
    }
    catch (error) {
        console.error(error);
    }
};
exports.editLoanRequest = editLoanRequest;
