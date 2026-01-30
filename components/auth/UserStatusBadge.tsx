"use client";

import { useSession } from "next-auth/react";
import { isAdminUser } from "@/lib/permissions";

export function UserStatusBadge() {
  const { data: session, status } = useSession();

  if (status === "loading" || !session?.user) {
    return null;
  }

  const isAdmin = isAdminUser(session.user);
  const email = session.user.email ?? "Unknown user";

  return (
    <div className="flex items-center justify-end">
      <div className="rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 shadow-soft">
        {isAdmin ? "Admin" : `User: ${email}`}
      </div>
    </div>
  );
}
