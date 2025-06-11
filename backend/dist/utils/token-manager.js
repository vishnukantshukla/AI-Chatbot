"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.createToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const constants_1 = require("./constants");
const createToken = (id, email, expiresIn) => {
    const payload = { id, email };
    const token = jsonwebtoken_1.default.sign(payload, process.env.JWT_SECRET, {
        // expiresIn:"7d", // Token will expire in 7 days
        expiresIn,
    }); // sign will genearte the token
    return token;
};
exports.createToken = createToken;
const verifyToken = async (req, res, next) => {
    console.log("Vishn1+2");
    const token = req.signedCookies[`${constants_1.COOKIE_NAME}`];
    console.log(token);
};
exports.verifyToken = verifyToken;
//# sourceMappingURL=token-manager.js.map