// This is for chatgpt

// import Configuration from "openai";
// export const  configureOpenAI= ()=>{
//     const config =  new Configuration({
//         apiKey : process.env.OPEN_AI_SECRET,
//         organization : process.env.OPENAI_ORGANIZATION_ID
//     })
//     return config;

// }

import { GoogleGenerativeAI } from "@google/generative-ai";

export const configureGoogleAI = () => {
  return new GoogleGenerativeAI(process.env.GOOGLE_GENAI_API_KEY || "");
};
