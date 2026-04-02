"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

type SubmitStatus = "idle" | "sending" | "sent";

const serviceOptions = [
  "Website design",
  "UX design",
  "User research",
  "Content creation",
  "Strategy & consulting",
  "Other",
];

function InfoIcon({ type }: { type: "chat" | "pin" | "phone" }) {
  if (type === "chat") {
    return (
      <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    );
  }

  if (type === "pin") {
    return (
      <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 21s-6-5.4-6-10a6 6 0 1 1 12 0c0 4.6-6 10-6 10z" />
        <circle cx="12" cy="11" r="2" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.2 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.69 2.8a2 2 0 0 1-.45 2.11L8.1 9.9a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.33 1.84.56 2.8.69A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function SocialIcon({ label }: { label: string }) {
  return (
    <span className="social-icon" aria-label={label} title={label}>
      {label}
    </span>
  );
}

export default function ContactPage() {
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [selectedServices, setSelectedServices] = useState<string[]>(["Website design", "UX design"]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    project: "",
  });

  const toggleService = (service: string) => {
    setSelectedServices((prev) =>
      prev.includes(service) ? prev.filter((s) => s !== service) : [...prev, service]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    await new Promise((resolve) => setTimeout(resolve, 900));
    setStatus("sent");
    setFormData({ name: "", email: "", project: "" });
  };

  return (
    <div className="app-container">
      <Header />

      <main className="contact-main">
        <section className="contact-section">
          <motion.div
            className="contact-shell"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
          >
            <aside className="contact-left">
              <div>
                <div className="brand-row">
                  <span className="brand-mark" aria-hidden="true">
                    <span />
                    <span />
                    <span />
                    <span />
                  </span>
                  <p>Untitled UI</p>
                </div>

                <div className="info-list">
                  <div className="info-item">
                    <span className="info-item-icon"><InfoIcon type="chat" /></span>
                    <div>
                      <p className="info-title">Chat to us</p>
                      <p className="info-copy">Our friendly team is here to help.</p>
                      <a href="mailto:hi@untitledui.com" className="info-link">hi@untitledui.com</a>
                    </div>
                  </div>

                  <div className="info-item">
                    <span className="info-item-icon"><InfoIcon type="pin" /></span>
                    <div>
                      <p className="info-title">Visit us</p>
                      <p className="info-copy">Come say hello at our office HQ.</p>
                      <p className="info-link">100 Smith Street</p>
                      <p className="info-link">Collingwood VIC 3066 AU</p>
                    </div>
                  </div>

                  <div className="info-item">
                    <span className="info-item-icon"><InfoIcon type="phone" /></span>
                    <div>
                      <p className="info-title">Call us</p>
                      <p className="info-copy">Mon-Fri from 8am to 5pm.</p>
                      <a href="tel:+15550000000" className="info-link">+1 (555) 000-0000</a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="social-row" aria-label="Social links">
                <SocialIcon label="f" />
                <SocialIcon label="t" />
                <SocialIcon label="in" />
                <SocialIcon label="yt" />
                <SocialIcon label="dr" />
              </div>
            </aside>

            <section className="contact-right">
              {status === "sent" ? (
                <div className="sent-state">
                  <p className="form-title">Message sent.</p>
                  <p className="form-subtitle">Thanks for reaching out. We will contact you shortly.</p>
                  <button type="button" className="submit-btn" onClick={() => setStatus("idle")}>Send another message</button>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <h1 className="form-title">Got ideas? We've got the skills. Let's team up.</h1>
                  <p className="form-subtitle">Tell us more about yourself and what you've got in mind.</p>

                  <div className="field-wrap">
                    <label htmlFor="name">Your name</label>
                    <input
                      id="name"
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                      required
                    />
                  </div>

                  <div className="field-wrap">
                    <label htmlFor="email">Email</label>
                    <input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                      placeholder="you@company.com"
                      required
                    />
                  </div>

                  <div className="field-wrap">
                    <label htmlFor="project">Project details</label>
                    <textarea
                      id="project"
                      rows={2}
                      value={formData.project}
                      onChange={(e) => setFormData((prev) => ({ ...prev, project: e.target.value }))}
                      placeholder="Tell us a little about the project..."
                      required
                    />
                  </div>

                  <div className="checks-wrap">
                    <p className="checks-title">How can we help?</p>
                    <div className="checks-grid">
                      {serviceOptions.map((option) => {
                        const checked = selectedServices.includes(option);
                        return (
                          <label key={option} className="check-item">
                            <input
                              type="checkbox"
                              checked={checked}
                              onChange={() => toggleService(option)}
                            />
                            <span>{option}</span>
                          </label>
                        );
                      })}
                    </div>
                  </div>

                  <button type="submit" className="submit-btn" disabled={status === "sending"}>
                    {status === "sending" ? "Sending..." : "Let's get started!"}
                  </button>
                </form>
              )}
            </section>
          </motion.div>
        </section>
      </main>

      <Footer />

      <style jsx>{`
        .contact-main {
          min-height: 100vh;
          padding-top: 118px;
          background: #ebeff5;
        }

        .contact-section {
          padding: 44px 24px 120px;
        }

        .contact-shell {
          max-width: 1210px;
          margin: 0 auto;
          border: 4px solid #101727;
          border-radius: 34px;
          background: #f4f6f9;
          padding: 12px;
          display: grid;
          grid-template-columns: 300px 1fr;
          gap: 12px;
        }

        .contact-left {
          border-radius: 22px;
          padding: 18px 14px 14px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          min-height: 660px;
        }

        .brand-row {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .brand-row p {
          margin: 0;
          font-family: "Inter", sans-serif;
          font-size: 0.98rem;
          font-weight: 700;
          color: #0d1526;
        }

        .brand-mark {
          width: 14px;
          height: 14px;
          position: relative;
          display: inline-block;
        }

        .brand-mark span {
          position: absolute;
          width: 5px;
          height: 5px;
          border-radius: 1px;
          background: #0d1526;
          transform: rotate(45deg);
        }

        .brand-mark span:nth-child(1) { top: 0; left: 0; }
        .brand-mark span:nth-child(2) { top: 0; right: 0; }
        .brand-mark span:nth-child(3) { bottom: 0; left: 0; }
        .brand-mark span:nth-child(4) { bottom: 0; right: 0; }

        .info-list {
          margin-top: 32px;
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .info-item {
          display: flex;
          gap: 10px;
          align-items: flex-start;
        }

        .info-item-icon {
          width: 26px;
          height: 26px;
          border: 1px solid #d7dce6;
          border-radius: 7px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          color: #293246;
          flex-shrink: 0;
          margin-top: 2px;
        }

        .info-title {
          margin: 0;
          font-family: "Playfair Display", serif;
          font-size: 1.02rem;
          font-weight: 400;
          color: #0f1627;
          line-height: 1.25;
        }

        .info-copy {
          margin: 4px 0 0;
          font-family: "Inter", sans-serif;
          font-size: 0.9rem;
          color: #50596f;
          line-height: 1.4;
        }

        .info-link {
          display: block;
          margin: 4px 0 0;
          font-family: "Inter", sans-serif;
          font-size: 0.9rem;
          color: #121a2c;
          text-decoration: none;
          line-height: 1.4;
        }

        .social-row {
          display: flex;
          gap: 8px;
          align-items: center;
        }

        .social-icon {
          width: 26px;
          height: 26px;
          border-radius: 999px;
          border: 1px solid #d5dae4;
          background: #fff;
          color: #455067;
          font-family: "Inter", sans-serif;
          font-size: 0.66rem;
          font-weight: 700;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          text-transform: lowercase;
          line-height: 1;
        }

        .contact-right {
          border-radius: 18px;
          background: #b3f15d;
          padding: 34px 30px 26px;
          min-height: 660px;
        }

        .form-title {
          margin: 0;
          max-width: 760px;
          font-family: "Playfair Display", serif;
          font-size: clamp(2rem, 4.8vw, 3.4rem);
          font-weight: 400;
          line-height: 1.07;
          letter-spacing: -0.03em;
          color: #111827;
          text-wrap: balance;
        }

        .form-subtitle {
          margin: 12px 0 0;
          font-family: "Inter", sans-serif;
          font-size: 1.02rem;
          color: #1f293a;
          line-height: 1.45;
        }

        .field-wrap {
          margin-top: 22px;
        }

        .field-wrap label {
          display: block;
          margin-bottom: 5px;
          font-family: "Inter", sans-serif;
          font-size: 0.84rem;
          font-weight: 600;
          color: #111827;
        }

        .field-wrap input,
        .field-wrap textarea {
          width: 100%;
          border: 0;
          border-bottom: 1.5px solid rgba(17, 24, 39, 0.55);
          background: transparent;
          padding: 6px 0 8px;
          font-family: "Inter", sans-serif;
          font-size: 0.95rem;
          color: #111827;
          outline: none;
          resize: none;
        }

        .field-wrap input::placeholder,
        .field-wrap textarea::placeholder {
          color: rgba(17, 24, 39, 0.65);
        }

        .field-wrap input:focus,
        .field-wrap textarea:focus {
          border-bottom-color: #111827;
        }

        .checks-wrap {
          margin-top: 18px;
        }

        .checks-title {
          margin: 0;
          font-family: "Inter", sans-serif;
          font-size: 0.84rem;
          font-weight: 600;
          color: #111827;
        }

        .checks-grid {
          margin-top: 8px;
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 8px 22px;
          max-width: 560px;
        }

        .check-item {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: "Inter", sans-serif;
          font-size: 0.88rem;
          color: #111827;
          cursor: pointer;
        }

        .check-item input {
          appearance: none;
          width: 13px;
          height: 13px;
          border: 1.5px solid #111827;
          border-radius: 3px;
          background: transparent;
          margin: 0;
          position: relative;
          cursor: pointer;
        }

        .check-item input:checked::after {
          content: "";
          position: absolute;
          left: 3px;
          top: 1px;
          width: 3px;
          height: 6px;
          border: solid #111827;
          border-width: 0 1.6px 1.6px 0;
          transform: rotate(45deg);
        }

        .submit-btn {
          width: 100%;
          margin-top: 22px;
          min-height: 40px;
          border: 1px solid #f2ec7d;
          border-radius: 6px;
          background: #f2ec7d;
          color: #000000;
          font-family: "Inter", sans-serif;
          font-size: 0.84rem;
          font-weight: 600;
          cursor: pointer;
          transition: background-color 0.2s ease, border-color 0.2s ease;
        }

        .submit-btn:not(:disabled):hover {
          background: #e6de69;
          border-color: #e6de69;
        }

        .submit-btn:disabled {
          opacity: 0.72;
          cursor: wait;
        }

        .sent-state {
          max-width: 560px;
        }

        @media (max-width: 980px) {
          .contact-shell {
            grid-template-columns: 1fr;
          }

          .contact-left,
          .contact-right {
            min-height: unset;
          }
        }

        @media (max-width: 680px) {
          .contact-section {
            padding: 20px 12px 90px;
          }

          .contact-shell {
            border-width: 2px;
            border-radius: 22px;
            padding: 8px;
          }

          .contact-left {
            border-radius: 14px;
            padding: 14px 10px;
          }

          .contact-right {
            border-radius: 14px;
            padding: 22px 16px 18px;
          }

          .checks-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}

