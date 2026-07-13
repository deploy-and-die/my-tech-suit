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
      "Designed core APIs for real-time, bi-directional Tally sync with idempotency, retries, and reconciliation safeguards.",
      "Delivered a prepaid cards system end to end, reliably handling ₹95L+ in monthly GTV.",
      "Led complex bank-statement ingestion across PDF, Excel, and image formats for the AI Accountant.",
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
      "Led codebase refactoring that improved maintainability and long-term reliability.",
      "Built reusable data-access APIs and ETL workflows for merchant data pipelines.",
      "Partnered across product and infrastructure teams to improve behavior under peak load.",
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
      "Worked across data, backend, and presentation layers to ship usable internal tooling.",
    ],
  },
];

const capabilities = [
  ["Backend & APIs", "Python · Django · FastAPI · REST · Service architecture"],
  ["Reliability", "Idempotency · Retries · Reconciliation · Feature flags"],
  ["Data systems", "PostgreSQL · SQL · Redis · BigQuery · ClickHouse"],
  ["Platform", "Kafka · Docker · AWS · Azure · Jenkins"],
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
        <a className="nav-cta" href="mailto:zaidali753@gmail.com">
          Let’s talk <span aria-hidden="true">↗</span>
        </a>
      </nav>
      <ProfileModal />

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
          </div>
          <div className="profile-links" aria-label="Professional profiles">
            <span>Find me online</span>
            <a href="https://www.linkedin.com/in/zaid-ali-b409501a4/" target="_blank" rel="noreferrer">LinkedIn ↗</a>
            <a href="https://github.com/deploy-and-die" target="_blank" rel="noreferrer">GitHub ↗</a>
            <a href="https://medium.com/@zaidali753" target="_blank" rel="noreferrer">Medium ↗</a>
          </div>
        </div>
        <div className="hero-proof reveal delay-1">
          <p className="proof-label">Production proof, not buzzwords</p>
          <div className="proof-stat featured">
            <strong>4<sup>+</sup></strong>
            <span>years building<br />production systems</span>
          </div>
          <div className="proof-row">
            <div className="proof-stat"><strong>₹95L<sup>+</sup></strong><span>monthly GTV handled</span></div>
            <div className="proof-stat"><strong>500</strong><span>concurrent-user load test</span></div>
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
            <div><strong>26 → 15</strong><span>queries per measured bank-statement request</span></div>
            <div><strong>0</strong><span>failures across 500-concurrency load tests</span></div>
            <div><strong>20</strong><span>default cursor-paginated page size</span></div>
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
          <div><a href="https://www.linkedin.com/in/zaid-ali-b409501a4/" target="_blank" rel="noreferrer">LinkedIn</a><a href="https://github.com/deploy-and-die" target="_blank" rel="noreferrer">GitHub</a><a href="https://medium.com/@zaidali753" target="_blank" rel="noreferrer">Medium</a><a href="#top">Back to top ↑</a></div>
        </div>
      </footer>
    </main>
  );
}
