"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";

type HeroStat = {
  id: string;
  label: string;
  value?: number;
  valueText?: string;
  prefix?: string;
  suffix?: string;
  unit?: string;
  subline?: string;
};

type Role = {
  id: string;
  title: string;
  company: string;
  duration: string;
  domain: string;
  headline: string;
  impacts: string[];
};

type Highlight = {
  id: string;
  label: string;
  value: string;
  detail: string;
};

type SkillCluster = {
  id: string;
  title: string;
  skills: string;
  usage: string;
};

const heroStats: HeroStat[] = [
  {
    id: "years",
    label: "Production Engineering Experience",
    value: 3,
    suffix: "+",
    unit: "Years",
  },
  {
    id: "gtv",
    label: "Handled in Live Systems",
    value: 95,
    prefix: "₹",
    suffix: "L+",
    subline: "Monthly GTV",
  },
  {
    id: "domains",
    label: "Domains Shipped In",
    valueText: "Fintech + AI",
  },
  {
    id: "ownership",
    label: "APIs, Integrations, Reliability",
    valueText: "End to End Ownership",
  },
];

const roles: Role[] = [
  {
    id: "karbon",
    title: "SDE II",
    company: "Karbon Business",
    duration: "Oct 2024 – Present",
    domain: "AI Accounting, Fintech",
    headline: "Building AI driven accounting systems at scale",
    impacts: [
      "Led FinBox integration into Karbon’s AI Accountant to ingest complex bank statements (PDF, Excel, images).",
      "Designed core APIs for ATIS, enabling real time bi directional sync with Tally.",
      "Introduced idempotency, retries, and reconciliation jobs to guarantee exactly once updates.",
      "Built and owned the Tally AIA Connector (Windows app) for near real time accounting flows.",
      "Delivered the prepaid cards system end to end, reliably handling ₹95L monthly GTV.",
    ],
  },
  {
    id: "juspay-backend",
    title: "Backend Engineer",
    company: "Juspay",
    duration: "Sep 2022 – May 2024",
    domain: "Payments, Recon, Microservices",
    headline: "Scaling and stabilizing fintech microservices",
    impacts: [
      "Owned recon microservices and the surrounding system architecture.",
      "Led codebase refactoring to improve maintainability and long-term reliability.",
      "Built generic APIs for efficient data access across teams.",
      "Designed and maintained ETL workflows for merchant data pipelines.",
      "Partnered with product and infra teams to improve throughput under peak loads.",
    ],
  },
  {
    id: "juspay-intern",
    title: "Technical Product Analyst Intern",
    company: "Juspay",
    duration: "Feb 2022 – Aug 2022",
    domain: "Fintech Infrastructure",
    headline: "From intern to systems thinker",
    impacts: [
      "Designed a real time logging pipeline using Kafka.",
      "Built a Kibana-style analytics dashboard for live insights.",
      "Worked across data, backend, and presentation layers.",
      "Built early instincts for system design tradeoffs and production constraints.",
    ],
  },
];

const highlights: Highlight[] = [
  {
    id: "gtv",
    label: "₹95L/month",
    value: "Transaction volume handled",
    detail: "Across prepaid cards and live banking flows.",
  },
  {
    id: "formats",
    label: "Multiple data formats",
    value: "PDFs, Excel, images",
    detail: "Automated ingestion for bank statements.",
  },
  {
    id: "sync",
    label: "Real time sync",
    value: "Accounting systems (Tally)",
    detail: "Bi directional updates with reconciliation safety nets.",
  },
  {
    id: "ownership",
    label: "End to end ownership",
    value: "APIs → connectors → reconciliation",
    detail: "Full lifecycle responsibility.",
  },
  {
    id: "scale",
    label: "Fintech scale",
    value: "Juspay + Karbon",
    detail: "Shipping reliability for regulated systems.",
  },
];

const skillClusters: SkillCluster[] = [
  {
    id: "backend",
    title: "Backend & APIs",
    skills: "FastAPI, REST APIs, Idempotency, Retries, Reconciliation",
    usage: "Used across fintech and AI accounting systems.",
  },
  {
    id: "systems",
    title: "Systems & Reliability",
    skills: "Distributed Systems, Microservices, Event Driven Workflows",
    usage: "Applied in recon, ETL pipelines, and accounting sync.",
  },
  {
    id: "data",
    title: "Data & Storage",
    skills: "PostgreSQL, SQL, BigQuery, Clickhouse, Redis",
    usage: "Powering production analytics and financial workflows.",
  },
  {
    id: "cloud",
    title: "Cloud & Tooling",
    skills: "Docker, Jenkins, AWS, Azure",
    usage: "Supporting build, deploy, and operational reliability.",
  },
];

const CTA_TEXT = "View Case Studies →";

function useCountUp(target: number, duration = 1600) {
  const [value, setValue] = useState(0);
  const startRef = useRef<number | null>(null);

  useEffect(() => {
    let frame: number;

    const animate = (timestamp: number) => {
      if (startRef.current === null) {
        startRef.current = timestamp;
      }
      const progress = Math.min((timestamp - startRef.current) / duration, 1);
      const nextValue = Math.floor(progress * target);
      setValue(nextValue);
      if (progress < 1) {
        frame = requestAnimationFrame(animate);
      }
    };

    frame = requestAnimationFrame(animate);

    return () => {
      if (frame) {
        cancelAnimationFrame(frame);
      }
    };
  }, [duration, target]);

  return value;
}

function useInView<T extends HTMLElement>(options?: IntersectionObserverInit) {
  const ref = useRef<T | null>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsInView(true);
        observer.disconnect();
      }
    }, options);

    observer.observe(element);

    return () => observer.disconnect();
  }, [options]);

  return { ref, isInView };
}

function HeroStatCard({ stat }: { stat: HeroStat }) {
  const count = useCountUp(stat.value ?? 0, 1600);
  const displayValue = useMemo(() => {
    if (stat.value === undefined) {
      return stat.valueText ?? "";
    }
    return `${stat.prefix ?? ""}${count}${stat.suffix ?? ""}${stat.unit ? ` ${stat.unit}` : ""}`;
  }, [count, stat.prefix, stat.suffix, stat.unit, stat.value, stat.valueText]);

  return (
    <div className="rounded-2xl border border-white/70 bg-white/80 p-5 shadow-soft backdrop-blur">
      <div className="text-2xl font-semibold text-slate-900 sm:text-3xl">
        {displayValue}
      </div>
      {stat.subline ? <p className="text-sm text-slate-500">{stat.subline}</p> : null}
      <p className="mt-3 text-sm font-medium uppercase tracking-[0.2em] text-slate-400">
        {stat.label}
      </p>
    </div>
  );
}

function ImpactCard({ highlight }: { highlight: Highlight }) {
  const { ref, isInView } = useInView<HTMLDivElement>({ threshold: 0.3 });

  return (
    <div
      ref={ref}
      className={`rounded-2xl border border-white/70 bg-white/80 p-5 shadow-soft backdrop-blur transition duration-700 ease-out ${
        isInView ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
      }`}
    >
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">
        {highlight.label}
      </p>
      <p className="mt-3 text-lg font-semibold text-slate-900">{highlight.value}</p>
      <p className="mt-2 text-sm text-slate-500">{highlight.detail}</p>
    </div>
  );
}

export default function WorkPage() {
  return (
    <section className="space-y-12">
      <header className="space-y-4">
        <h1 className="text-3xl font-semibold text-slate-900">Impact Studio</h1>
        <p className="max-w-2xl text-slate-600">
          I’ve spent the last few years building and operating backend systems in fintech and AI
          products — from early design decisions to production reliability.
        </p>
        <p className="max-w-2xl text-slate-600">
          My work focuses on systems that need to be correct, scalable, and boring in production,
          even when the problems aren’t.
        </p>
      </header>

      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-slate-900">Impact Studio at a glance</h2>
          <span className="text-sm uppercase tracking-[0.25em] text-slate-400">Live metrics</span>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {heroStats.map((stat) => (
            <div key={stat.id} className="animate-[fadeUp_0.7s_ease-out]">
              <HeroStatCard stat={stat} />
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-xl font-semibold text-slate-900">Experience timeline</h2>
        <div className="relative space-y-6 border-l border-slate-200 pl-6">
          {roles.map((role) => (
            <details
              key={role.id}
              className="group rounded-2xl border border-white/70 bg-white/80 p-5 shadow-soft backdrop-blur"
            >
              <summary className="cursor-pointer list-none space-y-2">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">
                    {role.duration}
                  </span>
                  <span className="rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white">
                    {role.domain}
                  </span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">
                    {role.title} · {role.company}
                  </h3>
                  <p className="text-sm text-slate-600">{role.headline}</p>
                </div>
                <p className="text-sm font-medium text-slate-500 group-open:hidden">
                  View key impact →
                </p>
              </summary>
              <div className="mt-4 space-y-3 border-t border-slate-200 pt-4 text-sm text-slate-600">
                <p className="font-semibold uppercase tracking-[0.2em] text-slate-400">
                  Key impact
                </p>
                <ul className="list-disc space-y-2 pl-5">
                  {role.impacts.map((impact) => (
                    <li key={impact}>{impact}</li>
                  ))}
                </ul>
              </div>
            </details>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-xl font-semibold text-slate-900">Impact highlights</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {highlights.map((highlight) => (
            <ImpactCard key={highlight.id} highlight={highlight} />
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-xl font-semibold text-slate-900">Skills in practice</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {skillClusters.map((cluster) => (
            <div
              key={cluster.id}
              className="rounded-2xl border border-white/70 bg-white/80 p-5 shadow-soft backdrop-blur"
            >
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">
                {cluster.title}
              </p>
              <p className="mt-3 text-base font-semibold text-slate-900">{cluster.skills}</p>
              <p className="mt-2 text-sm text-slate-500">{cluster.usage}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-white/70 bg-white/80 p-6 shadow-soft backdrop-blur">
        <div className="space-y-4">
          <p className="text-lg font-semibold text-slate-900">
            Want to see how these systems were actually built?
          </p>
          <Link
            className="inline-flex items-center justify-center rounded-full bg-slate-900 px-5 py-2 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-slate-800"
            href="/case-studies"
          >
            {CTA_TEXT}
          </Link>
        </div>
      </section>
    </section>
  );
}
