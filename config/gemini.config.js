import { GoogleGenerativeAI } from "@google/generative-ai";
import { GOOGLE_API_KEY } from "./index.js";

const genAI = new GoogleGenerativeAI(GOOGLE_API_KEY);

export default genAI;