const sections = [
  { title: "Problem", description: "What was broken, slow, or unclear?" },
  { title: "Constraints", description: "Budgets, timelines, or technical limits." },
  { title: "Decisions", description: "Tradeoffs, architectures, and prioritization." },
  { title: "Execution", description: "How the work actually shipped." },
  { title: "Outcome", description: "Results, numbers, and impact." },
  { title: "Learnings", description: "What we’d repeat or avoid." },
];

const caseStudyTracks = [
  {
    title: "Systems deep dives",
    detail: "Breakdowns of architecture, reliability, and scale.",
  },
  {
    title: "Product impact",
    detail: "Stories that connect engineering to measurable outcomes.",
  },
  {
    title: "Playbooks",
    detail: "Reusable templates and frameworks for teams.",
  },
];

export default function CaseStudiesPage() {
  return (
    <section className="space-y-10">
      <div className="rounded-[32px] border border-white/70 bg-gradient-to-br from-white via-lavender/40 to-accentLight/40 p-10 shadow-soft">
        <p className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-500">
          Studio narratives
        </p>
        <h1 className="mt-4 text-4xl font-semibold text-slate-900 sm:text-5xl">Case Studies</h1>
        <p className="mt-4 max-w-2xl text-lg text-slate-600">
          Each case study is designed as a calm, auditable narrative. The goal is to explain the
          situation, the choices made, and the lasting impact.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {caseStudyTracks.map((track) => (
          <div
            className="rounded-3xl border border-accent/20 bg-white/90 p-6 shadow-soft"
            key={track.title}
          >
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-400">
              {track.title}
            </p>
            <p className="mt-4 text-base text-slate-600">{track.detail}</p>
          </div>
        ))}
      </div>

      <div className="rounded-[28px] border border-slate-100 bg-white/90 p-8 shadow-soft">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
          Required sections
        </p>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {sections.map((section) => (
            <div
              key={section.title}
              className="rounded-2xl border border-white/80 bg-slate-50/80 p-4"
            >
              <p className="text-sm font-semibold text-slate-900">{section.title}</p>
              <p className="mt-2 text-sm text-slate-500">{section.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
