import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { formatBlogContent } from "@/lib/blogFormatter";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

function formatDate(value: Date) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(value);
}

export default async function BlogDetailPage({ params }: { params: { id: string } }) {
  const post = await prisma.blogPost.findUnique({
    where: { id: params.id },
    include: { author: true },
  });

  if (!post || post.status !== "PUBLISHED") {
    notFound();
  }

  const formatted = await formatBlogContent(post.content);

  return (
    <article className="space-y-6">
      <div className="rounded-[32px] border border-white/60 bg-white/90 p-8 shadow-soft">
        <Link className="text-sm font-semibold text-accentDark hover:text-ink" href="/blog">
          ← Back to Published Blogs
        </Link>
        <div className="mt-6 space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-500">
            {post.author.name ?? post.author.email}
          </p>
          <h1 className="text-4xl font-semibold text-slate-900">{post.title}</h1>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
            {formatDate(post.createdAt)}
          </p>
        </div>
      </div>
      <div className="rounded-[32px] border border-white/60 bg-white/90 p-8 shadow-soft">
        <ReactMarkdown
          className="prose prose-slate max-w-none text-base leading-relaxed prose-headings:text-slate-900 prose-p:text-slate-700 prose-li:marker:text-slate-400"
          remarkPlugins={[remarkGfm]}
        >
          {formatted || post.content}
        </ReactMarkdown>
      </div>
    </article>
  );
}
