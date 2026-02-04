export default function AuthPage() {
  return (
    <section className="space-y-8">
      <div className="rounded-[32px] border border-white/70 bg-gradient-to-br from-lavender/60 via-white to-white p-10 shadow-soft">
        <p className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-500">
          Secure access
        </p>
        <h1 className="mt-4 text-4xl font-semibold text-slate-900 sm:text-5xl">Sign In</h1>
        <p className="mt-4 max-w-2xl text-lg text-slate-600">
          OAuth-only authentication for comments, drafts, and forum participation. Your profile
          is used only to attribute contributions.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {[
          {
            title: "Comment with clarity",
            detail: "Join conversations on systems and product thinking.",
          },
          {
            title: "Publish drafts",
            detail: "Submit blog ideas for editorial review and feedback.",
          },
          {
            title: "Stay in control",
            detail: "No spam, no noise. Only verified contributions are shown.",
          },
        ].map((item) => (
          <div
            className="rounded-3xl border border-accent/20 bg-white/90 p-6 shadow-soft"
            key={item.title}
          >
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-400">
              {item.title}
            </p>
            <p className="mt-4 text-base text-slate-600">{item.detail}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
