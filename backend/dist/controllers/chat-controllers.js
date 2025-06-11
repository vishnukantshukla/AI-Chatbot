"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateChatCompletion = void 0;
const User_1 = __importDefault(require("../models/User"));
const openai_config_1 = require("../config/openai-config");
const openai_1 = __importDefault(require("openai"));
const generateChatCompletion = async (req, res, next) => {
    const { message } = req.body;
    const user = await User_1.default.findById(res.locals.jwtData.id);
    if (!user)
        return res.status(401).json({ message: "User not registered Or Token malfunctioned" });
    // grab chats of the user
    const chats = user.chats.map(({ role, content }) => ({ role, content }));
    chats.push({ content: message, role: "user" });
    user.chats.push({ content: message, role: "user" });
    // sent all chats with new one to openapi API
    const config = (0, openai_config_1.configureOpenAI)();
    const openai = new openai_1.default(config);
    // get latest response
};
exports.generateChatCompletion = generateChatCompletion;
//# sourceMappingURL=chat-controllers.js.map