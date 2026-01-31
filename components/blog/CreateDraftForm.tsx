"use client";

import { useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { createBlogDraft } from "@/app/actions/blog";

export function CreateDraftForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const [result, setResult] = useState<"published" | "review" | null>(null);

  async function handleAction(formData: FormData) {
    startTransition(async () => {
      const submission = await createBlogDraft(formData);
      formRef.current?.reset();
      setResult(submission?.status ?? "review");
    });
  }

  return (
    <>
      <form ref={formRef} action={handleAction} className="mt-6 space-y-4">
        <label className="space-y-2 text-sm text-slate-600">
          Title
          <input
            className="w-full rounded-xl border border-slate-200 px-4 py-2 text-slate-700 focus:border-accentDark focus:outline-none focus:ring-2 focus:ring-accentLight/50"
            name="title"
            placeholder="Draft headline"
            required
            type="text"
            disabled={isPending}
          />
        </label>
        <label className="space-y-2 text-sm text-slate-600">
          Content (Markdown)
          <textarea
            className="min-h-[200px] w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 font-mono text-slate-700 focus:border-accentDark focus:outline-none focus:ring-2 focus:ring-accentLight/50"
            name="content"
            placeholder="Share your idea with Markdown — headings, bullets, callouts all welcome."
            required
            disabled={isPending}
          />
        </label>
        <div className="flex flex-wrap gap-3">
          <button
            className="rounded-full bg-ink px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-ink/90 disabled:cursor-not-allowed disabled:opacity-60"
            type="submit"
            disabled={isPending}
          >
            {isPending ? "Saving…" : "Save draft"}
          </button>
          <p className="text-xs text-slate-400">Drafts stay private until an admin publishes them.</p>
        </div>
      </form>

      {result ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 p-4">
          <div className="max-w-sm rounded-3xl border border-white/70 bg-white p-6 text-center shadow-soft">
            <h3 className="text-xl font-semibold text-slate-900">
              {result === "published" ? "Published!" : "Draft submitted"}
            </h3>
            <p className="mt-2 text-sm text-slate-600">
              {result === "published"
                ? "Your blog is now live in the Insights section."
                : "We’ll review your draft and publish once it passes editorial checks."}
            </p>
            <button
              className="mt-4 inline-flex items-center justify-center rounded-full bg-ink px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-ink/90"
              type="button"
              onClick={() => router.push(`/blog?notice=${result}`)}
            >
              Back to blogs
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}
