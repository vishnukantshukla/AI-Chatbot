"use strict";
// import { Request, Response, NextFunction } from "express";
// import User from "../models/User";
// import { configureOpenAI } from "../config/openai-config";
// import OpenAIApi from "openai";
// import OpenAI from "openai";
// import { CreateChatCompletionRequestMessage } from "openai/resources/chat/completions";
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
            content,
        }));
        chats.push({ role: "user", content: message });
        user.chats.push({ role: "user", content: message });
        const openai = (0, openai_config_1.configureOpenAI)();
        const chatResponse = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: chats,
        });
        const botMessage = chatResponse.choices[0].message;
        user.chats.push(botMessage);
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