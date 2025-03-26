"use server";
import { GoogleGenAI } from "@google/genai";
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function generateText({ input, previousMessages }) {
  // Prepare context for the AI (mock data for now)
  const context = `
  You are Cura's AI assistant helping a patient in an Hospital Management System.
  The patient has the following appointments:
  - March 12, 2025, at 10:00 AM with Dr. Sarah Johnson.
  Answer the patient's query based on this information or general knowledge about using Cura.
`;
  // Define rules
  const rules = `
 - Don't use markdown format, Just send a regular text and keep it as short as possible in one paragraph unless stated otherwise.
 - Avoid using technical terms, use simple language that a patient can understand.
 - If a patient ask for something like prescription, medical records, or billing, you can just use fake data since this is just for testing purposes anyway
 - To ensure continuity, the previous messages are as follows: ${previousMessages}
`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: `${context}\nPatient's query: ${input}\nAnswer in a concise, friendly manner and make sure to use this ${rules}`,
    });
    return response.text;
  } catch (error) {
    console.log(error);
    return "An error occurred while processing your request. Please try again later.";
  }
}

export default generateText;
