"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateChatCompletion = void 0;
const User_1 = __importDefault(require("../models/User"));
const openai_config_1 = require("../config/openai-config");
const generateChatCompletion = async (req, res, next) => {
    const { message } = req.body;
    try {
        const user = await User_1.default.findById(res.locals.jwtData.id);
        if (!user)
            return res.status(401).json({
                message: "User not registered or token malfunctioned",
            });
        const chats = user.chats.map(({ role, content }) => ({
            role,
            parts: [{ text: content }],
        }));
        chats.push({
            role: "user",
            parts: [{ text: message }],
        });
        user.chats.push({ role: "user", content: message });
        const genAI = (0, openai_config_1.configureGoogleAI)();
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
        const result = await model.generateContent({ contents: chats });
        const chatResponse = await result.response;
        const botMessage = chatResponse.text();
        user.chats.push({
            role: "assistant",
            content: botMessage,
        });
        await user.save();
        return res.status(200).json({ chats: user.chats });
    }
    catch (error) {
        console.error("OpenAI Chat Completion Error:", error);
        return res.status(500).json({ message: "Something went wrong" });
    }
};
exports.generateChatCompletion = generateChatCompletion;
//# sourceMappingURL=chat-controllers.js.map