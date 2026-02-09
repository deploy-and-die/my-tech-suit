"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";

const heroStats = [
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

const roles = [
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

const highlights = [
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

const skillClusters = [
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

const CTA_TEXT = "Case Studies (coming soon)";

function useCountUp(target, duration = 1600) {
  const [value, setValue] = useState(0);
  const startRef = useRef(null);

  useEffect(() => {
    let frame;

    const animate = (timestamp) => {
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

function useInView(options) {
  const ref = useRef(null);
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

function HeroStatCard({ stat }) {
  const count = useCountUp(stat.value ?? 0, 1600);
  const displayValue = useMemo(() => {
    if (stat.value === undefined) {
      return stat.valueText ?? "";
    }
    return `${stat.prefix ?? ""}${count}${stat.suffix ?? ""}${stat.unit ? ` ${stat.unit}` : ""}`;
  }, [count, stat.prefix, stat.suffix, stat.unit, stat.value, stat.valueText]);

  return (
    <div className="group relative h-full overflow-hidden rounded-2xl border border-white/70 bg-white/85 p-6 shadow-soft backdrop-blur transition duration-300 hover:-translate-y-1 hover:shadow-lg motion-reduce:transform-none">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#f6f2ff]/60 via-transparent to-[#dce8ff]/60 opacity-0 transition duration-300 group-hover:opacity-100" />
      <div className="relative text-2xl font-semibold leading-tight text-slate-900 sm:text-3xl">
        {displayValue}
      </div>
      {stat.subline ? <p className="relative text-sm text-slate-500">{stat.subline}</p> : null}
      <p className="relative mt-3 text-sm font-medium uppercase tracking-[0.2em] text-slate-400">
        {stat.label}
      </p>
    </div>
  );
}

function ImpactCard({ highlight }) {
  const { ref, isInView } = useInView({ threshold: 0.3 });

  return (
    <div
      ref={ref}
      className={`rounded-2xl border border-white/70 bg-white/85 p-6 shadow-soft backdrop-blur transition duration-700 ease-out ${
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
    <section className="relative mx-auto space-y-10 overflow-hidden rounded-[32px] border border-white/70 bg-white/30 p-6 shadow-soft backdrop-blur sm:space-y-12 sm:p-8 lg:space-y-14 lg:p-10">
      <div className="pointer-events-none absolute -right-20 -top-16 h-48 w-48 rounded-full bg-[#dbc9ff]/60 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-16 h-52 w-52 rounded-full bg-[#cde1ff]/60 blur-3xl" />
      <header className="space-y-3">
        <h1 className="text-3xl font-semibold text-slate-900">Impact Studio</h1>
        <p className="max-w-2xl text-slate-600">
          I’ve spent the last few years building and operating backend systems in fintech and AI
          products from early design decisions to production reliability.
        </p>
        <p className="max-w-2xl text-slate-600">
          My work focuses on systems that need to be correct, scalable, and boring in production,
          even when the problems aren’t.
        </p>
      </header>

      <section className="relative space-y-5 sm:space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-slate-900">Impact Studio at a glance</h2>
          <span className="text-sm uppercase tracking-[0.25em] text-slate-400">Live metrics</span>
        </div>
        <div className="grid gap-5 md:grid-cols-2 lg:gap-6">
          {heroStats.map((stat, index) => (
            <div
              key={stat.id}
              className="animate-[fadeUp_0.7s_ease-out]"
              style={{ animationDelay: `${index * 120}ms`, animationFillMode: "backwards" }}
            >
              <HeroStatCard stat={stat} />
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-5 sm:space-y-6">
        <h2 className="text-xl font-semibold text-slate-900">Experience timeline</h2>
        <div className="relative space-y-5 border-l border-slate-200/80 pl-6 sm:space-y-6">
          {roles.map((role) => (
            <details
              key={role.id}
              className="group relative rounded-2xl border border-white/70 bg-white/85 p-5 shadow-soft backdrop-blur transition duration-300 hover:border-slate-200"
            >
              <span className="absolute -left-[34px] top-8 h-3.5 w-3.5 rounded-full border-2 border-white bg-slate-500 shadow" />
              <summary className="cursor-pointer list-none space-y-2 marker:content-none">
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
                <p className="hidden text-sm font-medium text-violet-600 group-open:block">
                  Collapse details ↑
                </p>
              </summary>
              <div className="mt-4 space-y-3 border-t border-slate-200 pt-4 text-sm text-slate-600 group-open:animate-[fadeUp_0.35s_ease-out]">
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

      <section className="space-y-5 sm:space-y-6">
        <h2 className="text-xl font-semibold text-slate-900">Impact highlights</h2>
        <div className="grid gap-5 md:grid-cols-2 lg:gap-6">
          {highlights.map((highlight, index) => (
            <div
              key={highlight.id}
              style={{ transitionDelay: `${index * 80}ms` }}
              className="transition-all duration-300"
            >
              <ImpactCard highlight={highlight} />
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-5 sm:space-y-6">
        <h2 className="text-xl font-semibold text-slate-900">Skills in practice</h2>
        <div className="grid gap-5 md:grid-cols-2 lg:gap-6">
          {skillClusters.map((cluster) => (
            <div
              key={cluster.id}
              className="rounded-2xl border border-white/70 bg-white/85 p-6 shadow-soft backdrop-blur transition duration-300 hover:-translate-y-1 hover:shadow-lg motion-reduce:transform-none"
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

      <section className="rounded-2xl border border-white/70 bg-white/80 p-6 shadow-soft backdrop-blur sm:p-7">
        <div className="space-y-4">
          <p className="text-lg font-semibold text-slate-900">
            Want to see how these systems were actually built?
          </p>
          <Link
            aria-disabled
            className="inline-flex cursor-not-allowed items-center justify-center rounded-full bg-slate-400/70 px-5 py-2 text-sm font-semibold text-white"
            href="/case-studies"
            onClick={(event) => event.preventDefault()}
            tabIndex={-1}
          >
            {CTA_TEXT}
          </Link>
        </div>
      </section>
    </section>
  );
}
