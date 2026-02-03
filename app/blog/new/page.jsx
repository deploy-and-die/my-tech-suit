import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { CreateDraftForm } from "@/components/blog/CreateDraftForm";
import Link from "next/link";

export default async function NewBlogPage() {
  const session = await auth();
  if (!session?.user) {
    redirect("/blog");
  }

  return (
    <section className="space-y-8">
      <div className="flex items-start justify-between gap-6">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-400">Studio submission</p>
          <h1 className="mt-3 text-4xl font-semibold text-slate-900">Write your blog</h1>
          <p className="mt-3 max-w-2xl text-slate-600">
            Compose your long-form idea with Markdown. Use headings, bullets, callouts, and embed key metrics. Every draft goes through editorial review before it goes live.
          </p>
        </div>
        <Link className="text-sm font-semibold text-accentDark hover:text-ink" href="/blog">
          ← Back to blogs
        </Link>
      </div>
      <div className="rounded-3xl border border-white/70 bg-white p-8 shadow-soft">
        <CreateDraftForm />
      </div>
    </section>
  );
}
