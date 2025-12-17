import { GoogleGenAI } from "@google/genai";
import { Listing } from "../types";

const getEnv = (key: string) => {
  if (typeof process !== 'undefined' && process.env) {
    return process.env[key];
  }
  return '';
};

const API_KEY = getEnv('API_KEY');

let ai: GoogleGenAI | null = null;

if (API_KEY) {
  ai = new GoogleGenAI({ apiKey: API_KEY });
}

export const analyzeProperty = async (listing: Listing): Promise<string> => {
  if (!ai) {
    return "Gemini API Key is missing. Please configure it in the environment.";
  }

  try {
    const prompt = `
      You are an expert real estate agent and neighborhood analyst.
      Analyze the following property based on its details:
      
      Title: ${listing.title}
      Price: ${listing.price} ${listing.currency} / night
      Type: ${listing.type}
      Bed/Bath: ${listing.bed} bed, ${listing.bath} bath
      Address: ${listing.address}
      Description: ${listing.description}

      Please provide a concise but engaging summary (approx 100 words) that covers:
      1. The "vibe" of the property and neighborhood.
      2. Who this property is best suited for (e.g., young professionals, families, tourists).
      3. A highlight of the location value.
      
      Keep the tone professional yet inviting.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text || "Analysis currently unavailable.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Unable to generate analysis at this time. Please try again later.";
  }
};

export const chatWithAI = async (message: string, currentListing: Listing | null): Promise<string> => {
  if (!ai) {
    return "Gemini API Key is missing.";
  }

  try {
    let systemInstruction = "You are a helpful real estate assistant named Vantage AI. Answer questions about properties and neighborhoods.";
    
    if (currentListing) {
      systemInstruction += ` You are currently discussing the property "${currentListing.title}" at ${currentListing.address}. Price: $${currentListing.price}.`;
    }

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: message,
      config: {
        systemInstruction: systemInstruction,
      },
    });

    return response.text || "I didn't catch that.";
  } catch (error) {
    console.error("Gemini Chat Error:", error);
    return "I'm having trouble connecting right now.";
  }
};