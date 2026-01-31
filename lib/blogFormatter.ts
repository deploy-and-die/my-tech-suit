const OPENAI_MODEL = process.env.NEXT_PUBLIC_OPENAI_BLOG_MODEL ?? process.env.OPENAI_BLOG_MODEL ?? "gpt-4o-mini";

const BLOG_PROMPT = `You are a meticulous editor and storyteller. Take the provided blog content and:
- Remove stray symbols, repeated punctuation, and obvious formatting noise.
- Improve flow and grammar while keeping the author's voice.
- Organize the narrative for a compelling read: add headings, subheadings, bullet lists, callouts, and emphasis using Markdown where useful.
- Surface summaries or key takeaways near the top if the content benefits from it.
- Return beautiful, reader-ready Markdown only. Do not wrap with code fences.`;

export async function formatBlogContent(raw: string): Promise<string> {
  const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY ?? process.env.OPENAI_API_KEY;
  if (!apiKey || raw.trim().length === 0) {
    return raw;
  }

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: OPENAI_MODEL,
        messages: [
          { role: "system", content: BLOG_PROMPT },
          { role: "user", content: raw },
        ],
        temperature: 0.2,
      }),
    });

    if (!response.ok) {
      console.error("Failed to format blog content", await response.text());
      return raw;
    }

    const data = (await response.json()) as {
      choices?: { message?: { content?: string } }[];
    };

    const content = data.choices?.[0]?.message?.content?.trim();
    return content?.length ? content : raw;
  } catch (error) {
    console.error("formatBlogContent error", error);
    return raw;
  }
}
