from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER, TA_LEFT, TA_RIGHT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.platypus import (
    HRFlowable,
    Paragraph,
    SimpleDocTemplate,
    Spacer,
    Table,
    TableStyle,
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
    left = Paragraph(f"<b>{role}</b>  |  {company}", styles["role"])
    right = Paragraph(dates, styles["date"])
    table = Table([[left, right]], colWidths=[140 * mm, 38 * mm])
    table.setStyle(
        TableStyle(
            [
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("LEFTPADDING", (0, 0), (-1, -1), 0),
                ("RIGHTPADDING", (0, 0), (-1, -1), 0),
                ("TOPPADDING", (0, 0), (-1, -1), 0),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 1),
            ]
        )
    )
    return table


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
        "date": ParagraphStyle(
            "Date",
            parent=base["Normal"],
            fontName="Helvetica-Bold",
            fontSize=8,
            leading=10,
            textColor=SLATE,
            alignment=TA_RIGHT,
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
            '<a href="https://github.com/deploy-and-die" color="#176EDB">GitHub</a>',
            styles["contact"],
        ),
    ]

    story += section("Professional Summary", styles)
    story.append(
        Paragraph(
            "Backend Engineer with 4+ years building scalable REST services, distributed workflows, and high-volume payment systems for FinTech and AI products. Hands-on with Python, Django, FastAPI, Rust, Actix, SQL, Redis, AWS, and Azure; experienced in clean architecture, event-driven systems, reliability engineering, service revamps, and production ownership.",
            styles["body"],
        )
    )

    story += section("Experience", styles)
    story.append(role_header("SDE II", "Karbon Business", "Oct 2024 - Present", styles))
    karbon_bullets = [
        "Led engineering ownership of a complete product revamp and service rewrite, raising durability, availability, maintainability, and release quality.",
        "Released Multi-user Flow, Journal Voucher Flow, Billing Module, and SSO + OAuth, expanding enterprise-ready accounting capabilities.",
        "Spearheaded FinBox bank-statement ingestion across PDF, Excel, and images; reduced manual effort 70%, achieved 98% accuracy, and improved onboarding 40%.",
        "Built real-time Tally APIs and a Windows connector for bi-directional AP, AR, and journal-voucher sync with idempotency, retries, and reconciliation; drove 3x adoption across 500+ users.",
        "Migrated 50 GB+ of production data without interruption and delivered prepaid-card flows handling INR 95L+ monthly GTV with no operational failures.",
        "Restored critical onboarding services 95% faster, increased test coverage to 80%, and reduced service failures by 50%.",
    ]
    story.extend(bullet(item, styles) for item in karbon_bullets)

    story.append(Spacer(1, 2))
    story.append(role_header("Backend Engineer", "Juspay", "Sep 2022 - May 2024", styles))
    juspay_bullets = [
        "Owned reconciliation microservices and architecture for high-traffic payment applications processing millions of transactions daily.",
        "Led refactoring that improved maintainability and engineering efficiency by 40%; built generic APIs, cron jobs, ETL pipelines, and merchant integrations.",
        "Reduced integration latency by 30% through API architecture improvements and cross-functional delivery.",
        "Automated delivery with Docker and Jenkins, accelerating releases 50% while keeping downtime below 1%.",
    ]
    story.extend(bullet(item, styles) for item in juspay_bullets)

    story.append(Spacer(1, 2))
    story.append(role_header("Technical Product Analyst Intern", "Juspay", "Feb 2022 - Aug 2022", styles))
    intern_bullets = [
        "Architected a Kafka-based real-time logging pipeline and built a Kibana-style analytics dashboard for operational insight.",
        "Used customer feedback to accelerate product iterations 25% and improved data-collection accuracy to 95%.",
    ]
    story.extend(bullet(item, styles) for item in intern_bullets)

    story += section("Technical Skills", styles)
    skills_data = [
        [
            Paragraph("<b>Languages & services:</b> Python, Rust, Actix, Django, FastAPI, REST APIs", styles["skills"]),
            Paragraph("<b>Architecture:</b> Distributed systems, microservices, clean architecture, event-driven design", styles["skills"]),
        ],
        [
            Paragraph("<b>Data:</b> PostgreSQL, SQL, Redis, BigQuery, ClickHouse, ETL", styles["skills"]),
            Paragraph("<b>Reliability:</b> Idempotency, retries, reconciliation, scalability, security, data privacy", styles["skills"]),
        ],
        [
            Paragraph("<b>Platform:</b> Kafka, Docker, Jenkins, AWS, Azure, GitHub, Bitbucket", styles["skills"]),
            Paragraph("<b>Observability & leadership:</b> Kibana, logging, monitoring, code reviews, JIRA", styles["skills"]),
        ],
    ]
    skills_table = Table(skills_data, colWidths=[88 * mm, 88 * mm], hAlign="LEFT")
    skills_table.setStyle(
        TableStyle(
            [
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("LEFTPADDING", (0, 0), (-1, -1), 0),
                ("RIGHTPADDING", (0, 0), (-1, -1), 6),
                ("TOPPADDING", (0, 0), (-1, -1), 1),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 1.5),
            ]
        )
    )
    story.append(skills_table)

    story += section("Education", styles)
    education = Table(
        [[
            Paragraph("<b>BE, Information Technology</b>  |  Chandigarh University, India", styles["body"]),
            Paragraph("2019 - 2023", styles["date"]),
        ]],
        colWidths=[140 * mm, 38 * mm],
    )
    education.setStyle(
        TableStyle(
            [
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("LEFTPADDING", (0, 0), (-1, -1), 0),
                ("RIGHTPADDING", (0, 0), (-1, -1), 0),
                ("TOPPADDING", (0, 0), (-1, -1), 0),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 0),
            ]
        )
    )
    story.append(education)

    doc.build(story)
    print(OUTPUT)


if __name__ == "__main__":
    build_resume()
