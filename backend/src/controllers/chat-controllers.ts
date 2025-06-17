import { Request, Response, NextFunction } from "express";
import User from "../models/User";
import { configureGoogleAI } from "../config/openai-config";
import { CreateChatCompletionRequestMessage } from "openai/resources/chat/completions";

export const generateChatCompletion = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { message } = req.body;

  try {
    const user = await User.findById(res.locals.jwtData.id);
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

    const genAI = configureGoogleAI();
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
  } catch (error) {
    console.error("OpenAI Chat Completion Error:", error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const sendChatsToUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await User.findById(res.locals.jwtData.id);
    if (!user) {
      return res.status(401).send("User not registered Or Token malfunctioned");
    }
    console.log(user._id.toString(), res.locals.jwtData.id);
    if (user._id.toString() !== res.locals.jwtData.id) {
      return res.status(401).send("Permissions didn't match");
    }
    return res.status(200).json({ message: "OK", chats: user.chats });
  } catch (error) {
    console.log(error);
    return res.status(200).json({ message: "ERROR", cause: error.message });
  }
};
