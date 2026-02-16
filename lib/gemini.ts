import { GoogleGenAI, Modality, Part } from "@google/genai";

const API_KEY =
  process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY;

if (!API_KEY) {
  throw new Error("Missing GEMINI_API_KEY for Gemini integration");
}

const MODEL_ID =
  process.env.GEMINI_MODEL_ID || "gemini-2.5-flash-image";

const ai = new GoogleGenAI({ apiKey: API_KEY });

// const YARN_PROMPT = `Convierte la imagen en una figura 3d hecha a mano de estambre estilo amigurumi. La figura resultante deberá ser creada con estambre respetando todos los rasgos, características, caracteristicas faciales, colores, accesorios tamaño y postura original. La imagen final deberá ser en una relación 1:1, realista y el 100% de ella deberá estar elaborada en estambre.`;
// const YARN_PROMPT = `Convert the provided image into a 3d handmade amigurumi. The final character must look like a plush toy crafted entirely with thick yarn and crochet techniques, dont use lines, vectors or shapes, just a toy made of yarn in an amigurimi style. Preserve all facial features, colors, proportions, accessories, and the original pose. The entire figure must be fully made of yarn, with visible crochet stitches and soft stuffing volume. Render the result in a 1:1 aspect ratio, highly realistic, as if the amigurumi were photographed in real life.`;
 const YARN_PROMPT = `Realiza una reinterpretación de la imagen proporcionada en una figura 3d de estambre hecha a mano tipo crochet, deberás respetar los rasgos, caracteristica física, colores, accesorios, tamaño y postura de la imagen original. La imagen final deberá ser realista, como si se tratara de una fotografía, elaborada en estambre grueso tejido en crochet y sin ningun tipo de contorno o linea que la defina para garantizar que se vea como una figura 3d heca de estambre, la escala de la imagen siempre sera 1:1`;

export async function generateYarnImageFromPart(
  imagePart: Part 
): Promise<{ data: string; mimeType: string }> {
  const response = await ai.models.generateContent({
    model: MODEL_ID,
    contents: {
      parts: [
        imagePart,
        {
          text: YARN_PROMPT,
        },
      ],
    },
    config: {
      responseModalities: [Modality.IMAGE],
    },
  });

  const parts = response.candidates?.[0]?.content?.parts ?? [];
  for (const part of parts) {
    if (part.inlineData?.data) {
      return {
        data: part.inlineData.data,
        mimeType: part.inlineData.mimeType || "image/png",
      };
    }
  }
  throw new Error("Gemini did not return an image payload");
}

export async function generateYarnImageFromBuffer(
  buffer: Buffer,
  mimeType: string
) {
  return generateYarnImageFromPart({
    inlineData: {
      data: buffer.toString("base64"),
      mimeType,
    },
  });
}
