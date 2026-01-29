"use client";

import { useEffect, useState } from "react";
import type { FocusEvent } from "react";
import Link from "next/link";

const AUTO_HIDE_MS = 10_000;

const primaryLinks = [
  { href: "/", label: "Home", icon: <HomeIcon /> },
  { href: "/work", label: "Work", icon: <WorkIcon /> },
  { href: "/case-studies", label: "Case Studies", icon: <CaseIcon /> },
  { href: "/side-projects", label: "Side Projects", icon: <SparkIcon /> },
  { href: "/blog", label: "Tech Blogs", icon: <BookIcon /> },
  { href: "/contact", label: "Contact", icon: <MailIcon /> },
  { href: "/forums", label: "Forums", icon: <ChatBubbleIcon /> },
];

const secondaryLinks = [
  { href: "/dont-look-here/fun-stuff", label: "Fun Stuff", icon: <StarIcon /> },
  { href: "/dont-look-here/my-experiments", label: "My Experiments", icon: <LabIcon /> },
  { href: "/dont-look-here/chaos-lab", label: "Chaos Lab", icon: <ChaosIcon /> },
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
                        <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-white/80 text-accent">
                          {link.icon}
                        </span>
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
                        <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-white/60 text-accentLight">
                          {link.icon}
                        </span>
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
                      <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-white/80 text-accent">
                        {link.icon}
                      </span>
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
                      <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-white/70 text-accentLight">
                        {link.icon}
                      </span>
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

function HomeIcon() {
  return (
    <svg aria-hidden="true" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.7} viewBox="0 0 24 24">
      <path d="M4 11l8-6 8 6v8a2 2 0 01-2 2h-4v-5H10v5H6a2 2 0 01-2-2z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function WorkIcon() {
  return (
    <svg aria-hidden="true" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.7} viewBox="0 0 24 24">
      <path d="M4 7h16a1 1 0 011 1v11H3V8a1 1 0 011-1z" />
      <path d="M9 7V5h6v2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CaseIcon() {
  return (
    <svg aria-hidden="true" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.7} viewBox="0 0 24 24">
      <rect height="12" width="16" x="4" y="6" rx="2" />
      <path d="M4 11h16" strokeLinecap="round" />
    </svg>
  );
}

function SparkIcon() {
  return (
    <svg aria-hidden="true" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.7} viewBox="0 0 24 24">
      <path d="M12 3l2 5 5 2-5 2-2 5-2-5-5-2 5-2z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function BookIcon() {
  return (
    <svg aria-hidden="true" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.7} viewBox="0 0 24 24">
      <path d="M4 5h7a2 2 0 012 2v12H6a2 2 0 01-2-2z" />
      <path d="M20 5h-7a2 2 0 00-2 2v12h7a2 2 0 002-2z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg aria-hidden="true" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.7} viewBox="0 0 24 24">
      <rect height="14" width="18" x="3" y="5" rx="2" />
      <path d="M3 8l9 5 9-5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChatBubbleIcon() {
  return (
    <svg aria-hidden="true" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.7} viewBox="0 0 24 24">
      <path d="M5 5h14a2 2 0 012 2v7a2 2 0 01-2 2H9l-4 4V7a2 2 0 012-2z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function StarIcon() {
  return (
    <svg aria-hidden="true" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.7} viewBox="0 0 24 24">
      <path d="M12 3l2.6 5.6L21 10.5l-4.5 4L17.5 21 12 18l-5.5 3 1-6.5L3 10.5l6.4-1.9z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function LabIcon() {
  return (
    <svg aria-hidden="true" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.7} viewBox="0 0 24 24">
      <path d="M9 3v5l-5 9a2 2 0 001.7 3h12.6a2 2 0 001.7-3l-5-9V3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChaosIcon() {
  return (
    <svg aria-hidden="true" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.7} viewBox="0 0 24 24">
      <path d="M4 12h16" strokeLinecap="round" />
      <path d="M12 4v16" strokeLinecap="round" />
      <path d="M5 5l14 14" strokeLinecap="round" />
    </svg>
  );
}
