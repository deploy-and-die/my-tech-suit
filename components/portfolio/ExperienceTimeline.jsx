"use client";

import { useEffect, useRef, useState } from "react";

export function ExperienceTimeline({ experience }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const jobRefs = useRef([]);

  useEffect(() => {
    const ratios = new Map();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = Number(entry.target.dataset.jobIndex);
          ratios.set(index, entry.isIntersecting ? entry.intersectionRatio : 0);
        });

        const next = [...ratios.entries()].sort((a, b) => b[1] - a[1])[0];
        if (next && next[1] > 0.12) setActiveIndex(next[0]);
      },
      { rootMargin: "-18% 0px -28%", threshold: [0.12, 0.3, 0.5, 0.7] },
    );

    jobRefs.current.forEach((job) => job && observer.observe(job));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="timeline">
      {experience.map((job, index) => (
        <article
          className={`job${activeIndex === index ? " is-focused" : ""}`}
          data-job-index={index}
          key={`${job.company}-${job.role}`}
          ref={(node) => { jobRefs.current[index] = node; }}
        >
          <div className="job-index">0{index + 1}</div>
          <div className="job-meta"><span>{job.period}</span><small>{job.domain}</small></div>
          <div className="job-main">
            <h3>{job.role}</h3><p className="company">{job.company}</p><p className="job-summary">{job.summary}</p>
            <ul>{job.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>
          </div>
        </article>
      ))}
    </div>
  );
}
