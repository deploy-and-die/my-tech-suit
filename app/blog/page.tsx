import { AuthPrompt } from "@/components/auth/AuthPrompt";
import {
  archiveBlogPost,
  createBlogDraft,
  publishBlogPost,
  requestBlogReview,
  updateBlogPost,
} from "@/app/actions/blog";
import { auth } from "@/lib/auth";
import { isAdminUser } from "@/lib/permissions";
import { prisma } from "@/lib/prisma";

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
    ? await prisma.blogPost.findMany({
        include: { author: true },
        orderBy: { updatedAt: "desc" },
      })
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
          <form action={createBlogDraft} className="mt-6 space-y-4">
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
                className="min-h-[180px] w-full rounded-xl border border-slate-200 px-4 py-2 text-slate-700 focus:border-accentDark focus:outline-none focus:ring-2 focus:ring-accentLight/50"
                name="content"
                placeholder="Share your idea with a calm, editorial tone."
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
          <h2 className="text-2xl font-semibold text-slate-900">Published essays</h2>
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
            Editorial voice
          </span>
        </div>
        {publishedPosts.length === 0 ? (
          <div className="rounded-2xl border border-slate-100 bg-slate-50 p-6 text-sm text-slate-500">
            No posts published yet. Drafts are reviewed on a rolling basis.
          </div>
        ) : (
          <div className="space-y-6">
            {publishedPosts.map((post) => (
              <article
                className="rounded-2xl border border-slate-100 bg-white p-6 shadow-soft"
                key={post.id}
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h3 className="text-xl font-semibold text-slate-900">{post.title}</h3>
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                      {formatDate(post.createdAt)}
                    </p>
                  </div>
                  <span className="rounded-full bg-lavender px-3 py-1 text-xs font-semibold text-ink">
                    Published
                  </span>
                </div>
                <p className="mt-4 whitespace-pre-wrap text-sm text-slate-600">
                  {post.content}
                </p>
                <p className="mt-4 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                  Curated by {post.author.name ?? post.author.email}
                </p>
              </article>
            ))}
          </div>
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
                  <details className="mt-4 rounded-xl border border-slate-100 bg-slate-50 p-4">
                    <summary className="cursor-pointer text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                      Edit draft
                    </summary>
                    <form action={updateBlogPost.bind(null, post.id)} className="mt-4 space-y-3">
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
                          className="min-h-[140px] w-full rounded-xl border border-slate-200 px-4 py-2 text-sm text-slate-700"
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
                  </details>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {!post.reviewRequestedAt ? (
                      <form action={requestBlogReview.bind(null, post.id)}>
                        <button
                          className="rounded-full border border-slate-200 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 transition hover:border-accentDark hover:text-ink"
                          type="submit"
                        >
                          Submit for review
                        </button>
                      </form>
                    ) : null}
                    <form action={archiveBlogPost.bind(null, post.id)}>
                      <button
                        className="rounded-full border border-slate-200 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 transition hover:border-slate-400 hover:text-slate-700"
                        type="submit"
                      >
                        Delete draft
                      </button>
                    </form>
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
            <div className="space-y-4">
              {adminPosts.map((post) => {
                const canPublish = post.status === "DRAFT" && post.reviewRequestedAt;
                const canArchive = post.status !== "ARCHIVED";
                return (
                  <div
                    className="rounded-2xl border border-slate-100 bg-white p-6 shadow-soft"
                    key={post.id}
                  >
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                          {post.author.name ?? post.author.email}
                        </p>
                        <h3 className="text-lg font-semibold text-slate-900">{post.title}</h3>
                        <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                          Updated {formatDate(post.updatedAt)}
                        </p>
                        <p className="mt-1 text-xs text-slate-500">
                          {post.reviewRequestedAt
                            ? `Review requested ${formatDate(post.reviewRequestedAt)}`
                            : "Waiting for review request."}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-500">
                          {statusLabels[post.status]}
                        </span>
                        <div className="flex items-center gap-1">
                          {canPublish ? (
                            <form action={publishBlogPost.bind(null, post.id)}>
                              <button
                                className="rounded-full border border-slate-200 px-2 py-1 text-xs text-slate-400 transition hover:border-accentDark hover:text-ink"
                                title="Approve and publish"
                                type="submit"
                              >
                                ⬆︎
                                <span className="sr-only">Approve and publish</span>
                              </button>
                            </form>
                          ) : null}
                          <form action={archiveBlogPost.bind(null, post.id)}>
                            <button
                              aria-disabled={!canArchive}
                              className="rounded-full border border-slate-200 px-2 py-1 text-xs text-slate-400 transition hover:border-slate-400 hover:text-slate-600 disabled:cursor-not-allowed disabled:opacity-60"
                              disabled={!canArchive}
                              title={canArchive ? "Archive" : "Archived"}
                              type="submit"
                            >
                              🗄
                              <span className="sr-only">Archive</span>
                            </button>
                          </form>
                        </div>
                      </div>
                    </div>
                    <p className="mt-3 whitespace-pre-wrap text-sm text-slate-600">
                      {post.content}
                    </p>
                    <details className="mt-4 rounded-xl border border-slate-100 bg-slate-50 p-4">
                      <summary className="cursor-pointer text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                        Edit post
                      </summary>
                      <form action={updateBlogPost.bind(null, post.id)} className="mt-4 space-y-3">
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
                            className="min-h-[140px] w-full rounded-xl border border-slate-200 px-4 py-2 text-sm text-slate-700"
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
                    </details>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      ) : null}
    </section>
  );
}
