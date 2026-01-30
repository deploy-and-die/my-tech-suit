"use client";

import Link from "next/link";

function formatDate(value: string) {
  const parsed = new Date(value);
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(parsed);
}

export type PublishedPost = {
  id: string;
  title: string;
  rawContent: string;
  formattedContent: string;
  createdAt: string;
  authorName: string | null;
  authorEmail: string;
  isOwn: boolean;
};

export function PublishedPostsList({ posts }: { posts: PublishedPost[] }) {
  return (
    <div className="space-y-3">
      {posts.map((post) => (
        <Link
          key={post.id}
          className="flex w-full items-center justify-between rounded-2xl border border-slate-100 bg-white px-4 py-3 text-left shadow-soft transition hover:-translate-y-0.5 hover:border-slate-200 hover:bg-white/90"
          href={`/blog/${post.id}`}
        >
          <div>
            <p className="text-sm font-semibold text-slate-900">{post.title}</p>
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
              {post.isOwn ? "Your blog" : post.authorName ?? post.authorEmail}
              {" · "}
              {formatDate(post.createdAt)}
            </p>
          </div>
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Open</span>
        </Link>
      ))}
    </div>
  );
}
