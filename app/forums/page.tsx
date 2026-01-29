export default function ForumsPage() {
  return (
    <section className="space-y-6">
      <h1 className="text-3xl font-semibold text-slate-900">Forums</h1>
      <p className="max-w-2xl text-slate-600">
        Structured discussion spaces with categories, threads, and one-level replies.
      </p>
      <div className="rounded-lg border border-slate-100 bg-slate-50 p-6">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">
          Categories
        </p>
        <ul className="mt-4 space-y-2 text-slate-600">
          <li>Product strategy</li>
          <li>Engineering leadership</li>
          <li>System design</li>
        </ul>
      </div>
    </section>
  );
}
