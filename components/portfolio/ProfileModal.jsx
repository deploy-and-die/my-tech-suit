"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

export function ProfileModal() {
  const [isOpen, setIsOpen] = useState(false);
  const closeButtonRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const handleKeyDown = (event) => {
      if (event.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <>
      <button className="profile-trigger" type="button" onClick={() => setIsOpen(true)}>
        <span>ZA</span>
        <strong>Quick profile</strong>
      </button>

      {isOpen ? createPortal(
        <div className="modal-backdrop" role="presentation" onMouseDown={() => setIsOpen(false)}>
          <section
            aria-labelledby="profile-modal-title"
            aria-modal="true"
            className="profile-modal"
            role="dialog"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <button
              aria-label="Close quick profile"
              className="modal-close"
              onClick={() => setIsOpen(false)}
              ref={closeButtonRef}
              type="button"
            >
              Close ×
            </button>

            <div className="modal-identity">
              <img alt="Zaid Ali" src="/images/zaid-backend-engineer.png?v=20260714-2" />
              <div className="modal-intro">
                <p>Backend Engineer · Bengaluru, India</p>
                <h2 id="profile-modal-title">Zaid Ali</h2>
                <span>Backend-focused engineer building durable fintech and AI accounting products.</span>
              </div>
            </div>

            <div className="modal-stats">
              <div><strong>4+</strong><span>Years</span></div>
              <div><strong>₹95L+</strong><span>Monthly GTV</span></div>
              <div><strong>Led</strong><span>Production revamp &amp; service rewrite</span></div>
            </div>

            <div className="modal-strengths">
              <p>Core strengths</p>
              <div><span>Distributed systems</span><span>Product ownership</span><span>Fintech reliability</span><span>Python &amp; Rust</span></div>
            </div>

            <div className="modal-actions">
              <a className="modal-primary" href="mailto:zaidali753@gmail.com">Email Zaid ↗</a>
              <a href="/Syed_Zaid_Ali_Resume.pdf?v=20260723-3" target="_blank" rel="noreferrer">Résumé ↗</a>
              <a href="https://www.linkedin.com/in/zaid-ali-b409501a4/" target="_blank" rel="noreferrer">LinkedIn ↗</a>
              <a href="https://github.com/compile-and-cry" target="_blank" rel="noreferrer">GitHub ↗</a>
              <a href="https://medium.com/@zaidali753" target="_blank" rel="noreferrer">Medium ↗</a>
            </div>
          </section>
        </div>,
        document.body,
      ) : null}
    </>
  );
}
