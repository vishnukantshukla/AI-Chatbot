 // it is the main router file
import { Router } from "express";

import chatRoutes from "./chat-routes";
import userRoutes from "./user-routes";

const appRouter = Router();

appRouter.use("/user",userRoutes) // domain/api/v1/user

appRouter.use("/chats",chatRoutes)  // domain/api/v1/chats

export default appRouter;