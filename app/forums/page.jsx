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
    <section className="space-y-6">
      <h1 className="text-3xl font-semibold text-slate-900">Forums</h1>
      <p className="max-w-2xl text-slate-600">
        Structured discussion spaces with categories, threads, and one-level replies.
      </p>
      <AuthPrompt
        actionLabel="Start a discussion"
        context="Launch a new thread when you want to gather opinions or share a proposal."
      />
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
