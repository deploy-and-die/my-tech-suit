const focusAreas = [
  {
    title: "Product experiments",
    description: "Rapid prototypes that explore the feasibility of new workflows and AI assist.",
    highlight: "Short cycles · 1-2 weeks",
  },
  {
    title: "Systems playbooks",
    description: "Repeatable patterns for APIs, workflows, and system resilience.",
    highlight: "Reusable · Documented",
  },
  {
    title: "Creative tooling",
    description: "Internal utilities that remove friction from shipping and collaboration.",
    highlight: "Automation · Calm UX",
  },
];

const upcoming = [
  {
    title: "Impact Studio OS",
    detail: "A lightweight operating system for narrative-driven case studies.",
  },
  {
    title: "Signal Desk",
    detail: "A quiet alerting layer for teams managing high-signal systems.",
  },
  {
    title: "Studio micro-log",
    detail: "A tiny publishing workflow for sharing daily learnings.",
  },
];

export default function SideProjectsPage() {
  return (
    <section className="space-y-10">
      <div className="rounded-[32px] border border-white/70 bg-gradient-to-br from-lavender/60 via-white to-white p-10 shadow-soft">
        <p className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-500">
          Experiments & prototypes
        </p>
        <h1 className="mt-4 text-4xl font-semibold text-slate-900 sm:text-5xl">Side Projects</h1>
        <p className="mt-4 max-w-2xl text-lg text-slate-600">
          Focused experiments that stress-test new ideas before they reach production. Each
          project is designed to answer a clear question and document the learning.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {focusAreas.map((area) => (
          <div
            className="flex h-full flex-col justify-between rounded-3xl border border-accent/20 bg-white/90 p-6 shadow-soft"
            key={area.title}
          >
            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
                {area.title}
              </p>
              <p className="text-lg font-semibold text-slate-900">{area.description}</p>
            </div>
            <span className="mt-6 inline-flex w-fit rounded-full bg-lavender/60 px-3 py-1 text-xs font-semibold text-ink">
              {area.highlight}
            </span>
          </div>
        ))}
      </div>

      <div className="rounded-[28px] border border-dashed border-slate-200 bg-white/80 p-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
              Up next
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-slate-900">
              Shipping a few quiet experiments soon.
            </h2>
          </div>
          <span className="rounded-full bg-ink px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white">
            Coming soon
          </span>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {upcoming.map((item) => (
            <div className="rounded-2xl border border-white/80 bg-white p-4 shadow-soft" key={item.title}>
              <p className="text-sm font-semibold text-slate-900">{item.title}</p>
              <p className="mt-2 text-sm text-slate-500">{item.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
