"use strict";
// This is for chatgpt
Object.defineProperty(exports, "__esModule", { value: true });
exports.configureGoogleAI = void 0;
// import Configuration from "openai";
// export const  configureOpenAI= ()=>{
//     const config =  new Configuration({
//         apiKey : process.env.OPEN_AI_SECRET,
//         organization : process.env.OPENAI_ORGANIZATION_ID
//     })
//     return config;
// }
const generative_ai_1 = require("@google/generative-ai");
const configureGoogleAI = () => {
    return new generative_ai_1.GoogleGenerativeAI(process.env.GOOGLE_GENAI_API_KEY || "");
};
exports.configureGoogleAI = configureGoogleAI;
//# sourceMappingURL=openai-config.js.map