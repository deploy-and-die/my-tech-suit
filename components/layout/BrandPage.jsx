import Link from "next/link";

const heroCards = [
  { title: "Systems", tone: "bg-gradient-to-br from-accentLight/40 via-white to-white/90" },
  { title: "Ideas", tone: "bg-gradient-to-br from-lavender/60 to-white" },
  { title: "Impact", tone: "bg-gradient-to-br from-white to-accent/30" },
  { title: "Experiments", tone: "bg-gradient-to-br from-white via-lavender/40 to-accentLight/30" },
  { title: "Learning", tone: "bg-gradient-to-br from-lavender/70 to-white" },
];

const aboutCards = [
  {
    title: "Who I Am",
    body: "I’m a software engineer who cares about turning ideas into systems that actually hold up in the real world.\n\nI focus on clarity, tradeoffs, and building things that survive real usage—not just demos.",
  },
  {
    title: "Inside the Impact Studio",
    body: "Deliberate systems, measured bets, and space to think before building.\n\nIt’s where ideas become reliable software without the chaos.",
  },
  {
    title: "Why This Site",
    body: "This site is a living record of my work, experiments, and thinking.\n\nNot to impress—but to show how I approach problems and grow through building.",
  },
];

const whatIDoCards = [
  {
    title: "Systems Engineering",
    description:
      "Designing and building systems that are reliable, understandable, and maintainable.",
  },
  {
    title: "Product Thinking",
    description: "Translating vague ideas into concrete, usable software with real-world impact.",
  },
  {
    title: "Experimentation",
    description: "Exploring ideas through side projects, prototypes, and controlled chaos.",
  },
];

export function BrandPage() {
  return (
    <div className="space-y-12 pt-12">
      <section className="space-y-10">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6">
            <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Software for humans</p>
            <h1 className="text-4xl font-semibold text-ink sm:text-5xl">
              Hi, I’m Zaid. I’m an engineer who cares about thoughtful products and the people using
              them.
            </h1>
            <p className="text-lg font-medium text-ink">
              “I help ideas, products, and systems grow into meaningful impact, responsibly.”
            </p>
            <p className="text-base text-slate-500">
              I ship calm, well-considered software that’s grounded in real conversations, not
              buzzwords.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Link
                className="rounded-full bg-accentDark px-6 py-3 text-sm font-semibold text-white shadow-soft transition hover:bg-ink"
                href="/contact"
              >
                Contact Me
              </Link>
              <Link
                className="rounded-full border border-accent/60 px-6 py-3 text-sm font-semibold text-accent transition hover:border-accentDark hover:text-accentDark"
                href="/work"
              >
                Explore Impact Studio
              </Link>
            </div>
          </div>
          <div className="relative grid gap-4 sm:grid-cols-2">
            {heroCards.map((card) => (
              <div key={card.title} className={`rounded-3xl ${card.tone} p-6 shadow-soft`}>
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">{card.title}</p>
                <p className="mt-6 text-2xl font-semibold text-ink">{card.title}</p>
                <p className="mt-3 text-sm text-slate-500">
                  Structured depth for {card.title.toLowerCase()} and decision clarity.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="space-y-8">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-slate-500">About</p>
          <h2 className="mt-3 text-3xl font-semibold text-ink">A calm, credible introduction.</h2>
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          {aboutCards.map((card) => (
            <div
              key={card.title}
              className="rounded-3xl border border-accent/20 bg-white/80 p-6 shadow-soft"
            >
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400">{card.title}</p>
              <p className="mt-4 text-xl font-semibold text-ink">{card.title}</p>
              <p className="mt-3 whitespace-pre-line text-sm text-slate-600">{card.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-8">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-slate-500">What I Do</p>
          <h2 className="mt-3 text-3xl font-semibold text-ink">Think. Make. Solve.</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {whatIDoCards.map((card, index) => (
            <div
              key={card.title}
              className="rounded-3xl border border-accent/20 bg-white/85 p-6 shadow-soft"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-lavender/80 text-accentDark">
                <span className="text-lg font-semibold">{index + 1}</span>
              </div>
              <p className="mt-5 text-xl font-semibold text-ink">{card.title}</p>
              <p className="mt-3 text-sm text-slate-600">{card.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
