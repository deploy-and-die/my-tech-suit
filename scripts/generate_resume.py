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


def section(title, styles):
    return [
        Spacer(1, 6),
        Paragraph(title.upper(), styles["section"]),
        HRFlowable(width="100%", thickness=0.7, color=LIGHT, spaceBefore=2, spaceAfter=5),
    ]


def role_header(role, company, dates, styles):
    return Paragraph(
        f"<b>{role}</b>  |  {company}  |  <font color='#526174'>{dates}</font>",
        styles["role"],
    )


def bullet(text, styles):
    return Paragraph(f"- {text}", styles["bullet"])


def build_resume():
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)

    doc = SimpleDocTemplate(
        str(OUTPUT),
        pagesize=A4,
        leftMargin=15 * mm,
        rightMargin=15 * mm,
        topMargin=10 * mm,
        bottomMargin=9 * mm,
        title="Syed Zaid Ali - Backend Engineer Resume",
        author="Syed Zaid Ali",
        subject="Backend Engineer with 4+ years in FinTech and AI accounting",
    )

    base = getSampleStyleSheet()
    styles = {
        "name": ParagraphStyle(
            "Name",
            parent=base["Heading1"],
            fontName="Helvetica-Bold",
            fontSize=24,
            leading=25,
            textColor=NAVY,
            alignment=TA_CENTER,
            spaceAfter=1,
        ),
        "headline": ParagraphStyle(
            "Headline",
            parent=base["Normal"],
            fontName="Helvetica-Bold",
            fontSize=9.5,
            leading=11.5,
            textColor=BLUE,
            alignment=TA_CENTER,
            spaceAfter=3,
        ),
        "contact": ParagraphStyle(
            "Contact",
            parent=base["Normal"],
            fontName="Helvetica",
            fontSize=8.1,
            leading=10,
            textColor=SLATE,
            alignment=TA_CENTER,
            spaceAfter=3,
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
            spaceAfter=1.7,
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
        Paragraph("BACKEND ENGINEER  |  FINTECH  |  AI ACCOUNTING", styles["headline"]),
        Paragraph(
            "+91 9900713753  |  "
            '<a href="mailto:zaidali753@gmail.com" color="#176EDB">zaidali753@gmail.com</a>  |  '
            "Bengaluru, India  |  "
            '<a href="https://www.linkedin.com/in/zaid-ali-b409501a4/" color="#176EDB">LinkedIn</a>  |  '
            '<a href="https://github.com/compile-and-cry" color="#176EDB">GitHub</a>',
            styles["contact"],
        ),
    ]

    story += section("Professional Summary", styles)
    story.append(
        Paragraph(
            "Backend Engineer with 4+ years building scalable REST APIs, distributed systems, and high-volume payment platforms for FinTech and AI products. Hands-on with Python, Django, FastAPI, Rust, Actix, SQL, Redis, AWS, and Azure; experienced in system design, data modeling, event-driven architecture, high availability, observability, operational excellence, and production ownership.",
            styles["body"],
        )
    )

    story += section("Experience", styles)
    story.append(role_header("SDE II", "Karbon Business", "Oct 2024 - Present", styles))
    karbon_bullets = [
        "Led engineering ownership of a product revamp and service rewrite, improving high availability, scalability, maintainability, observability, and release quality.",
        "Released Multi-user Flow, Journal Voucher Flow, Billing Module, and SSO + OAuth 2.0 with authentication and authorization controls.",
        "Spearheaded FinBox bank-statement ingestion across PDF, Excel, and images; reduced manual effort 70%, achieved 98% accuracy, and improved onboarding 40%.",
        "Built real-time Tally APIs and a Windows connector for bi-directional AP, AR, and journal-voucher sync with idempotency, retries, and reconciliation; drove 3x adoption across 500+ users.",
        "Redesigned Django service boundaries, standardized REST API contracts, optimized database queries, introduced cursor pagination, and validated high-concurrency behavior through load testing.",
        "Led incident response for critical onboarding services, cutting recovery time 95%; raised automated test coverage to 80% and reduced failures 50%.",
    ]
    story.extend(bullet(item, styles) for item in karbon_bullets)

    story.append(Spacer(1, 2))
    story.append(role_header("Backend Engineer", "Juspay", "Sep 2022 - May 2024", styles))
    juspay_bullets = [
        "Owned system design and production operations for reconciliation microservices processing millions of payment transactions daily.",
        "Led refactoring that improved maintainability and engineering efficiency by 40%; built generic APIs, cron jobs, ETL pipelines, and merchant integrations.",
        "Reduced integration latency by 30% through API design, performance optimization, and cross-functional delivery.",
        "Built CI/CD automation with Docker and Jenkins, accelerating releases 50% while keeping production downtime below 1%.",
    ]
    story.extend(bullet(item, styles) for item in juspay_bullets)

    story.append(Spacer(1, 2))
    story.append(role_header("Technical Product Analyst Intern", "Juspay", "Feb 2022 - Aug 2022", styles))
    intern_bullets = [
        "Architected a Kafka-based real-time logging pipeline and Kibana-style monitoring dashboard, strengthening observability and operational insight.",
        "Used customer feedback to accelerate product iterations 25% and improved data-collection accuracy to 95%.",
    ]
    story.extend(bullet(item, styles) for item in intern_bullets)

    story += section("Technical Skills", styles)
    story.append(Paragraph("<b>Languages & APIs:</b> Python, Rust, Actix, Django, FastAPI, REST APIs  |  <b>Data:</b> PostgreSQL, SQL, Redis, BigQuery, ClickHouse, ETL", styles["skills"]))
    story.append(Paragraph("<b>Architecture & reliability:</b> Distributed systems, microservices, clean architecture, event-driven architecture, high availability, scalability, idempotency, retries, reconciliation", styles["skills"]))
    story.append(Paragraph("<b>Cloud & operations:</b> Kafka, Docker, Jenkins, CI/CD, AWS, Azure, Kibana, logging, monitoring, automated testing, incident response, security, data privacy, technical leadership, cross-functional collaboration, code reviews, JIRA", styles["skills"]))

    story += section("Education", styles)
    story.append(Paragraph("<b>BE, Information Technology</b>  |  Chandigarh University, India  |  2019 - 2023", styles["body"]))

    doc.build(story)
    print(OUTPUT)


if __name__ == "__main__":
    build_resume()
