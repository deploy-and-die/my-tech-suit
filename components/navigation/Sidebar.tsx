"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const AUTO_HIDE_MS = 10_000;

const primaryLinks = [
  { href: "/", label: "Home" },
  { href: "/work", label: "Work" },
  { href: "/case-studies", label: "Case Studies" },
  { href: "/side-projects", label: "Side Projects" },
  { href: "/blog", label: "Tech Blogs" },
  { href: "/contact", label: "Contact" },
  { href: "/forums", label: "Forums" },
];

const secondaryLinks = [
  { href: "/dont-look-here/fun-stuff", label: "Fun Stuff" },
  { href: "/dont-look-here/my-experiments", label: "My Experiments" },
  { href: "/dont-look-here/chaos-lab", label: "Chaos Lab" },
];

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);
  const [isPinned, setIsPinned] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const timer = window.setTimeout(() => setIsOpen(false), AUTO_HIDE_MS);
    return () => window.clearTimeout(timer);
  }, [isOpen]);

  useEffect(() => {
    if (!isExpanded || isPinned) return;
    const timer = window.setTimeout(() => setIsExpanded(false), AUTO_HIDE_MS);
    return () => window.clearTimeout(timer);
  }, [isExpanded, isPinned]);

  return (
    <>
      <header className="flex w-full items-center justify-between border-b border-white/70 bg-white/80 px-6 py-4 text-ink lg:hidden">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">OriginStory</p>
          <p className="text-sm font-semibold">Brand</p>
        </div>
        <button
          className="rounded-full border border-white/70 bg-lavender px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-ink"
          onClick={() => setIsOpen(true)}
          type="button"
        >
          Menu
        </button>
      </header>
      {isOpen ? (
        <div className="fixed inset-0 z-40 bg-ink/40 lg:hidden" onClick={() => setIsOpen(false)}>
          <aside
            className="h-full w-72 border-r border-white/70 bg-lavender px-6 py-10 text-ink shadow-soft"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <p className="text-sm uppercase tracking-[0.2em] text-slate-500">OriginStory</p>
              <button
                className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500"
                onClick={() => setIsOpen(false)}
                type="button"
              >
                Close
              </button>
            </div>
            <div className="mt-8 space-y-8">
              <div>
                <p className="mt-3 text-lg font-semibold text-ink">
                  I help ideas, products, and systems explode in impact — responsibly.
                </p>
              </div>
              <nav className="space-y-3">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                  Primary
                </p>
                <ul className="space-y-4 text-lg font-semibold">
                  {primaryLinks.map((link) => (
                    <li key={link.href}>
                      <Link
                        className="flex items-center gap-3 text-ink/80 transition hover:text-accent"
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                      >
                        <span className="h-2 w-2 rounded-full bg-accent/70" aria-hidden="true" />
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
              <nav className="space-y-3">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                  Don’t Look Here
                </p>
                <ul className="space-y-3 text-base text-slate-400">
                  {secondaryLinks.map((link) => (
                    <li key={link.href}>
                      <Link
                        className="flex items-center gap-3 transition hover:text-accentLight"
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                      >
                        <span className="h-2 w-2 rounded-full bg-accentLight/70" aria-hidden="true" />
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </aside>
        </div>
      ) : null}
      <aside
        className={`relative hidden border-r border-white/70 bg-lavender px-6 py-10 text-ink transition-all duration-300 lg:block ${
          isExpanded ? "w-72" : "w-20"
        }`}
        onMouseEnter={() => setIsExpanded(true)}
      >
        <div className={`space-y-8 ${isExpanded ? "opacity-100" : "opacity-0"} transition-opacity`}>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-sm uppercase tracking-[0.2em] text-slate-500">OriginStory</p>
              <button
                className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500"
                onClick={() => setIsPinned((prev) => !prev)}
                type="button"
              >
                {isPinned ? "Pinned" : "Auto-hide"}
              </button>
            </div>
            <p className="text-lg font-semibold text-ink">
              I help ideas, products, and systems explode in impact — responsibly.
            </p>
          </div>
          <nav className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
              Primary
            </p>
            <ul className="space-y-4 text-lg font-semibold">
              {primaryLinks.map((link) => (
                <li key={link.href}>
                  <Link className="flex items-center gap-3 text-ink/80 hover:text-accent" href={link.href}>
                    <span className="h-2 w-2 rounded-full bg-accent/70" aria-hidden="true" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <nav className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
              Don’t Look Here
            </p>
            <ul className="space-y-3 text-base text-slate-400">
              {secondaryLinks.map((link) => (
                <li key={link.href}>
                  <Link className="flex items-center gap-3 hover:text-accentLight" href={link.href}>
                    <span className="h-2 w-2 rounded-full bg-accentLight/70" aria-hidden="true" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        {!isExpanded ? (
          <div className="flex h-full flex-col items-center justify-between text-slate-400">
            <button
              className="rounded-full border border-white/70 bg-white/80 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-ink"
              onClick={() => setIsExpanded(true)}
              type="button"
            >
              Menu
            </button>
            <div className="space-y-6 pb-6">
              {primaryLinks.map((link) => (
                <Link
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white/70 text-xs font-semibold text-ink"
                  href={link.href}
                  key={link.href}
                >
                  {link.label.slice(0, 1)}
                </Link>
              ))}
            </div>
          </div>
        ) : null}
      </aside>
    </>
  );
}
