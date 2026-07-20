"use client";

import { useEffect, useRef, useState } from "react";

const AUTO_ADVANCE_MS = 7000;

const skillGroups = [
  {
    number: "01",
    label: "Backend & APIs",
    title: "Backend foundations that stay understandable as the product grows.",
    description:
      "I design clear service boundaries, dependable API contracts, and implementation paths that make complex financial workflows easier to extend and operate.",
    tools: ["Python", "Django", "FastAPI", "Rust", "Actix", "REST APIs", "Swagger", "Postman"],
    proof: "Applied while leading the MDS API production revamp and service rewrite.",
  },
  {
    number: "02",
    label: "System Design",
    title: "Architecture shaped around correctness, change, and real production pressure.",
    description:
      "My system-design work covers distributed services, event-driven workflows, failure boundaries, secure identity, and rollout strategies that protect customers during change.",
    tools: ["Distributed systems", "Microservices", "Event-driven design", "OAuth 2.0", "SSO", "Feature flags", "Clean architecture"],
    proof: "Used across accounting workflows, reconciliation services, billing, and identity systems.",
  },
  {
    number: "03",
    label: "Data Systems",
    title: "Data paths built for accuracy, efficient access, and safe reconciliation.",
    description:
      "I work from schema and query behavior through ingestion, ETL, pagination, synchronization, and reconciliation—especially where financial correctness matters.",
    tools: ["PostgreSQL", "SQL", "Redis", "BigQuery", "ClickHouse", "ETL", "Cursor pagination", "Query optimization"],
    proof: "Built multi-format ingestion and bi-directional Tally synchronization for 1,000+ users.",
  },
  {
    number: "04",
    label: "Reliability & Platform",
    title: "Production is part of the design, not a handoff at the end.",
    description:
      "I build deployment, observability, recovery, and testing practices alongside the feature so teams can release confidently and diagnose failures quickly.",
    tools: ["Kafka", "Docker", "Jenkins", "CI/CD", "AWS", "Azure", "Kibana", "Monitoring", "Incident response"],
    proof: "Improved onboarding recovery by 95%, raised test coverage to 80%, and reduced failures by 50%.",
  },
  {
    number: "05",
    label: "AI Engineering",
    title: "AI-assisted development with engineering judgment kept firmly in the loop.",
    description:
      "I use modern AI tools to explore codebases, challenge implementation plans, accelerate debugging, generate tests, and improve documentation while retaining ownership of every production decision.",
    tools: ["Cursor", "OpenAI Codex", "Claude", "Prompt engineering", "AI pair programming", "Test generation", "Code review", "Rapid prototyping"],
    proof: "Used as an engineering accelerator across system-design, implementation, review, and production-readiness work.",
  },
];

export function SkillsShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [cycleKey, setCycleKey] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const showcaseRef = useRef(null);
  const active = skillGroups[activeIndex];

  useEffect(() => {
    const showcase = showcaseRef.current;
    if (!showcase) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.3 },
    );
    observer.observe(showcase);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!isVisible || isPaused || prefersReducedMotion) return undefined;

    const timer = window.setTimeout(() => {
      setActiveIndex((current) => (current + 1) % skillGroups.length);
      setCycleKey((current) => current + 1);
    }, AUTO_ADVANCE_MS);

    return () => window.clearTimeout(timer);
  }, [activeIndex, cycleKey, isPaused, isVisible]);

  const selectSkill = (index) => {
    setActiveIndex(index);
    setCycleKey((current) => current + 1);
  };

  const move = (direction) => {
    setActiveIndex((current) => (current + direction + skillGroups.length) % skillGroups.length);
    setCycleKey((current) => current + 1);
  };

  const handleKeyDown = (event, index) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      selectSkill((index + 1) % skillGroups.length);
    }
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      selectSkill((index - 1 + skillGroups.length) % skillGroups.length);
    }
  };

  return (
    <section
      className="capabilities-section"
      id="skills"
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setIsPaused(false);
      }}
      onFocusCapture={() => setIsPaused(true)}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      ref={showcaseRef}
    >
      <div className="capabilities-title">
        <p className="section-number light">04 / Skills showcase</p>
        <h2>Tools change.<br /><em>Judgment compounds.</em></h2>
        <p className="skills-intro">Select a discipline to see the tools, decisions, and production evidence behind it.</p>
      </div>

      <div className="skills-showcase">
        <div className="skill-tabs" role="tablist" aria-label="Engineering skill categories">
          {skillGroups.map((group, index) => (
            <button
              aria-controls="active-skill-panel"
              aria-selected={activeIndex === index}
              className={`skill-tab${activeIndex === index ? " is-active" : ""}`}
              id={`skill-tab-${index}`}
              key={group.label}
              onClick={() => selectSkill(index)}
              onKeyDown={(event) => handleKeyDown(event, index)}
              role="tab"
              tabIndex={activeIndex === index ? 0 : -1}
              type="button"
            >
              <span>{group.number}</span>
              <strong>{group.label}</strong>
            </button>
          ))}
        </div>

        <article
          aria-labelledby={`skill-tab-${activeIndex}`}
          className="skill-slide"
          id="active-skill-panel"
          key={active.label}
          role="tabpanel"
        >
          <div className="skill-slide-top">
            <span>{active.number} / 05</span>
            <small>Applied engineering · 7 sec read</small>
          </div>
          <h3>{active.title}</h3>
          <p>{active.description}</p>
          <div className="skill-tags" aria-label={`${active.label} tools`}>
            {active.tools.map((tool) => <span key={tool}>{tool}</span>)}
          </div>
          <div className="skill-proof"><span>Production proof</span><p>{active.proof}</p></div>
          <div className="skill-controls">
            <button aria-label="Previous skill category" onClick={() => move(-1)} type="button">←</button>
            <div
              aria-hidden="true"
              className={`skill-timer${isPaused || !isVisible ? " is-paused" : ""}`}
            >
              <span key={`${activeIndex}-${cycleKey}`} />
            </div>
            <button aria-label="Next skill category" onClick={() => move(1)} type="button">→</button>
          </div>
        </article>
      </div>
    </section>
  );
}
