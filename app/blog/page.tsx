import { AuthPrompt } from "@/components/auth/AuthPrompt";
import { EditConsoleModal } from "@/components/blog/EditConsoleModal";
import { BlogNoticeBanner } from "@/components/blog/BlogNoticeBanner";
import {
  archiveBlogPost,
  deleteBlogPost,
  publishBlogPost,
  requestBlogReview,
  updateBlogPost,
  unarchiveBlogPost,
} from "@/app/actions/blog";
import { auth } from "@/lib/auth";
import { isAdminUser } from "@/lib/permissions";
import { prisma } from "@/lib/prisma";
import { formatBlogContent } from "@/lib/blogFormatter";
import { generateBlogImage } from "@/lib/blogImage";
import Link from "next/link";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const statusLabels = {
  DRAFT: "Draft",
  PUBLISHED: "Published",
  ARCHIVED: "Archived",
} as const;

function formatDate(value: Date) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(value);
}

function buildExcerpt(content: string, maxLength = 180) {
  const normalized = content.replace(/\n+/g, " ").replace(/\s+/g, " ").trim();
  if (normalized.length <= maxLength) return normalized;
  return `${normalized.slice(0, maxLength)}…`;
}

export default async function BlogPage({
  searchParams,
}: {
  searchParams?: { notice?: string };
}) {
  const session = await auth();
  const isAdmin = isAdminUser(session?.user);
  const userId = session?.user?.id;
  const notice = searchParams?.notice;

  const publishedPosts = await prisma.blogPost.findMany({
    where: { status: "PUBLISHED" },
    include: { author: true },
    orderBy: { createdAt: "desc" },
  });

  const orderedPublishedPosts = [] as {
    id: string;
    title: string;
    excerpt: string;
    author: string;
    createdAt: Date;
    imageUrl: string;
    isOwn: boolean;
  }[];

  const sortedPublished = [...publishedPosts].sort((a, b) => {
    const aOwn = a.authorId === userId;
    const bOwn = b.authorId === userId;
    if (aOwn && !bOwn) return -1;
    if (!aOwn && bOwn) return 1;
    return b.createdAt.getTime() - a.createdAt.getTime();
  });

  for (const post of sortedPublished) {
    let imageUrl = post.imageUrl;
    if (!imageUrl) {
      imageUrl = await generateBlogImage(post.title);
      await prisma.blogPost.update({ where: { id: post.id }, data: { imageUrl } }).catch((error) => {
        console.error("Failed to cache blog image", error);
      });
    }

    orderedPublishedPosts.push({
      id: post.id,
      title: post.title,
      excerpt: buildExcerpt(post.content),
      author: post.author.name ?? post.author.email,
      createdAt: post.createdAt,
      imageUrl,
      isOwn: post.authorId === userId,
    });
  }

  const drafts = userId
    ? await prisma.blogPost.findMany({
        where: isAdmin
          ? { status: "DRAFT" }
          : { status: "DRAFT", authorId: userId },
        include: { author: true },
        orderBy: { updatedAt: "desc" },
      })
    : [];

  const adminPosts = isAdmin
    ? await Promise.all(
        (
          await prisma.blogPost.findMany({
            include: { author: true },
            orderBy: { title: "asc" },
          })
        ).map(async (post) => ({
          id: post.id,
          title: post.title,
          status: post.status,
          authorName: post.author.name,
          authorEmail: post.author.email,
          authorId: post.authorId,
          updatedAt: post.updatedAt,
          reviewRequestedAt: post.reviewRequestedAt,
          formattedContent: await formatBlogContent(post.content),
          rawContent: post.content,
        }))
      )
    : [];

  return (
    <section className="space-y-10">
      <div className="rounded-[32px] border border-white/70 bg-gradient-to-br from-[#f5e9ff] via-white to-[#dfe9ff] p-10 shadow-soft">
        <p className="text-sm font-semibold uppercase tracking-[0.4em] text-slate-500">
          Resources to Power Your Engineering Stories
        </p>
        <h1 className="mt-4 text-4xl font-semibold text-slate-900 sm:text-5xl">
          Explore guides, documentation, and long-form ideas from the Impact Studio community.
        </h1>
        <p className="mt-4 max-w-3xl text-lg text-slate-600">
          Every blog blends real-world systems with thoughtful storytelling. Open any article to see curated
          AI visuals, markdown-rich narratives, and hard data from the field.
        </p>
      </div>

      {notice === "published" || notice === "review" ? (
        <BlogNoticeBanner notice={notice} />
      ) : null}

      <section className="space-y-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl font-semibold text-slate-900">Engineering insights</h2>
            <p className="text-slate-600">Actionable systems thinking for production codebases.</p>
          </div>
          {session?.user ? (
            <Link
              className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-ink/90"
              href="/blog/new"
            >
              Write your blog →
            </Link>
          ) : null}
        </div>
        {orderedPublishedPosts.length === 0 ? (
          <div className="rounded-[32px] border border-dashed border-slate-200 bg-white/80 p-10 text-center text-slate-500">
            No blogs are live yet. Drafts move to this showcase once they are published.
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {orderedPublishedPosts.map((post) => (
              <Link
                key={post.id}
                className="group flex h-full flex-col overflow-hidden rounded-[28px] border border-white/70 bg-white shadow-soft transition hover:-translate-y-1 hover:shadow-lg"
                href={`/blog/${post.id}`}
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
                  <Image
                    alt={post.title}
                    src={post.imageUrl}
                    fill
                    unoptimized
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-slate-900/20 to-transparent"
                    aria-hidden
                  />
                </div>
                <div className="flex flex-1 flex-col space-y-3 p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
                    {post.author} · {formatDate(post.createdAt)}
                  </p>
                  <h3 className="text-xl font-semibold text-slate-900">{post.title}</h3>
                  <p className="text-sm text-slate-600">{post.excerpt}</p>
                  <span className="mt-auto text-xs font-semibold uppercase tracking-[0.3em] text-accentDark">
                    Read the story →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {!session?.user ? (
        <AuthPrompt
          actionLabel="Write a draft"
          context="Sign in to share a long-form idea. We review every submission before publishing."
        />
      ) : null}

      {userId && !isAdmin ? (
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h2 className="text-2xl font-semibold text-slate-900">Your drafts</h2>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
              Private to you
            </span>
          </div>
          {drafts.length === 0 ? (
            <div className="rounded-2xl border border-slate-100 bg-slate-50 p-6 text-sm text-slate-500">
              Start a draft to share an idea with the editorial team.
            </div>
          ) : (
            <div className="space-y-4">
              {drafts.map((post) => (
                <div
                  className="rounded-2xl border border-slate-100 bg-white p-6 shadow-soft"
                  key={post.id}
                >
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900">{post.title}</h3>
                      <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                        Last updated {formatDate(post.updatedAt)}
                      </p>
                    </div>
                    <span className="rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-500">
                      Draft
                    </span>
                  </div>
                  <p className="mt-3 text-sm text-slate-500">
                    {post.reviewRequestedAt
                      ? "Review requested — we’ll follow up with edits or feedback."
                      : "Not yet submitted for review."}
                  </p>
                  <div className="mt-4">
                    <EditConsoleModal
                      subtitle={post.reviewRequestedAt ? "Review requested" : "Draft"}
                      title={`Edit “${post.title}”`}
                      triggerLabel="Open editor"
                    >
                      <form action={updateBlogPost.bind(null, post.id)} className="space-y-3" method="post">
                          <label className="space-y-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                            Title
                            <input
                              className="w-full rounded-xl border border-slate-200 px-4 py-2 text-sm text-slate-700"
                              defaultValue={post.title}
                            name="title"
                            required
                            type="text"
                          />
                        </label>
                        <label className="space-y-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                          Content
                          <textarea
                            className="min-h-[200px] w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 font-mono text-sm text-slate-700"
                            defaultValue={post.content}
                            name="content"
                            required
                          />
                        </label>
                          <button
                            className="rounded-full border border-ink px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-ink transition hover:bg-ink hover:text-white"
                            type="submit"
                          >
                            Save updates
                          </button>
                        </form>
                    </EditConsoleModal>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {!post.reviewRequestedAt ? (
                        <form action={requestBlogReview.bind(null, post.id)} method="post">
                          <button
                            className="rounded-full border border-slate-200 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 transition hover:border-accentDark hover:text-ink"
                            type="submit"
                          >
                            Submit for review
                          </button>
                        </form>
                      ) : null}
                      <form action={deleteBlogPost.bind(null, post.id)} method="post">
                        <button
                          className="rounded-full border border-slate-200 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 transition hover:border-slate-400 hover:text-slate-700"
                          type="submit"
                        >
                          Delete draft
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : null}

      {isAdmin ? (
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h2 className="text-2xl font-semibold text-slate-900">Editorial console</h2>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
              Admin only
            </span>
          </div>
          {adminPosts.length === 0 ? (
            <div className="rounded-2xl border border-slate-100 bg-slate-50 p-6 text-sm text-slate-500">
              No drafts or published posts yet.
            </div>
          ) : (
            <ul className="space-y-3">
              {adminPosts.map((post) => {
                const statusLabel = statusLabels[post.status];
                const canPublish = post.status === "DRAFT";
                const canArchive = post.status !== "ARCHIVED";
                return (
                  <li key={post.id}>
                    <EditConsoleModal
                      subtitle={`${statusLabel} • ${post.authorName ?? post.authorEmail}`}
                      title={post.title}
                      triggerLabel={post.title}
                    >
                      <div className="space-y-4">
                          <ReactMarkdown className="prose prose-slate max-w-none text-sm" remarkPlugins={[remarkGfm]}>
                            {post.formattedContent || post.rawContent}
                          </ReactMarkdown>
                          <div className="flex flex-wrap gap-2">
                            {canPublish ? (
                              <form action={publishBlogPost.bind(null, post.id)} method="post">
                                <button
                                  className="rounded-full border border-slate-200 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 transition hover:border-accentDark hover:text-ink"
                                  type="submit"
                                >
                                  Approve & publish
                                </button>
                              </form>
                            ) : null}
                            {canArchive ? (
                              <form action={archiveBlogPost.bind(null, post.id)} method="post">
                                <button
                                  className="rounded-full border border-slate-200 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 transition hover:border-slate-400 hover:text-slate-700"
                                  type="submit"
                                >
                                  Archive
                                </button>
                              </form>
                            ) : (
                              <form action={unarchiveBlogPost.bind(null, post.id)} method="post">
                                <button
                                  className="rounded-full border border-slate-200 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 transition hover:border-accentDark hover:text-ink"
                                  type="submit"
                                >
                                  Restore to draft
                                </button>
                              </form>
                            )}
                            <form action={deleteBlogPost.bind(null, post.id)} method="post">
                              <button
                                className="rounded-full border border-red-200 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-red-500 transition hover:border-red-300 hover:text-red-600"
                                type="submit"
                              >
                                Delete permanently
                              </button>
                            </form>
                          </div>
                          <details className="rounded-xl border border-slate-100 bg-slate-50 p-4">
                            <summary className="cursor-pointer text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                              Edit blog
                            </summary>
                            <form action={updateBlogPost.bind(null, post.id)} className="mt-4 space-y-3" method="post">
                              <label className="space-y-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                                Title
                                <input
                                  className="w-full rounded-xl border border-slate-200 px-4 py-2 text-sm text-slate-700"
                                  defaultValue={post.title}
                                  name="title"
                                  required
                                  type="text"
                                />
                              </label>
                              <label className="space-y-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                                Content
                                <textarea
                                  className="min-h-[200px] w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 font-mono text-sm text-slate-700"
                                  defaultValue={post.rawContent}
                                  name="content"
                                  required
                                />
                              </label>
                              <button
                                className="rounded-full border border-ink px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-ink transition hover:bg-ink hover:text-white"
                                type="submit"
                              >
                                Save updates
                              </button>
                            </form>
                          </details>
                        </div>
                    </EditConsoleModal>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      ) : null}
    </section>
  );
}
