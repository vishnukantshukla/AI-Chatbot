import {Router} from "express";
import { verifyToken } from "../utils/token-manager";
import { chatCompletionValidator } from "../utils/validators";
import { generateChatCompletion, sendChatsToUser } from "../controllers/chat-controllers";

// Protected API
const chatRoutes = Router();
chatRoutes.post("/new",chatCompletionValidator,verifyToken,generateChatCompletion)

chatRoutes.get("/all-chats",verifyToken,sendChatsToUser)

export default chatRoutes;