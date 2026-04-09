import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generatePrompt(
  roomType: string,
  styleId: string,
  mode: string,
  customPrompt?: string
): string {
  const styleModifiers: Record<string, string> = {
    modern: "modern interior design, clean lines, minimalist furniture, neutral palette, high quality render",
    contemporary: "contemporary interior, current design trends, bold accents, open floor plan, photorealistic",
    minimalist: "minimalist interior, less is more, essential furniture only, serene and uncluttered, clean",
    scandinavian: "scandinavian interior design, light wood, hygge atmosphere, functional beauty, white walls",
    luxury: "luxury interior design, rich materials, gold accents, marble, velvet, opulent finishes",
    industrial: "industrial interior design, exposed brick, metal beams, concrete, Edison bulbs",
    midcentury: "mid-century modern interior, 1950s 1960s inspired, organic shapes, teak wood, retro",
    biophilic: "biophilic interior design, living walls, natural materials, indoor plants, nature integration",
    boho: "bohemian interior, eclectic layers, rich textures, macrame, colorful textiles",
    "boho-chic": "boho-chic interior, bohemian meets elegance, layered textures, earthy tones",
    farmhouse: "farmhouse interior design, rustic charm, shiplap walls, vintage finds, barn doors",
    french: "french interior design, parisian elegance, ornate moldings, antique furniture",
    mediterranean: "mediterranean interior, warm earth tones, terracotta tiles, arched doorways",
    "art-deco": "art deco interior design, geometric patterns, bold colors, gold accents, 1920s glamour",
    rustic: "rustic interior design, natural wood, stone accents, country warmth, exposed beams",
    coastal: "coastal interior design, ocean inspired, light blues, sandy neutrals, nautical elements",
    zen: "zen interior design, japanese minimalism, balance, tranquility, natural materials",
    neoclassic: "neoclassical interior design, classical revival, symmetry, columns, grandeur",
    japanese: "japanese interior design, wabi-sabi, tatami mats, sliding shoji doors, low furniture",
    gaming: "gaming room setup, RGB lighting, multiple monitors, gaming chair, immersive atmosphere",
    futuristic: "futuristic interior design, sci-fi inspired, LED lighting, holographic elements",
    cyberpunk: "cyberpunk interior, neon lights, high-tech low-life aesthetic, dark atmosphere",
    "retro-futuristic": "retro futuristic interior, space age furniture, curved shapes, bold colors",
    vintage: "vintage interior design, nostalgic charm, antique pieces, retro wallpaper, classic patterns",
    eclectic: "eclectic interior design, mix of styles, curated chaos, bold colors, unique pieces",
    maximalist: "maximalist interior design, more is more, bold patterns, layered decor, vibrant colors",
    gothic: "gothic interior design, dark elegance, dramatic atmosphere, ornate details, deep colors",
    vaporwave: "vaporwave interior design, pink and blue neon, nostalgic digital aesthetic, surreal",
    cottagecore: "cottagecore interior, rural idyll, floral patterns, handmade elements, cozy warmth",
    halloween: "halloween themed interior, spooky decor, pumpkins, cobwebs, dark atmosphere",
    christmas: "christmas themed interior, festive holiday decor, warm lights, garlands, cozy atmosphere",
  };

  const modePrefixes: Record<string, string> = {
    "interior-design": "photorealistic interior design of a",
    "style-transfer": "same room restyled as",
    "virtual-staging": "furnished photorealistic interior of a",
    sketch2image: "photorealistic render of a sketch of a",
    "outdoor-design": "photorealistic outdoor design of a",
    "empty-space": "empty room, bare walls, no furniture, clean",
  };

  const styleMod = styleModifiers[styleId] || styleModifiers.modern;
  const modePrefix = modePrefixes[mode] || modePrefixes["interior-design"];
  const roomName = roomType.replace(/-/g, " ");

  if (mode === "empty-space") {
    return `${modePrefix} ${roomName}, empty space, bare walls, no furniture, clean flooring, natural lighting, high resolution`;
  }

  let prompt = `${modePrefix} ${roomName} with ${styleMod}`;
  if (customPrompt) {
    prompt += `, ${customPrompt}`;
  }
  prompt += ", high resolution, 8k, photorealistic, professional photography, detailed";
  return prompt;
}

export function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const result = reader.result as string;
      resolve(result.split(",")[1]);
    };
    reader.onerror = (error) => reject(error);
  });
}

export function formatPrice(cents: number): string {
  return `$${(cents / 100).toFixed(0)}`;
}
