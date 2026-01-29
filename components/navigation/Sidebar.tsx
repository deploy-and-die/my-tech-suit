"use client";

import { useState } from "react";
import Link from "next/link";

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
              <nav className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                  Primary
                </p>
                <ul className="space-y-1 text-sm">
                  {primaryLinks.map((link) => (
                    <li key={link.href}>
                      <Link
                        className="text-ink/80 hover:text-accent"
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
              <nav className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                  Don’t Look Here
                </p>
                <ul className="space-y-1 text-sm text-slate-400">
                  {secondaryLinks.map((link) => (
                    <li key={link.href}>
                      <Link
                        className="hover:text-accentLight"
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                      >
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
      <aside className="hidden w-72 border-r border-white/70 bg-lavender px-6 py-10 text-ink lg:block">
        <div className="space-y-8">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-slate-500">OriginStory</p>
            <p className="mt-3 text-lg font-semibold text-ink">
              I help ideas, products, and systems explode in impact — responsibly.
            </p>
          </div>
          <nav className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
              Primary
            </p>
            <ul className="space-y-1 text-sm">
              {primaryLinks.map((link) => (
                <li key={link.href}>
                  <Link className="text-ink/80 hover:text-accent" href={link.href}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <nav className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
              Don’t Look Here
            </p>
            <ul className="space-y-1 text-sm text-slate-400">
              {secondaryLinks.map((link) => (
                <li key={link.href}>
                  <Link className="hover:text-accentLight" href={link.href}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </aside>
    </>
  );
}
