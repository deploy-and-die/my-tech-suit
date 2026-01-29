import Link from "next/link";
import type { ReactNode } from "react";

type ContactAction = {
  href: string;
  label: string;
  isExternal?: boolean;
  variant?: "link" | "button";
};

type ContactCard = {
  title: string;
  description: string;
  mutedLine?: string;
  action?: ContactAction;
  icon: ReactNode;
};

const contactCards: ContactCard[] = [
  {
    title: "Live chat",
    description: "Reach me directly for quick questions or conversations.",
    action: { href: "mailto:zaidali753@gmail.com", label: "Email me" },
    icon: <ChatIcon />,
  },
  {
    title: "Start a discussion",
    description: "Have a deeper question or idea? Start a thread and let’s discuss it openly.",
    action: { href: "/forums", label: "Open forums", variant: "button" },
    icon: <ForumIcon />,
  },
  {
    title: "Travel with me (Trip Captain)",
    description:
      "I occasionally organize and lead small, relaxed trips exploring culture, food, and nature — mostly in and around South India.",
    mutedLine: "Slow travel. Local experiences. Good conversations.",
    icon: <CompassIcon />,
  },
  {
    title: "Call me directly",
    description: "Available during reasonable hours. If I miss it, I’ll call back.",
    action: { href: "tel:+919900713753", label: "🇮🇳 +91 99007 13753" },
    icon: <PhoneIcon />,
  },
];

export function ContactSection() {
  return (
    <section className="space-y-10 rounded-[32px] border border-accent/30 bg-white/80 p-8 shadow-soft backdrop-blur">
      <div className="space-y-4">
        <div className="inline-flex items-center gap-3 rounded-full bg-lavender px-4 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-ink">
          Send me a note
        </div>
        <div className="space-y-3">
          <h2 className="text-4xl font-semibold text-ink">Let’s talk. I’m listening.</h2>
          <p className="max-w-2xl text-base text-slate-600">
            Prefer a quick hello? Email me directly at {" "}
            <a className="font-semibold text-accent" href="mailto:zaidali753@gmail.com">
              zaidali753@gmail.com
            </a>
            .
          </p>
        </div>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        {contactCards.map((card) => (
          <ContactCard key={card.title} card={card} />
        ))}
      </div>
      <div className="rounded-2xl border border-dashed border-ink/20 bg-lavender/40 p-6 text-sm font-medium text-ink/80">
        Bring your idea, question, or curiosity — we’ll figure out something meaningful together.
      </div>
    </section>
  );
}

function ContactCard({ card }: { card: ContactCard }) {
  const { title, description, mutedLine, action, icon } = card;
  return (
    <div className="flex min-h-[230px] flex-col justify-between rounded-3xl border border-accent/10 bg-white p-6 shadow-sm transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-soft motion-reduce:transform-none motion-reduce:transition-none">
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-lavender/60 text-ink">
            {icon}
          </span>
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">{title}</p>
        </div>
        <p className="text-base text-slate-600">{description}</p>
        {mutedLine ? <p className="text-sm text-slate-400">{mutedLine}</p> : null}
      </div>
      {action ? <CardAction action={action} /> : null}
    </div>
  );
}

function CardAction({ action }: { action: ContactAction }) {
  const { href, label, isExternal, variant = "link" } = action;
  const linkClasses =
    "inline-flex items-center gap-2 text-sm font-semibold text-accent transition hover:text-accentDark";
  const buttonClasses =
    "inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-accentDark";
  const className = variant === "button" ? buttonClasses : linkClasses;

  if (href.startsWith("mailto:") || href.startsWith("tel:")) {
    return (
      <a className={className} href={href}>
        {label}
        <ArrowIcon />
      </a>
    );
  }

  if (isExternal) {
    return (
      <a className={className} href={href} rel="noreferrer" target="_blank">
        {label}
        <ArrowIcon />
      </a>
    );
  }

  return (
    <Link className={className} href={href}>
      {label}
      <ArrowIcon />
    </Link>
  );
}

function ChatIcon() {
  return (
    <svg aria-hidden="true" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
      <path d="M5 5h14a2 2 0 012 2v7a2 2 0 01-2 2H9l-4 4V7a2 2 0 012-2z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ForumIcon() {
  return (
    <svg aria-hidden="true" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
      <path
        d="M6 9h12M6 13h8M5 3h14a2 2 0 012 2v9a2 2 0 01-2 2h-6.5L7 22v-6H5a2 2 0 01-2-2V5a2 2 0 012-2z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CompassIcon() {
  return (
    <svg aria-hidden="true" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="9" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M14.5 9.5L12 14.5 9.5 12z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg aria-hidden="true" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
      <path
        d="M5 4h3l2 5-2 1c1 2.5 3.5 5 6 6l1-2 5 2v3a2 2 0 01-2 2h-.5C10.5 21 3 13.5 3 5.5 3 4.7 3.7 4 4.5 4z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
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
