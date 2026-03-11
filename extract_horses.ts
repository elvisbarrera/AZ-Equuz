import { GoogleGenAI, Type } from "@google/genai";

async function getHorseDetails() {
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });
  const urls = [
    "https://www.lgancce.com/lgpreancce/asp-publico/arbolGenealogicoPRE/ConsultarArbolGenealogicoPRE.aspx?ID=2bvfgWbPlPA=",
    "https://www.lgancce.com/lgpreancce/asp-publico/arbolGenealogicoPRE/ConsultarArbolGenealogicoPRE.aspx?CEJ=VY3rRW2aO1IJOknx3ZsjWQ==",
    "https://www.lgancce.com/lgpreancce/asp-publico/arbolGenealogicoPRE/ConsultarArbolGenealogicoPRE.aspx?CEJ=VY3rRW2aO1ILhXU+qrlXRg=="
  ];

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Extract the details for the horses from these URLs: ${urls.join(", ")}. 
    I need: Name, Breed (P.R.E. / Spanish), Gender, Birth Date (or Age), and a 3-generation pedigree (Sire, Dam, GrandSires, GrandDams).
    Also, if there are any specific characteristics mentioned, include them.`,
    config: {
      tools: [{ urlContext: {} }],
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            name: { type: Type.STRING },
            breed: { type: Type.STRING },
            gender: { type: Type.STRING },
            birthDate: { type: Type.STRING },
            description: { type: Type.STRING },
            pedigree: {
              type: Type.OBJECT,
              properties: {
                sire: { type: Type.STRING },
                dam: { type: Type.STRING },
                grandSire1: { type: Type.STRING },
                grandDam1: { type: Type.STRING },
                grandSire2: { type: Type.STRING },
                grandDam2: { type: Type.STRING }
              }
            }
          }
        }
      }
    }
  });

  console.log(response.text);
}

getHorseDetails();
