"use client";

import { useEffect, useRef, useState } from "react";

export function EditConsoleModal({
  triggerLabel,
  title,
  subtitle,
  children,
}: {
  triggerLabel: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open || !contentRef.current) return;
    const handler = () => {
      // Let the server action submission finish before closing the modal.
      window.setTimeout(() => setOpen(false), 0);
    };
    const node = contentRef.current;
    node.addEventListener("submit", handler);
    return () => node.removeEventListener("submit", handler);
  }, [open]);

  return (
    <>
      <button
        className="rounded-full border border-slate-200 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 transition hover:border-accentDark hover:text-ink"
        onClick={() => setOpen(true)}
        type="button"
      >
        {triggerLabel}
      </button>
      {open ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 p-4">
          <div className="relative max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-3xl bg-white p-8 shadow-2xl">
            <button
              aria-label="Close editor"
              className="absolute right-4 top-4 rounded-full border border-slate-200 p-2 text-slate-500 transition hover:text-ink"
              onClick={() => setOpen(false)}
              type="button"
            >
              ×
            </button>
            <div className="space-y-3 pr-6" ref={contentRef}>
              <h3 className="text-2xl font-semibold text-slate-900">{title}</h3>
              {subtitle ? (
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">{subtitle}</p>
              ) : null}
              <div className="h-px bg-slate-100" />
              <div className="space-y-4">{children}</div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
