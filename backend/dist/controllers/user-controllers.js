"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userLogin = exports.userSignup = exports.getAllUsers = void 0;
const User_1 = __importDefault(require("../models/User"));
const bcrypt_1 = require("bcrypt"); // bcrypt is used to encrypt the user string and then compare with user password
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
        return res.status(201).json({ message: "OK", id: user._id.toString() });
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
        return res.status(200).json({ message: "OK", id: user._id.toString() });
    }
    catch (error) {
        return res.status(200).json({ message: "ERROR", cause: error.message });
    }
};
exports.userLogin = userLogin;
//# sourceMappingURL=user-controllers.js.map