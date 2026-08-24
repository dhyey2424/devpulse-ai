import { GoogleGenAI } from '@google/genai';

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

export async function generateReadme(codeSnippet) {
  if (!apiKey) {
    throw new Error("Missing Gemini API Key in .env.local file");
  }

  const ai = new GoogleGenAI({ apiKey });

  const response = await ai.models.generateContent({
    model: 'gemini-3.6-flash',
    contents: `Generate a polished, comprehensive README.md file in standard markdown for the following project description or code:\n\n${codeSnippet}`,
  });

  return response.text;
}