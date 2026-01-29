import Link from "next/link";

type SocialCard = {
  title: string;
  description: string;
  href: string;
  icon: JSX.Element;
};

const socialCards: SocialCard[] = [
  {
    title: "Professional updates",
    description:
      "Work, career milestones, and conversations around software, systems, and growth.",
    href: "https://www.linkedin.com/in/zaid-ali-b409501a4/",
    icon: <LinkedInIcon />,
  },
  {
    title: "Long-form writing",
    description:
      "Thoughts on software engineering, lessons learned, and ideas worth thinking through slowly.",
    href: "https://medium.com/@zaidali753",
    icon: <PenIcon />,
  },
  {
    title: "Life & travel",
    description: "Travel, moments, and the human side of building — mostly through visuals.",
    href: "https://www.instagram.com/step_up_zen/",
    icon: <CameraIcon />,
  },
];

export function SocialSection() {
  return (
    <section className="space-y-8 rounded-[32px] border border-white/50 bg-lavender/60 p-8">
      <div className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-500">Community &amp; Writing</p>
        <p className="max-w-2xl text-sm text-slate-600">
          Where I share thoughts, progress, and pieces of my journey — building, learning, and exploring.
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {socialCards.map((card) => (
          <article
            key={card.title}
            className="flex flex-col gap-4 rounded-3xl border border-white/70 bg-white/90 p-6 shadow-sm transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-soft motion-reduce:transform-none motion-reduce:transition-none"
          >
            <div className="flex items-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-lavender/60 text-ink">
                {card.icon}
              </span>
              <h3 className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">{card.title}</h3>
            </div>
            <p className="flex-1 text-base text-slate-600">{card.description}</p>
            <Link
              className="inline-flex items-center gap-2 text-sm font-semibold text-accent transition hover:text-accentDark"
              href={card.href}
              rel="noreferrer"
              target="_blank"
            >
              Visit
              <ArrowIcon />
            </Link>
          </article>
        ))}
      </div>
      <p className="text-center text-xs uppercase tracking-[0.3em] text-slate-500">
        Different platforms, different sides of the same journey.
      </p>
    </section>
  );
}

function LinkedInIcon() {
  return (
    <svg aria-hidden="true" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
      <path d="M6 9h3v9H6zM15 11a3 3 0 00-3 3v4h-3v-9h3v2a3.5 3.5 0 013-2c2 0 3 1.5 3 3.5V18h-3v-4a1 1 0 00-1-1z" />
      <circle cx="7.5" cy="6" r="1.5" />
    </svg>
  );
}

function PenIcon() {
  return (
    <svg aria-hidden="true" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
      <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25z" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M14.06 6.19l3.75 3.75 1.69-1.69a2.65 2.65 0 000-3.75 2.65 2.65 0 00-3.75 0z" />
    </svg>
  );
}

function CameraIcon() {
  return (
    <svg aria-hidden="true" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
      <path
        d="M4 7h3l2-3h6l2 3h3a2 2 0 012 2v9a2 2 0 01-2 2H4a2 2 0 01-2-2V9a2 2 0 012-2z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="13" r="3" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg aria-hidden="true" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
      <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

