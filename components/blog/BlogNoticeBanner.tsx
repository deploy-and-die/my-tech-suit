"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export function BlogNoticeBanner({ notice }: { notice: "published" | "review" }) {
  const router = useRouter();
  const isPublished = notice === "published";

  useEffect(() => {
    const timer = window.setTimeout(() => router.replace("/blog"), 3000);
    return () => window.clearTimeout(timer);
  }, [router]);

  return (
    <div
      className={`rounded-2xl border px-4 py-3 text-sm font-medium shadow-soft ${
        isPublished ? "border-emerald-200 bg-emerald-50 text-emerald-700" : "border-indigo-200 bg-indigo-50 text-indigo-700"
      }`}
    >
      {isPublished
        ? "Your blog is live. Thanks for contributing to the Impact Studio."
        : "Draft submitted. The editorial team is reviewing your blog now."}
    </div>
  );
}
