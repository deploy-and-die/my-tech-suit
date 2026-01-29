const sections = [
  "Problem",
  "Constraints",
  "Decisions",
  "Execution",
  "Outcome",
  "Learnings",
];

export default function CaseStudiesPage() {
  return (
    <section className="space-y-6">
      <h1 className="text-3xl font-semibold text-slate-900">Case Studies</h1>
      <p className="max-w-2xl text-slate-600">
        Each case study follows a strict contract to keep insights comparable and
        auditable.
      </p>
      <div className="rounded-lg border border-slate-100 bg-slate-50 p-6">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">
          Required sections
        </p>
        <ul className="mt-4 grid gap-2 text-slate-600 sm:grid-cols-2">
          {sections.map((section) => (
            <li key={section} className="rounded border border-slate-200 bg-white px-3 py-2">
              {section}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
