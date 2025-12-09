import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY;

export const getBeautyAdvice = async (query: string): Promise<string> => {
  if (!apiKey) {
    console.warn("API Key is missing. Mocking response.");
    return "I'm sorry, I cannot connect to the AI brain right now. Please ensure the API Key is configured. However, for a round face, we generally recommend long layers or a textured lob!";
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    
    // Using gemini-2.5-flash for speed and efficiency in a chat context
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: query,
      config: {
        systemInstruction: `You are "Aura", a high-end, sophisticated beauty and style consultant for Aneela's Makeover salon. 
        Your tone is elegant, professional, warm, and concise.
        You provide advice on hairstyles, skincare routines, and treatments based on user queries.
        If a user asks about services, recommend one of our mock services: Signature Gold Haircut, Balayage, 24K Gold Facial, Diamond Microdermabrasion, or Royal Manicure.
        Keep responses under 100 words. Use emojis sparingly but elegantly (✨, 💆‍♀️).`,
      },
    });

    return response.text || "I'm having trouble finding the perfect advice for you right now. Please try again.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "An error occurred while consulting our beauty AI. Please try again later.";
  }
};