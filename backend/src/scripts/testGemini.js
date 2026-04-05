import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const test = async () => {
    try {
        const model = genAI.getGenerativeModel({ model: 'gemini-embedding-001' });
        const result = await model.embedContent("Hello world");
        console.log("Success! Embedded values length:", result.embedding.values.length);
    } catch (e) {
        console.error("Failed:", e.message);
    }
}
test();
