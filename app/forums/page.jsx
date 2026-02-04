"use client";

import { useMemo, useState } from "react";
import { AuthPrompt } from "@/components/auth/AuthPrompt";

const feedbackTypes = [
  "Product feedback",
  "Feature request",
  "Support enquiry",
  "Community suggestion",
];

export default function ForumsPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    type: feedbackTypes[0],
    name: "",
    email: "",
    topic: "",
    message: "",
    urgency: "Normal",
  });

  const remaining = useMemo(() => 500 - formData.message.length, [formData.message.length]);
  return (
    <section className="space-y-10">
      <div className="rounded-[32px] border border-white/70 bg-gradient-to-br from-[#f5e9ff] via-white to-[#dfe9ff] p-10 shadow-soft">
        <p className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-500">
          Community forum
        </p>
        <h1 className="mt-4 text-4xl font-semibold text-slate-900 sm:text-5xl">Forums</h1>
        <p className="mt-4 max-w-2xl text-lg text-slate-600">
          Structured discussion spaces with categories, threads, and thoughtful replies. The focus
          is on clarity, tradeoffs, and calm collaboration.
        </p>
      </div>
      <AuthPrompt
        actionLabel="Start a discussion"
        context="Launch a new thread when you want to gather opinions or share a proposal."
      />
      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-3xl border border-slate-100 bg-white/90 p-6 shadow-soft">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
            Categories
          </p>
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            {[
              { title: "Product strategy", detail: "Roadmaps, prioritization, user insight." },
              { title: "Engineering leadership", detail: "Org design, reliability, delivery." },
              { title: "System design", detail: "Architecture reviews and scalability." },
            ].map((category) => (
              <div
                className="rounded-2xl border border-white/80 bg-slate-50/80 p-4"
                key={category.title}
              >
                <p className="text-sm font-semibold text-slate-900">{category.title}</p>
                <p className="mt-2 text-sm text-slate-500">{category.detail}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-3xl border border-dashed border-slate-200 bg-white/80 p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
            Forum guidelines
          </p>
          <p className="mt-4 text-sm text-slate-600">
            Keep it kind, specific, and actionable. Share context, highlight tradeoffs, and
            document any assumptions so the next person can learn from the thread.
          </p>
          <div className="mt-4 flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
            <span className="rounded-full border border-slate-200 px-3 py-1">Be thoughtful</span>
            <span className="rounded-full border border-slate-200 px-3 py-1">Show evidence</span>
            <span className="rounded-full border border-slate-200 px-3 py-1">Stay concise</span>
          </div>
        </div>
      </div>
      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <form
          className="space-y-5 rounded-2xl border border-violet-100 bg-white p-6 shadow-soft"
          onSubmit={(event) => {
            event.preventDefault();
            setSubmitted(true);
          }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-500">
                Feedback console
              </p>
              <h2 className="text-2xl font-semibold text-slate-900">Share your thoughts</h2>
            </div>
            <span className="rounded-full bg-lavender px-3 py-1 text-xs font-semibold text-ink">
              {formData.type}
            </span>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <label className="space-y-2 text-sm text-slate-600">
              Your name
              <input
                className="w-full rounded-xl border border-slate-200 px-4 py-2 text-slate-700 focus:border-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-100"
                onChange={(event) => setFormData({ ...formData, name: event.target.value })}
                placeholder="Jane Doe"
                type="text"
                value={formData.name}
              />
            </label>
            <label className="space-y-2 text-sm text-slate-600">
              Email
              <input
                className="w-full rounded-xl border border-slate-200 px-4 py-2 text-slate-700 focus:border-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-100"
                onChange={(event) => setFormData({ ...formData, email: event.target.value })}
                placeholder="jane@email.com"
                type="email"
                value={formData.email}
              />
            </label>
          </div>
          <label className="space-y-2 text-sm text-slate-600">
            Feedback type
            <select
              className="w-full rounded-xl border border-slate-200 px-4 py-2 text-slate-700 focus:border-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-100"
              onChange={(event) => setFormData({ ...formData, type: event.target.value })}
              value={formData.type}
            >
              {feedbackTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </label>
          <label className="space-y-2 text-sm text-slate-600">
            Topic
            <input
              className="w-full rounded-xl border border-slate-200 px-4 py-2 text-slate-700 focus:border-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-100"
              onChange={(event) => setFormData({ ...formData, topic: event.target.value })}
              placeholder="What should we discuss?"
              type="text"
              value={formData.topic}
            />
          </label>
          <label className="space-y-2 text-sm text-slate-600">
            Message
            <textarea
              className="min-h-[140px] w-full rounded-xl border border-slate-200 px-4 py-2 text-slate-700 focus:border-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-100"
              maxLength={500}
              onChange={(event) => setFormData({ ...formData, message: event.target.value })}
              placeholder="Tell us what would be most helpful to improve."
              value={formData.message}
            />
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>500 characters max</span>
              <span>{remaining} left</span>
            </div>
          </label>
          <label className="space-y-2 text-sm text-slate-600">
            Urgency
            <div className="flex flex-wrap gap-2">
              {["Low", "Normal", "High"].map((level) => (
                <button
                  className={`rounded-full border px-4 py-1 text-xs font-semibold ${
                    formData.urgency === level
                      ? "border-violet-300 bg-violet-50 text-violet-700"
                      : "border-slate-200 text-slate-500"
                  }`}
                  key={level}
                  onClick={() => setFormData({ ...formData, urgency: level })}
                  type="button"
                >
                  {level}
                </button>
              ))}
            </div>
          </label>
          <button
            className="w-full rounded-full bg-ink px-4 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-ink/90"
            type="submit"
          >
            Send feedback
          </button>
          {submitted ? (
            <div className="rounded-xl border border-violet-100 bg-violet-50 p-4 text-sm text-violet-700">
              Thanks, {formData.name || "friend"}! We&apos;ll review your {formData.type.toLowerCase()}.
            </div>
          ) : null}
        </form>
        <div className="space-y-4 rounded-2xl border border-slate-100 bg-slate-50 p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
            Live preview
          </p>
          <div className="rounded-xl border border-white/70 bg-white p-4 shadow-soft">
            <p className="text-sm font-semibold text-slate-700">{formData.topic || "Topic"}</p>
            <p className="mt-2 text-sm text-slate-500">
              {formData.message || "Your message will appear here as you type."}
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-slate-400">
              <span className="rounded-full bg-lavender px-3 py-1 text-ink">
                {formData.type}
              </span>
              <span className="rounded-full border border-slate-200 px-3 py-1">
                Urgency: {formData.urgency}
              </span>
              <span>{formData.email || "email@example.com"}</span>
            </div>
          </div>
          <div className="rounded-xl border border-slate-100 bg-white p-4 text-sm text-slate-500">
            Our moderators review submissions twice daily and route them to the right team.
            Expect a response within 48 hours for high-urgency requests.
          </div>
        </div>
      </div>
      <AuthPrompt
        actionLabel="Reply"
        context="Join an existing thread with a calm, constructive response."
      />
    </section>
  );
}
