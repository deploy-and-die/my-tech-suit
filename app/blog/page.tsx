import { AuthPrompt } from "@/components/auth/AuthPrompt";

export default function BlogPage() {
  return (
    <section className="space-y-6">
      <h1 className="text-3xl font-semibold text-slate-900">Tech Blogs</h1>
      <p className="max-w-2xl text-slate-600">
        Technical notes, design decisions, and lessons learned. Comments require
        authentication.
      </p>
      <AuthPrompt
        actionLabel="Comment"
        context="Drop a thoughtful response when you’re ready. Browsing stays open to everyone."
      />
    </section>
  );
}
