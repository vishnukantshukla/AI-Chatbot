import {Request,Response,NextFunction} from "express"
import User from "../models/User";
import { configureOpenAI } from "../config/openai-config";
import OpenAIApi from "openai";

export const generateChatCompletion= async(req:Request,res:Response,next:NextFunction)=>{
    const { message } = req.body;
    const user = await User.findById(res.locals.jwtData.id);
    if(!user)return res.status(401).json({message:"User not registered Or Token malfunctioned"})
    
        
    // grab chats of the user
    const chats = user.chats.map(({role,content})=>({role,content}));
    chats.push({content:message, role:"user"});
    user.chats.push({content:message,role:"user"});

    // sent all chats with new one to openapi API
    const config = configureOpenAI();
    const openai = new OpenAIApi(config);
    
    // get latest response

    
}