// import { Request, Response, NextFunction } from "express";
// import User from "../models/User";
// import { configureOpenAI } from "../config/openai-config";
// import OpenAIApi from "openai";
// import OpenAI from "openai";
// import { CreateChatCompletionRequestMessage } from "openai/resources/chat/completions";

// export const generateChatCompletion = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   const { message } = req.body;
//   try {
//     const user = await User.findById(res.locals.jwtData.id);
//     if (!user)
//       return res
//         .status(401)
//         .json({ message: "User not registered Or Token malfunctioned" });

//     // grab chats of the user
//     const chats = user.chats.map(({ role, content }) => ({
//       role,
//       content,
//     })) as CreateChatCompletionRequestMessage[];
//     chats.push({ content: message, role: "user" });
//     user.chats.push({ content: message, role: "user" });

//     // sent all chats with new one to openapi API
//     const config = configureOpenAI();
//     const openai = new OpenAIApi(config);
//     // get latest response
//     const chatResponse = await openai.createChatCompletion({
//       model: "gpt-3.5-turbo", // or your desired model
//       messages: chats,
//     });
//     user.chats.push(chatResponse.data.choices[0].message);
//     await user.save();
//     return res.status(200).json({ chats: user.chats });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({ message: "Something Went Wrong" });
//   }
// };

import { Request, Response, NextFunction } from "express";
import User from "../models/User";
import { configureOpenAI } from "../config/openai-config";
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
      content,
    })) as CreateChatCompletionRequestMessage[];

    chats.push({ role: "user", content: message });
    user.chats.push({ role: "user", content: message });

    const openai = configureOpenAI();
    const chatResponse = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: chats,
    });

    const botMessage = chatResponse.choices[0].message;
    user.chats.push(botMessage);
    await user.save();

    return res.status(200).json({ chats: user.chats });
  } catch (error) {
    console.error("OpenAI Chat Completion Error:", error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};
