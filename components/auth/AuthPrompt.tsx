"use client";

import { useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";

interface AuthPromptProps {
  actionLabel: string;
  context?: string;
}

export function AuthPrompt({ actionLabel, context }: AuthPromptProps) {
  const { data: session, status } = useSession();
  const [showPrompt, setShowPrompt] = useState(false);

  const handleAction = () => {
    if (session?.user) {
      setShowPrompt(false);
      return;
    }
    setShowPrompt(true);
  };

  const handleProviderSignIn = async (provider: "google" | "github") => {
    const callbackUrl = window.location.href;
    await signIn(provider, { callbackUrl });
  };

  const handleSignOut = async () => {
    await signOut({ callbackUrl: window.location.href });
  };

  return (
    <section className="space-y-4 rounded-2xl border border-slate-100 bg-white p-6 shadow-soft">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
            Conversation
          </p>
          <h2 className="text-2xl font-semibold text-slate-900">{actionLabel}</h2>
          {context ? <p className="mt-2 text-sm text-slate-500">{context}</p> : null}
        </div>
        <button
          className="rounded-full bg-ink px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-ink/90"
          onClick={handleAction}
          type="button"
        >
          {actionLabel}
        </button>
      </div>

      {status === "loading" ? (
        <div className="rounded-xl border border-slate-100 bg-slate-50 p-4 text-sm text-slate-500">
          Checking your session…
        </div>
      ) : session?.user ? (
        <div className="rounded-xl border border-emerald-100 bg-emerald-50 p-4 text-sm text-emerald-700">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span>
              Signed in as {session.user.name ?? session.user.email ?? "community member"}.
              You&apos;re ready to {actionLabel.toLowerCase()}.
            </span>
            <button
              className="rounded-full border border-emerald-200 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700"
              onClick={handleSignOut}
              type="button"
            >
              Sign out
            </button>
          </div>
        </div>
      ) : showPrompt ? (
        <div className="space-y-3 rounded-xl border border-slate-100 bg-slate-50 p-4">
          <p className="text-sm font-semibold text-slate-700">
            Sign in to join the conversation
          </p>
          <div className="flex flex-wrap gap-3">
            <button
              className="rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-600 transition hover:border-slate-300"
              onClick={() => handleProviderSignIn("google")}
              type="button"
            >
              Continue with Google
            </button>
            <button
              className="rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-600 transition hover:border-slate-300"
              onClick={() => handleProviderSignIn("github")}
              type="button"
            >
              Continue with GitHub
            </button>
          </div>
          <p className="text-xs text-slate-400">
            No passwords or verification — just OAuth to keep things calm.
          </p>
        </div>
      ) : null}
    </section>
  );
}
