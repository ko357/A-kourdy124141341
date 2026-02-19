
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getDailyInspiration = async () => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: "أعطني ذكر أو آية قرآنية قصيرة مع مرجعها لتكون إلهاماً يومياً لمستخدم تطبيق سبحة إلكترونية. الرد يجب أن يكون بتنسيق JSON.",
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            verse: { type: Type.STRING, description: "نص الآية أو الذكر" },
            reference: { type: Type.STRING, description: "اسم السورة أو مصدر الذكر" }
          },
          required: ["verse", "reference"]
        }
      }
    });

    return JSON.parse(response.text);
  } catch (error) {
    console.error("Error fetching inspiration:", error);
    return {
      verse: "فَاذْكُرُونِي أَذْكُرْكُمْ وَاشْكُرُوا لِي وَلَا تَكْفُرُونِ",
      reference: "سورة البقرة - الآية 152"
    };
  }
};
