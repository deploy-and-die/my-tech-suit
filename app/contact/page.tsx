export default function ContactPage() {
  return (
    <section className="space-y-8">
      <div className="flex flex-wrap items-center gap-3">
        <span className="rounded-full bg-lavender px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-ink">
          Contact Us
        </span>
        <h1 className="text-4xl font-semibold text-slate-900">Let&apos;s get in touch.</h1>
      </div>
      <p className="max-w-2xl text-slate-600">
        Reach out for collaborations, advisory work, or community partnerships. We love playful
        ideas that turn into real-world impact.
      </p>
      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-6 rounded-3xl border border-violet-100 bg-white p-6 shadow-soft">
          <div className="space-y-3">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-violet-500">
              Send us a note
            </p>
            <h2 className="text-2xl font-semibold text-slate-900">We&apos;re all ears.</h2>
            <p className="text-sm text-slate-500">
              Prefer a quick hello? Email{" "}
              <span className="font-semibold text-violet-600">hello@originstory.io</span>.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
              <p className="text-sm font-semibold text-slate-700">Live chat</p>
              <p className="mt-1 text-sm text-slate-500">Mon–Fri, 9am–6pm</p>
              <p className="mt-4 text-sm font-semibold text-violet-600">hello@originstory.io</p>
            </div>
            <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
              <p className="text-sm font-semibold text-slate-700">Submit a ticket</p>
              <p className="mt-1 text-sm text-slate-500">We respond within 24 hours</p>
              <p className="mt-4 text-sm font-semibold text-violet-600">support@originstory.io</p>
            </div>
            <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
              <p className="text-sm font-semibold text-slate-700">Visit our studio</p>
              <p className="mt-1 text-sm text-slate-500">221b Elementary Avenue, NY</p>
              <p className="mt-4 text-sm font-semibold text-violet-600">Book a tour</p>
            </div>
            <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
              <p className="text-sm font-semibold text-slate-700">Call us directly</p>
              <p className="mt-1 text-sm text-slate-500">Available during working hours</p>
              <p className="mt-4 text-sm font-semibold text-violet-600">(+1) 234-567-789</p>
            </div>
          </div>
        </div>
        <div className="space-y-4 rounded-3xl border border-slate-100 bg-gradient-to-br from-violet-50 via-white to-peach p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
            Contact details
          </p>
          <div className="space-y-3 rounded-2xl bg-white/80 p-4 shadow-soft">
            <p className="text-sm font-semibold text-slate-700">Office hours</p>
            <p className="text-sm text-slate-500">Monday to Friday · 9am – 6pm EST</p>
          </div>
          <div className="space-y-3 rounded-2xl bg-white/80 p-4 shadow-soft">
            <p className="text-sm font-semibold text-slate-700">Response time</p>
            <p className="text-sm text-slate-500">We aim to respond within 24–48 hours.</p>
          </div>
          <div className="space-y-3 rounded-2xl bg-white/80 p-4 shadow-soft">
            <p className="text-sm font-semibold text-slate-700">Social space</p>
            <p className="text-sm text-slate-500">@originstory on Threads + Instagram</p>
          </div>
          <div className="rounded-2xl border border-violet-200 bg-white/90 p-4 text-sm text-slate-600">
            Bring your playful idea or inquiry — we&apos;ll help shape it into a meaningful
            collaboration.
          </div>
        </div>
      </div>
    </section>
  );
}
