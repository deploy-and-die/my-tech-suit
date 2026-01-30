import { AuthPrompt } from "@/components/auth/AuthPrompt";
import { PublishedPostsList } from "@/components/blog/PublishedPostsList";
import { EditConsoleModal } from "@/components/blog/EditConsoleModal";
import {
  archiveBlogPost,
  deleteBlogPost,
  createBlogDraft,
  publishBlogPost,
  requestBlogReview,
  updateBlogPost,
  unarchiveBlogPost,
} from "@/app/actions/blog";
import { auth } from "@/lib/auth";
import { isAdminUser } from "@/lib/permissions";
import { prisma } from "@/lib/prisma";
import { formatBlogContent } from "@/lib/blogFormatter";
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

export default async function BlogPage() {
  const session = await auth();
  const isAdmin = isAdminUser(session?.user);
  const userId = session?.user?.id;

  const publishedPosts = await prisma.blogPost.findMany({
    where: { status: "PUBLISHED" },
    include: { author: true },
    orderBy: { createdAt: "desc" },
  });

  const orderedPublishedPosts = await Promise.all(
    publishedPosts
      .slice()
      .sort((a, b) => {
        const aOwn = a.authorId === userId;
        const bOwn = b.authorId === userId;
        if (aOwn && !bOwn) return -1;
        if (!aOwn && bOwn) return 1;
        return b.createdAt.getTime() - a.createdAt.getTime();
      })
      .map(async (post) => ({
        id: post.id,
        title: post.title,
        rawContent: post.content,
        formattedContent: await formatBlogContent(post.content),
        createdAt: post.createdAt.toISOString(),
        authorName: post.author.name,
        authorEmail: post.author.email,
        isOwn: post.authorId === userId,
      }))
  );

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
          updatedAt: post.updatedAt,
          reviewRequestedAt: post.reviewRequestedAt,
          formattedContent: await formatBlogContent(post.content),
          rawContent: post.content,
        }))
      )
    : [];

  return (
    <section className="space-y-8">
      <div className="space-y-3">
        <h1 className="text-3xl font-semibold text-slate-900">Tech Blogs</h1>
        <p className="max-w-2xl text-slate-600">
          A curated stream of technical notes, design decisions, and lessons learned. The
          community can draft ideas, and publishing stays editorially controlled.
        </p>
      </div>

      {session?.user ? (
        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-soft">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                Community drafts
              </p>
              <h2 className="text-2xl font-semibold text-slate-900">
                Have something to write? Submit a draft.
              </h2>
            </div>
            <span className="rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-500">
              Editorial review required
            </span>
          </div>
          <form action={createBlogDraft} className="mt-6 space-y-4" method="post">
            <label className="space-y-2 text-sm text-slate-600">
              Title
              <input
                className="w-full rounded-xl border border-slate-200 px-4 py-2 text-slate-700 focus:border-accentDark focus:outline-none focus:ring-2 focus:ring-accentLight/50"
                name="title"
                placeholder="Draft headline"
                required
                type="text"
              />
            </label>
            <label className="space-y-2 text-sm text-slate-600">
              Content (Markdown)
              <textarea
                className="min-h-[200px] w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 font-mono text-slate-700 focus:border-accentDark focus:outline-none focus:ring-2 focus:ring-accentLight/50"
                name="content"
                placeholder="Share your idea with Markdown — headings, bullets, callouts all welcome."
                required
              />
            </label>
            <div className="flex flex-wrap gap-3">
              <button
                className="rounded-full bg-ink px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-ink/90"
                type="submit"
              >
                Save draft
              </button>
              <p className="text-xs text-slate-400">
                Drafts stay private until an admin publishes them.
              </p>
            </div>
          </form>
        </div>
      ) : (
        <AuthPrompt
          actionLabel="Write a draft"
          context="Sign in to share a long-form idea. We review every submission before publishing."
        />
      )}

      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-2xl font-semibold text-slate-900">Published Blogs</h2>
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
            Editorial voice
          </span>
        </div>
        {orderedPublishedPosts.length === 0 ? (
          <div className="rounded-2xl border border-slate-100 bg-slate-50 p-6 text-sm text-slate-500">
            No posts published yet. Drafts are reviewed on a rolling basis.
          </div>
        ) : (
          <PublishedPostsList posts={orderedPublishedPosts} />
        )}
      </div>

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
                const canPublish = post.status === "DRAFT" && !!post.reviewRequestedAt;
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
