"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { isAdminUser } from "@/lib/permissions";

export function UserStatusBadge() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div className="flex justify-end">
        <div className="h-9 w-36 animate-pulse rounded-full bg-slate-200" />
      </div>
    );
  }

  if (!session?.user) {
    return (
      <div className="flex justify-end">
        <button
          className="rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-600 shadow-soft transition hover:border-slate-300 hover:text-ink"
          onClick={() => signIn()}
          type="button"
        >
          Log in
        </button>
      </div>
    );
  }

  const isAdmin = isAdminUser(session.user);
  const email = session.user.email ?? "Unknown user";

  return (
    <div className="flex items-center justify-end gap-3">
      <div className="rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 shadow-soft">
        {isAdmin ? `Admin · ${email}` : `User · ${email}`}
      </div>
      <button
        className="rounded-full border border-slate-200 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-600 transition hover:border-slate-300 hover:text-ink"
        onClick={() => signOut()}
        type="button"
      >
        Log out
      </button>
    </div>
  );
}
