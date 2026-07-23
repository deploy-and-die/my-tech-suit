from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER, TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.platypus import (
    HRFlowable,
    Paragraph,
    SimpleDocTemplate,
    Spacer,
)


ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "output" / "pdf" / "Syed_Zaid_Ali_Resume.pdf"

NAVY = colors.HexColor("#07172B")
BLUE = colors.HexColor("#176EDB")
SLATE = colors.HexColor("#526174")
LIGHT = colors.HexColor("#D8E2F0")


def section(title, styles, space_before=5):
    return [
        Spacer(1, space_before),
        Paragraph(title.upper(), styles["section"]),
        HRFlowable(width="100%", thickness=0.7, color=LIGHT, spaceBefore=2, spaceAfter=5.5),
    ]


def role_header(role, company, dates, styles):
    return Paragraph(
        f"<b>{role}</b>  |  {company}  |  <font color='#526174'>{dates}</font>",
        styles["role"],
    )


def bullet(text, styles):
    return Paragraph(f"- {text}", styles["bullet"])


def impact_item(number, title, text, styles):
    return Paragraph(
        f"<font color='#176EDB'><b>{number}</b></font>  <b>{title}</b><br/>"
        f"<font color='#526174'>{text}</font>",
        styles["impact"],
    )


def build_resume():
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)

    doc = SimpleDocTemplate(
        str(OUTPUT),
        pagesize=A4,
        leftMargin=15 * mm,
        rightMargin=15 * mm,
        topMargin=10 * mm,
        bottomMargin=7 * mm,
        title="Syed Zaid Ali - Backend Engineer Resume",
        author="Syed Zaid Ali",
        subject="Software Engineer with 4+ years in backend systems, FinTech, and AI accounting",
    )

    base = getSampleStyleSheet()
    styles = {
        "name": ParagraphStyle(
            "Name",
            parent=base["Heading1"],
            fontName="Helvetica-Bold",
            fontSize=29,
            leading=31,
            textColor=NAVY,
            alignment=TA_CENTER,
            spaceAfter=3,
        ),
        "headline": ParagraphStyle(
            "Headline",
            parent=base["Normal"],
            fontName="Helvetica-Bold",
            fontSize=10.5,
            leading=12.5,
            textColor=BLUE,
            alignment=TA_CENTER,
            spaceAfter=4,
        ),
        "contact": ParagraphStyle(
            "Contact",
            parent=base["Normal"],
            fontName="Helvetica",
            fontSize=8.5,
            leading=10.5,
            textColor=SLATE,
            alignment=TA_CENTER,
            spaceAfter=1,
        ),
        "profiles": ParagraphStyle(
            "Profiles",
            parent=base["Normal"],
            fontName="Helvetica-Bold",
            fontSize=8.5,
            leading=10.5,
            textColor=BLUE,
            alignment=TA_CENTER,
            spaceAfter=0,
        ),
        "section": ParagraphStyle(
            "Section",
            parent=base["Heading2"],
            fontName="Helvetica-Bold",
            fontSize=8.6,
            leading=10,
            textColor=BLUE,
            spaceAfter=0,
        ),
        "impact_section": ParagraphStyle(
            "ImpactSection",
            parent=base["Heading2"],
            fontName="Helvetica-Bold",
            fontSize=8.6,
            leading=10,
            textColor=BLUE,
            spaceAfter=0,
        ),
        "impact": ParagraphStyle(
            "Impact",
            parent=base["Normal"],
            fontName="Helvetica",
            fontSize=8.65,
            leading=10.9,
            textColor=NAVY,
            leftIndent=22,
            firstLineIndent=-22,
            spaceAfter=3.5,
        ),
        "body": ParagraphStyle(
            "Body",
            parent=base["Normal"],
            fontName="Helvetica",
            fontSize=8.7,
            leading=11,
            textColor=NAVY,
            alignment=TA_LEFT,
            spaceAfter=1,
        ),
        "role": ParagraphStyle(
            "Role",
            parent=base["Normal"],
            fontName="Helvetica",
            fontSize=9.2,
            leading=11,
            textColor=NAVY,
        ),
        "bullet": ParagraphStyle(
            "Bullet",
            parent=base["Normal"],
            fontName="Helvetica",
            fontSize=8.25,
            leading=10.2,
            textColor=NAVY,
            leftIndent=7,
            firstLineIndent=-7,
            spaceAfter=1,
        ),
        "skills": ParagraphStyle(
            "Skills",
            parent=base["Normal"],
            fontName="Helvetica",
            fontSize=8.1,
            leading=10,
            textColor=NAVY,
        ),
    }

    story = [
        Paragraph("Syed Zaid Ali", styles["name"]),
        Paragraph("SOFTWARE ENGINEER  |  BACKEND SYSTEMS  |  FINTECH &amp; AI", styles["headline"]),
        Paragraph(
            "+91 9900713753  |  "
            '<a href="mailto:zaidali753@gmail.com" color="#176EDB">zaidali753@gmail.com</a>  |  '
            "Bengaluru, India",
            styles["contact"],
        ),
        Paragraph(
            '<a href="https://www.linkedin.com/in/zaid-ali-b409501a4/" color="#176EDB">LinkedIn</a>  |  '
            '<a href="https://github.com/compile-and-cry" color="#176EDB">GitHub</a>  |  '
            '<a href="https://medium.com/@zaidali753" color="#176EDB">Medium</a>',
            styles["profiles"],
        ),
    ]

    story += section("Professional Summary", styles, space_before=0)
    story.append(
        Paragraph(
            "Software Engineer with 4+ years building and owning production backend systems for fintech and AI accounting. Led the MDS API architecture revamp and delivered workflows used by 1,000+ users; improved incident recovery 95%, reduced service failures 50%, and raised automated test coverage to 80%. Strong in Python, Django, FastAPI, Rust, PostgreSQL, distributed systems, AWS, and Azure.",
            styles["body"],
        )
    )

    story += [
        Spacer(1, 5),
        Paragraph("CAREER HIGHLIGHTS", styles["impact_section"]),
        HRFlowable(width="100%", thickness=0.7, color=LIGHT, spaceBefore=2, spaceAfter=5.5),
    ]
    impact_bullets = [
        (
            "01",
            "Product architecture ownership",
            "Led the MDS API production revamp, redefining service boundaries, query ownership, and rollout controls for safer releases.",
        ),
        (
            "02",
            "Adoption at scale",
            "Drove 3x adoption across 1,000+ users through real-time, bi-directional Tally synchronization with idempotency, retries, and reconciliation.",
        ),
        (
            "03",
            "Production resilience",
            "Cut incident recovery time 95% and service failures 50%; raised unit and integration test coverage to 80%.",
        ),
    ]
    story.extend(impact_item(*item, styles) for item in impact_bullets)

    story += section("Experience", styles)
    story.append(role_header("Software Development Engineer II (SDE II)", "Karbon Business", "Oct 2024 - Present", styles))
    karbon_bullets = [
        "Improved availability, maintainability, and release safety by leading the MDS API system-design revamp, separating HTTP boundaries from service-owned workflows, and driving architecture and code reviews.",
        "Reduced bank-statement processing effort 70%, achieved 98% parsing accuracy, and improved onboarding 40% by building FinBox ingestion for PDF, Excel, and image inputs.",
        "Drove 3x adoption across 1,000+ users by building real-time, bi-directional Tally APIs and a Windows connector with idempotency, retries, and reconciliation.",
        "Cut onboarding incident recovery time 95% and service failures 50% by leading root-cause analysis, strengthening observability, and shipping preventive fixes; raised unit and integration test coverage to 80%.",
        "Improved API throughput and database efficiency by moving filtering and pagination into querysets, standardizing cursor pagination, and profiling query and connection behavior under high concurrency.",
        "Expanded enterprise readiness by shipping Multi-user Flow, Journal Voucher Flow, Billing Module, and SSO + OAuth 2.0 with authorization controls, feature flags, and API documentation.",
    ]
    story.extend(bullet(item, styles) for item in karbon_bullets)

    story.append(Spacer(1, 1.5))
    story.append(role_header("Backend Engineer", "Juspay", "Sep 2022 - May 2024", styles))
    juspay_bullets = [
        "Sustained reconciliation of millions of payment transactions daily by owning the design, implementation, deployment, monitoring, and production support of distributed microservices.",
        "Improved maintainability and engineering efficiency 40% by refactoring service components, reviewing code, and standardizing reusable APIs, cron jobs, and ETL workflows.",
        "Reduced merchant integration latency 30% by redesigning API and data-access paths and coordinating delivery across product and engineering teams.",
        "Accelerated releases 50% while keeping production downtime below 1% by implementing CI/CD automation with Docker and Jenkins.",
    ]
    story.extend(bullet(item, styles) for item in juspay_bullets)

    story.append(Spacer(1, 1.5))
    story.append(role_header("Technical Product Analyst Intern", "Juspay", "Feb 2022 - Aug 2022", styles))
    intern_bullets = [
        "Improved production visibility by architecting a Kafka-based real-time logging pipeline and Kibana-style monitoring dashboard.",
        "Accelerated product iteration 25% and improved data-collection accuracy to 95% by translating customer feedback into measurable workflow changes.",
    ]
    story.extend(bullet(item, styles) for item in intern_bullets)

    story += section("Technical Skills", styles)
    story.append(Paragraph("<b>Languages & APIs:</b> Python, Rust, Actix, Django, FastAPI, REST APIs  |  <b>Data:</b> PostgreSQL, SQL, Redis, BigQuery, ClickHouse, ETL", styles["skills"]))
    story.append(Paragraph("<b>Architecture & reliability:</b> Distributed systems, microservices, object-oriented design, design patterns, event-driven architecture, high availability, scalability, idempotency, retries, reconciliation", styles["skills"]))
    story.append(Paragraph("<b>Delivery & engineering:</b> Kafka, Docker, Jenkins, CI/CD, AWS, Azure, Git, GitHub, unit and integration testing, technical design documents, code and architecture reviews, mentoring, root-cause analysis, SDLC, Agile", styles["skills"]))
    story.append(Paragraph("<b>AI developer tools:</b> Cursor, OpenAI Codex, Claude, prompt engineering, test generation, code review, technical documentation, rapid prototyping", styles["skills"]))

    story += section("Education", styles)
    story.append(Paragraph("<b>BE, Information Technology</b>  |  Chandigarh University, India  |  2019 - 2023", styles["body"]))

    doc.build(story)
    print(OUTPUT)


if __name__ == "__main__":
    build_resume()
