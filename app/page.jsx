import { ProfileModal } from "@/components/portfolio/ProfileModal";

const releases = [
  {
    number: "01",
    title: "Multi-user workflows",
    description:
      "Shipped collaborative accounting flows with clear access boundaries, ownership, and safe concurrent usage across customer teams.",
    tag: "Collaboration",
  },
  {
    number: "02",
    title: "Journal Voucher flow",
    description:
      "Delivered a core accounting workflow that turned complex posting rules into a dependable, reviewable product experience.",
    tag: "Accounting core",
  },
  {
    number: "03",
    title: "Billing module",
    description:
      "Built the foundation for billing operations with correctness, maintainability, and the realities of financial workflows in mind.",
    tag: "Revenue systems",
  },
  {
    number: "04",
    title: "SSO + OAuth",
    description:
      "Implemented secure, low-friction authentication and identity flows designed for an enterprise-ready product surface.",
    tag: "Identity",
  },
];

const experience = [
  {
    period: "Oct 2024 — Present",
    role: "SDE II",
    company: "Karbon Business",
    domain: "AI Accounting · Fintech",
    summary:
      "Owning critical product and platform work across AI-led accounting, financial integrations, and production reliability.",
    bullets: [
      "Took engineering ownership of a complete product revamp—raising the bar for durability, availability, maintainability, and release quality.",
      "Released multi-user workflows, Journal Voucher flows, the Billing module, and SSO + OAuth capabilities across the product.",
      "Automated PDF, Excel, and image bank-statement ingestion—cutting manual effort 70%, reaching 98% accuracy, and improving onboarding 40%.",
      "Built real-time, bi-directional Tally sync with idempotency, retries, and reconciliation; the connector drove 3× adoption across 500+ users.",
      "Migrated 50 GB+ of production data without service interruption and delivered prepaid-card flows handling ₹95L+ monthly GTV.",
      "Improved onboarding incident recovery by 95%, raised test coverage to 80%, and reduced service failures by 50%.",
    ],
  },
  {
    period: "Sep 2022 — May 2024",
    role: "Backend Engineer",
    company: "Juspay",
    domain: "Payments · Reconciliation",
    summary:
      "Built and stabilized backend systems where correctness, throughput, and operational clarity were non-negotiable.",
    bullets: [
      "Owned reconciliation microservices and the surrounding system architecture.",
      "Led codebase refactoring that improved maintainability and engineering efficiency by 40%.",
      "Built reusable data-access APIs and ETL workflows for merchant pipelines processing millions of daily transactions.",
      "Reduced integration latency by 30% through API architecture and cross-functional delivery improvements.",
      "Automated delivery with Docker and Jenkins, accelerating releases 50% while keeping downtime below 1%.",
    ],
  },
  {
    period: "Feb 2022 — Aug 2022",
    role: "Technical Product Analyst Intern",
    company: "Juspay",
    domain: "Fintech Infrastructure",
    summary:
      "Started at the intersection of product, data, and backend engineering—and learned to treat operability as a product feature.",
    bullets: [
      "Designed a real-time logging pipeline using Kafka.",
      "Built a Kibana-style analytics dashboard for live operational insight.",
      "Used customer feedback to accelerate product iteration by 25%.",
      "Improved data-collection accuracy to 95% for high-stakes fintech decisions.",
    ],
  },
];

const capabilities = [
  ["Languages & services", "Python · Rust · Actix · Django · FastAPI · REST"],
  ["Architecture", "Clean architecture · Distributed systems · Microservices · Event-driven design"],
  ["Reliability & security", "High availability · Scalability · Idempotency · Retries · Reconciliation · OAuth 2.0"],
  ["Data & pipelines", "PostgreSQL · SQL · Redis · BigQuery · ClickHouse · ETL"],
  ["Cloud & delivery", "Kafka · Docker · Jenkins · CI/CD · AWS · Azure"],
  ["Observability & leadership", "Kibana · Logging · Monitoring · Incident response · Code reviews · Technical leadership"],
];

const scaleMetrics = [
  ["70%", "less manual effort", "Automated multi-format bank-statement ingestion."],
  ["98%", "parsing accuracy", "Improved confidence in AI accounting onboarding."],
  ["3×", "user adoption", "Tally connector supporting 500+ active users."],
  ["50 GB+", "data migrated", "Moved production data without service interruption."],
  ["95%", "faster recovery", "Restored critical onboarding services under pressure."],
  ["Millions", "transactions daily", "Backend services for high-traffic payment systems."],
];

export default function HomePage() {
  return (
    <main>
      <nav className="site-nav" aria-label="Main navigation">
        <a className="wordmark" href="#top" aria-label="Zaid Ali, back to top">
          ZA<span>/</span>
        </a>
        <div className="nav-links">
          <a href="#work">Work</a>
          <a href="#experience">Experience</a>
          <a href="#writing">Writing</a>
        </div>
        <div className="nav-actions">
          <ProfileModal />
          <a className="nav-cta" href="mailto:zaidali753@gmail.com">
            Let’s talk <span aria-hidden="true">↗</span>
          </a>
        </div>
      </nav>

      <section className="hero" id="top">
        <div className="hero-grid" aria-hidden="true" />
        <div className="hero-copy reveal">
          <p className="eyebrow"><span /> Backend Engineer · Fintech &amp; AI</p>
          <h1>
            <em>Backend engineer</em> for financial systems that stay correct when the pressure arrives.
          </h1>
          <p className="hero-intro">
            I’m Zaid Ali—a backend engineer with 4+ years of experience turning complex
            accounting and payment workflows into durable, production-ready products.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="#work">Explore my impact <span>↓</span></a>
            <a className="button button-secondary" href="/Syed_Zaid_Ali_Resume.pdf?v=20260714-2" target="_blank" rel="noreferrer">View résumé <span>↗</span></a>
          </div>
          <div className="profile-links" aria-label="Professional profiles">
            <span>Find me online</span>
            <a href="https://www.linkedin.com/in/zaid-ali-b409501a4/" target="_blank" rel="noreferrer">LinkedIn ↗</a>
            <a href="https://github.com/compile-and-cry" target="_blank" rel="noreferrer">GitHub ↗</a>
            <a href="https://medium.com/@zaidali753" target="_blank" rel="noreferrer">Medium ↗</a>
          </div>
        </div>
        <div className="hero-proof reveal delay-1">
          <div className="portrait-shell">
            <img
              alt="Zaid Ali, Backend Engineer"
              decoding="async"
              fetchPriority="high"
              src="/images/zaid-backend-engineer.png"
            />
            <div><span>Zaid Ali</span><strong>Backend Engineer</strong></div>
          </div>
          <p className="proof-label">Production proof, not buzzwords</p>
          <div className="proof-stat featured">
            <strong>4<sup>+</sup></strong>
            <span>years building<br />production systems</span>
          </div>
          <div className="proof-row">
            <div className="proof-stat"><strong>₹95L<sup>+</sup></strong><span>monthly GTV handled</span></div>
            <div className="proof-stat"><strong>Led</strong><span>production revamp &amp; service rewrite</span></div>
          </div>
          <div className="availability"><span /> Open to senior engineering conversations</div>
        </div>
      </section>

      <section className="marquee" aria-label="Areas of expertise">
        <div>
          <span>Distributed systems</span><i>◆</i><span>Fintech</span><i>◆</i><span>AI accounting</span><i>◆</i><span>Product ownership</span><i>◆</i><span>Production reliability</span>
        </div>
      </section>

      <section className="section work-section" id="work">
        <div className="section-heading">
          <p className="section-number">01 / Selected impact</p>
          <h2>From feature delivery to<br /><em>engineering ownership.</em></h2>
          <p>I work across the full lifecycle: shape the system, ship the workflow, observe it under load, and strengthen what production exposes.</p>
        </div>

        <article className="revamp-card">
          <div className="revamp-copy">
            <p className="card-kicker">Engineering-led product revamp</p>
            <h3>Raised the product’s operating standard—not just its feature count.</h3>
            <p>
              Took ownership of a complete product revamp at the engineering level, evolving the
              architecture and delivery practices behind a growing AI accounting platform. The work
              centered on durability, availability, safe change, and a codebase teams could extend with confidence.
            </p>
            <div className="ownership-list">
              <span>Architecture standards</span><span>Release confidence</span><span>Operational readiness</span><span>Long-term maintainability</span>
            </div>
          </div>
          <div className="revamp-visual" aria-label="Product durability model">
            <div className="orbit orbit-one"><span>Durability</span></div>
            <div className="orbit orbit-two"><span>Availability</span></div>
            <span className="revamp-key key-scalability">Scalability</span>
            <span className="revamp-key key-observability">Observability</span>
            <span className="revamp-key key-security">Security</span>
            <span className="revamp-key key-performance">Performance</span>
            <span className="revamp-key key-operations">Operational excellence</span>
            <div className="orbit-core">OWN<br />THE<br />OUTCOME</div>
          </div>
        </article>

        <div className="release-header">
          <p>Flagship releases</p>
          <span>Product thinking × production engineering</span>
        </div>
        <div className="release-grid">
          {releases.map((release) => (
            <article className="release-card" key={release.number}>
              <div className="release-top"><span>{release.number}</span><small>{release.tag}</small></div>
              <h3>{release.title}</h3>
              <p>{release.description}</p>
            </article>
          ))}
        </div>

        <div className="scale-heading">
          <p className="section-number">Impact at scale</p>
          <h3>Measured in outcomes,<br />not activity.</h3>
        </div>
        <div className="scale-grid">
          {scaleMetrics.map(([value, label, detail]) => (
            <article key={label}>
              <strong>{value}</strong>
              <span>{label}</span>
              <p>{detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="case-study">
        <div className="case-study-inner">
          <div className="case-title">
            <p className="section-number light">02 / Deep dive</p>
            <h2>Making a Django API<br /><em>production-ready.</em></h2>
            <p>
              The MDS API revamp created a clear service boundary, standardized endpoint patterns,
              moved pagination closer to the database, and made performance a repeatable engineering practice.
            </p>
          </div>
          <div className="case-metrics">
            <div><strong>26 → 10</strong><span>queries per measured bank-statement request</span></div>
            <div><strong>0</strong><span>failures across 500-concurrency load tests</span></div>
            <div><strong>High traffic</strong><span>sustained throughput under high concurrency</span></div>
          </div>
          <div className="case-flow">
            <p>New engineering path</p>
            <div><span>Validate request</span><b>→</b><span>Call service</span><b>→</b><span>Shape query</span><b>→</b><span>Serialize page</span></div>
          </div>
          <div className="case-notes">
            <div><span>01</span><p><strong>Clear ownership</strong>Business rules and query orchestration moved from views and serializers into focused services.</p></div>
            <div><span>02</span><p><strong>Fresh and efficient</strong>Request-local batching reduced duplicate lookups without stale global caching.</p></div>
            <div><span>03</span><p><strong>Safer rollout</strong>Feature flags, connection guardrails, Swagger, Postman, and repeatable load tests reduced release risk.</p></div>
          </div>
        </div>
      </section>

      <section className="section experience-section" id="experience">
        <div className="section-heading compact">
          <p className="section-number">03 / Experience</p>
          <h2>Four years of increasing<br /><em>scope and ownership.</em></h2>
        </div>
        <div className="timeline">
          {experience.map((job, index) => (
            <article className="job" key={`${job.company}-${job.role}`}>
              <div className="job-index">0{index + 1}</div>
              <div className="job-meta"><span>{job.period}</span><small>{job.domain}</small></div>
              <div className="job-main">
                <h3>{job.role}</h3><p className="company">{job.company}</p><p className="job-summary">{job.summary}</p>
                <ul>{job.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="capabilities-section">
        <div className="capabilities-title"><p className="section-number light">04 / Toolkit</p><h2>Tools change.<br /><em>Judgment compounds.</em></h2></div>
        <div className="capability-list">
          {capabilities.map(([title, tools], index) => <div key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{tools}</p></div>)}
          <div className="education-row"><span>07</span><h3>Education</h3><p>BE, Information Technology · Chandigarh University · 2019–2023</p></div>
        </div>
      </section>

      <section className="section writing-section" id="writing">
        <div className="writing-card">
          <div>
            <p className="section-number">05 / Tech blogs</p>
            <h2>I write down the lessons<br />that survive <em>production.</em></h2>
            <p>Long-form notes on backend engineering, system design, performance work, and the decisions behind reliable products.</p>
          </div>
          <a href="https://medium.com/@zaidali753" target="_blank" rel="noreferrer" aria-label="Read Zaid Ali's tech blogs on Medium">
            <span>Read on</span><strong>Medium</strong><i>↗</i>
          </a>
        </div>
      </section>

      <footer>
        <div className="footer-top">
          <p>Have a hard system to build?</p>
          <h2>Let’s make it<br /><em>hold up.</em></h2>
          <a href="mailto:zaidali753@gmail.com">zaidali753@gmail.com <span>↗</span></a>
        </div>
        <div className="footer-bottom">
          <p>© 2026 Zaid Ali</p>
          <div><a href="/Syed_Zaid_Ali_Resume.pdf?v=20260714-2" target="_blank" rel="noreferrer">Résumé</a><a href="https://www.linkedin.com/in/zaid-ali-b409501a4/" target="_blank" rel="noreferrer">LinkedIn</a><a href="https://github.com/compile-and-cry" target="_blank" rel="noreferrer">GitHub</a><a href="https://medium.com/@zaidali753" target="_blank" rel="noreferrer">Medium</a><a href="#top">Back to top ↑</a></div>
        </div>
      </footer>
    </main>
  );
}
