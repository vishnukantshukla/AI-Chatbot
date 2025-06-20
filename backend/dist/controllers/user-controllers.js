"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userLogout = exports.verifyUser = exports.userLogin = exports.userSignup = exports.getAllUsers = void 0;
const User_1 = __importDefault(require("../models/User"));
const bcrypt_1 = require("bcrypt"); // bcrypt is used to encrypt the user string and then compare with user password
const token_manager_1 = require("../utils/token-manager");
const constants_1 = require("../utils/constants");
// Route -1
const getAllUsers = async (req, res, next) => {
    // get All users from Db
    try {
        // get all users
        const users = await User_1.default.find(); // It will give all users data
        return res.status(200).json({ message: "OK", users });
    }
    catch (error) {
        return res.status(200).json({ message: "ERROR", cause: error.message });
    }
};
exports.getAllUsers = getAllUsers;
// bcrypt is used to encrpting the user string
const userSignup = async (req, res, next) => {
    try {
        // user signup
        const { name, email, password } = req.body;
        const exixtingUser = await User_1.default.findOne({ email });
        if (exixtingUser)
            return res.status(401).send("User Already Registered");
        const hashPassword = await (0, bcrypt_1.hash)(password, 10);
        const user = new User_1.default({ name, email, password: hashPassword });
        await user.save();
        // create token and store the cookie
        res.clearCookie(constants_1.COOKIE_NAME, {
            httpOnly: true,
            domain: "localhost",
            signed: true,
            path: "/",
        }); //  it will clear the cookie of the response of the user
        const token = (0, token_manager_1.createToken)(user._id.toString(), user.email, "7d");
        const expires = new Date();
        expires.setDate(expires.getDate() + 7); // current date +7
        res.cookie(constants_1.COOKIE_NAME, token, {
            path: "/",
            domain: "localhost",
            expires,
            httpOnly: true,
            signed: true, // signed the payload
        });
        return res
            .status(201)
            .json({ message: "OK", name: user.name, email: user.email });
    }
    catch (error) {
        return res.status(200).json({ message: "ERROR", cause: error.message });
    }
};
exports.userSignup = userSignup;
// User Login
const userLogin = async (req, res, next) => {
    try {
        // user login
        const { email, password } = req.body;
        const user = await User_1.default.findOne({ email });
        if (!user) {
            return res.status(401).send("User not registered");
        }
        const isPasswordCorrect = await (0, bcrypt_1.compare)(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(403).send("Incorrect Password");
        }
        res.clearCookie(constants_1.COOKIE_NAME, {
            httpOnly: true,
            domain: "localhost",
            signed: true,
            path: "/",
        }); //  it will clear the cookie of the response of the user
        const token = (0, token_manager_1.createToken)(user._id.toString(), user.email, "7d");
        const expires = new Date();
        expires.setDate(expires.getDate() + 7); // current date +7
        res.cookie(constants_1.COOKIE_NAME, token, {
            path: "/",
            domain: "localhost",
            expires,
            httpOnly: true,
            signed: true, // signed the payload
        }); //COOKIE_NAME = auth name,token and inside the root directory we will store the cookie
        // now we will use cookie-parser to transfer the cookie from backend to the frontend
        return res
            .status(200)
            .json({ message: "OK", name: user.name, email: user.email });
    }
    catch (error) {
        return res.status(200).json({ message: "ERROR", cause: error.message });
    }
};
exports.userLogin = userLogin;
const verifyUser = async (req, res, next) => {
    try {
        const user = await User_1.default.findById(res.locals.jwtData.id);
        if (!user) {
            return res.status(401).send("User not registered Or Token malfunctioned");
        }
        console.log(user._id.toString(), res.locals.jwtData.id);
        if (user._id.toString() !== res.locals.jwtData.id) {
            return res.status(401).send("Permissions didn't match");
        }
        return res
            .status(200)
            .json({ message: "OK", name: user.name, email: user.email });
    }
    catch (error) {
        console.log(error);
        return res.status(200).json({ message: "ERROR", cause: error.message });
    }
};
exports.verifyUser = verifyUser;
const userLogout = async (req, res, next) => {
    try {
        const user = await User_1.default.findById(res.locals.jwtData.id);
        if (!user) {
            return res.status(401).send("User not registered Or Token malfunctioned");
        }
        console.log(user._id.toString(), res.locals.jwtData.id);
        if (user._id.toString() !== res.locals.jwtData.id) {
            return res.status(401).send("Permissions didn't match");
        }
        res.clearCookie(constants_1.COOKIE_NAME, {
            httpOnly: true,
            domain: "localhost",
            signed: true,
            path: "/",
        });
        return res
            .status(200)
            .json({ message: "OK", name: user.name, email: user.email });
    }
    catch (error) {
        console.log(error);
        return res.status(200).json({ message: "ERROR", cause: error.message });
    }
};
exports.userLogout = userLogout;
//# sourceMappingURL=user-controllers.js.map