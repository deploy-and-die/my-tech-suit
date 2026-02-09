import Link from "next/link";

const heroCards = [
  {
    title: "Systems",
    eyebrow: "Design",
    description: "Structured depth for systems and decision clarity.",
    tone:
      "from-[#eff2ff] via-white to-[#f5f1ff]",
  },
  {
    title: "Ideas",
    eyebrow: "Thinking",
    description: "Turning rough thoughts into practical concepts people can use.",
    tone:
      "from-[#f3f5ff] via-white to-[#eef8ff]",
  },
  {
    title: "Impact",
    eyebrow: "Outcome",
    description: "Building in a way that creates measurable, meaningful change.",
    tone:
      "from-[#eff9ff] via-white to-[#f2f0ff]",
  },
  {
    title: "Experiments",
    eyebrow: "Practice",
    description: "Fast learning loops with prototypes that reveal what matters early.",
    tone:
      "from-[#f7f1ff] via-white to-[#edf3ff]",
  },
  {
    title: "Learning",
    eyebrow: "Growth",
    description: "A continuous process of reflection, iteration, and craftsmanship.",
    tone:
      "from-[#eef5ff] via-white to-[#f7f2ff]",
  },
];

const aboutCards = [
  {
    title: "Who I Am",
    body: "I’m a software engineer who cares about turning ideas into systems that actually hold up in the real world. I focus on clarity, tradeoffs, and building things that survive real usage—not just demos.",
  },
  {
    title: "Inside the Impact Studio",
    body: "Deliberate systems, measured bets, and space to think before building. It’s where ideas become reliable software without the chaos.",
  },
  {
    title: "Why This Site",
    body: "This site is a living record of my work, experiments, and thinking. Not to impress—but to show how I approach problems and grow through building.",
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
    <div className="space-y-14 pb-14 pt-10 sm:pt-14">
      <section className="animate-fade-up">
        <div className="relative overflow-hidden rounded-[2rem] border border-white/70 bg-white/85 p-6 shadow-card backdrop-blur sm:p-10">
          <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(120deg,rgba(184,192,255,0.2),rgba(255,255,255,0.45),rgba(187,208,255,0.25),rgba(200,182,255,0.2))] bg-[length:220%_220%] animate-shimmer" />
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-6">
              <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Software for humans</p>
              <h1 className="text-4xl font-semibold leading-tight text-ink sm:text-5xl">
                Hi, I’m Zaid. I’m an engineer who cares about thoughtful products and the people
                using them.
              </h1>
              <p className="text-xl font-semibold text-[#2f3567]">
                “I help ideas, products, and systems grow into meaningful impact, responsibly.”
              </p>
              <p className="max-w-xl text-base leading-relaxed text-slate-600">
                I ship calm, well-considered software that’s grounded in real conversations, not
                buzzwords.
              </p>
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  className="rounded-full bg-[#344089] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[#344089]/30 transition duration-300 hover:-translate-y-0.5 hover:bg-[#273372]"
                  href="/contact"
                >
                  Contact Me
                </Link>
                <Link
                  className="rounded-full border border-[#344089]/30 bg-white px-6 py-3 text-sm font-semibold text-[#344089] transition duration-300 hover:-translate-y-0.5 hover:border-[#344089] hover:bg-[#eef1ff]"
                  href="/work"
                >
                  Explore Impact Studio
                </Link>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {heroCards.map((card, index) => (
                <div
                  key={card.title}
                  className={`group rounded-3xl border border-white/80 bg-gradient-to-br ${card.tone} p-5 shadow-soft transition duration-300 hover:-translate-y-1 hover:shadow-card ${
                    index === 4 ? "sm:col-span-2" : ""
                  }`}
                  style={{ animationDelay: `${index * 120}ms` }}
                >
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-500">{card.eyebrow}</p>
                  <p className="mt-3 text-2xl font-semibold text-ink">{card.title}</p>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{card.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-8 animate-fade-up [animation-delay:120ms]">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-slate-500">About</p>
          <h2 className="mt-3 text-3xl font-semibold text-ink">A calm, credible introduction.</h2>
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          {aboutCards.map((card) => (
            <article
              key={card.title}
              className="rounded-3xl border border-[#d9defb] bg-white p-6 shadow-soft transition duration-300 hover:-translate-y-1 hover:shadow-card"
            >
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">{card.title}</p>
              <p className="mt-4 text-xl font-semibold text-ink">{card.title}</p>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">{card.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="space-y-8 animate-fade-up [animation-delay:240ms]">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-slate-500">What I Do</p>
          <h2 className="mt-3 text-3xl font-semibold text-ink">Think. Make. Solve.</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {whatIDoCards.map((card, index) => (
            <article
              key={card.title}
              className="rounded-3xl border border-[#d9defb] bg-white p-6 shadow-soft transition duration-300 hover:-translate-y-1 hover:shadow-card"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#e9edff] text-[#344089]">
                <span className="text-lg font-semibold">{index + 1}</span>
              </div>
              <p className="mt-5 text-xl font-semibold text-ink">{card.title}</p>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">{card.description}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
