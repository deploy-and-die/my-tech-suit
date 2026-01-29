"use client";

import { useEffect, useState } from "react";
import type { FocusEvent } from "react";
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
  const [isInteracting, setIsInteracting] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const timer = window.setTimeout(() => setIsOpen(false), AUTO_HIDE_MS);
    return () => window.clearTimeout(timer);
  }, [isOpen]);

  useEffect(() => {
    if (!isExpanded || isInteracting) return;
    const timer = window.setTimeout(() => setIsExpanded(false), AUTO_HIDE_MS);
    return () => window.clearTimeout(timer);
  }, [isExpanded, isInteracting]);

  const handleInteractionStart = () => {
    setIsExpanded(true);
    setIsInteracting(true);
  };

  const handleInteractionEnd = () => {
    setIsInteracting(false);
  };

  const handleFocus = () => {
    setIsExpanded(true);
    setIsInteracting(true);
  };

  const handleBlur = (event: FocusEvent<HTMLElement>) => {
    const nextFocus = event.relatedTarget as Node | null;
    if (nextFocus && event.currentTarget.contains(nextFocus)) return;
    setIsInteracting(false);
  };

  const handleToggle = () => {
    setIsExpanded((previous) => {
      const next = !previous;
      if (!next) {
        setIsInteracting(false);
      }
      return next;
    });
  };

  return (
    <>
      <header className="flex w-full items-center justify-between border-b border-white/70 bg-white/80 px-6 py-4 text-ink lg:hidden">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Explore</p>
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
              <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Explore</p>
              <button
                className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500"
                onClick={() => setIsOpen(false)}
                type="button"
              >
                Close
              </button>
            </div>
            <div className="mt-8 space-y-8">
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
          isExpanded ? "w-72" : "w-[7.5rem]"
        }`}
        onMouseEnter={handleInteractionStart}
        onMouseLeave={handleInteractionEnd}
        onFocus={handleFocus}
        onBlur={handleBlur}
      >
        <div className="flex h-full flex-col">
          <div className="pb-8">
            <button
              aria-expanded={isExpanded}
              aria-label={isExpanded ? "Collapse navigation" : "Expand navigation"}
              className={`relative flex w-full items-center justify-center rounded-full border border-white/70 bg-white text-xs font-semibold uppercase tracking-[0.35em] text-ink shadow-soft transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
                isExpanded ? "py-5" : "py-4"
              }`}
              onClick={handleToggle}
              type="button"
            >
              <span
                className={`flex items-center gap-3 transition-opacity ${
                  isExpanded ? "opacity-100" : "opacity-0"
                }`}
              >
                <span className="text-[11px]">Explore</span>
                <svg
                  aria-hidden="true"
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path d="M14 7l-5 5 5 5" />
                  <path d="M20 7l-5 5 5 5" />
                </svg>
              </span>
              <span
                className={`absolute inset-0 flex items-center justify-center transition-opacity ${
                  isExpanded ? "opacity-0" : "opacity-100"
                }`}
                aria-hidden={isExpanded}
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-ink text-white">
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                  >
                    <path d="M10 7l5 5-5 5" />
                    <path d="M16 7l5 5-5 5" />
                  </svg>
                </span>
              </span>
            </button>
          </div>
          <div
            className={`flex-1 space-y-8 transition-opacity ${
              isExpanded ? "opacity-100" : "pointer-events-none opacity-0"
            }`}
          >
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
        </div>
      </aside>
    </>
  );
}
