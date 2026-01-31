const IMAGE_MODEL = process.env.NEXT_PUBLIC_OPENAI_IMAGE_MODEL ?? process.env.OPENAI_IMAGE_MODEL ?? "gpt-image-1";
const API_KEY = process.env.NEXT_PUBLIC_OPENAI_API_KEY ?? process.env.OPENAI_API_KEY;

const FALLBACK_IMAGES = [
  "/images/blog/fallback-1.svg",
  "/images/blog/fallback-2.svg",
  "/images/blog/fallback-3.svg",
];

function randomFallback() {
  return FALLBACK_IMAGES[Math.floor(Math.random() * FALLBACK_IMAGES.length)] ?? "/images/blog/fallback-1.svg";
}

export async function generateBlogImage(title: string): Promise<string> {
  if (!API_KEY) {
    return randomFallback();
  }

  try {
    const response = await fetch("https://api.openai.com/v1/images/generations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        model: IMAGE_MODEL,
        prompt: `Create a modern, calm 3D illustration representing: ${title}. Theme: AI data engineering, pastel gradients, cinematic lighting, minimal futuristic objects on a pedestal.`,
        size: "1024x1024",
      }),
    });

    if (!response.ok) {
      console.error("Image generation failed", await response.text());
      return randomFallback();
    }

    const data = (await response.json()) as { data?: { url?: string }[] };
    const url = data.data?.[0]?.url;
    return url ?? randomFallback();
  } catch (error) {
    console.error("generateBlogImage error", error);
    return randomFallback();
  }
}
