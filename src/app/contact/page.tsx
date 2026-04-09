"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AnimatedBackground from "@/components/AnimatedBackground";

type SubmitStatus = "idle" | "sending" | "sent" | "error";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    newsletter: false,
  });
  const [status, setStatus] = useState<SubmitStatus>("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const target = e.target;
    if (target instanceof HTMLInputElement && target.type === "checkbox") {
      setFormData((prev) => ({ ...prev, [target.name]: target.checked }));
      return;
    }

    setFormData((prev) => ({ ...prev, [target.name]: target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          subscribe: formData.newsletter,
        }),
      });

      if (!response.ok) {
        throw new Error("Submission failed");
      }

      setStatus("sent");
      setFormData({
        name: "",
        email: "",
        message: "",
        newsletter: false,
      });

      window.setTimeout(() => setStatus("idle"), 4000);
    } catch (error) {
      console.error("Contact submission error:", error);
      setStatus("error");
      window.setTimeout(() => setStatus("idle"), 4000);
    }
  };

  return (
    <div className="contact-page">
      <Header />

      <main className="contact-main">
        <section className="contact-section">
          <div className="contact-shell">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}
              className="contact-kicker-wrap"
            >
              <div className="contact-kicker">
                <span className="contact-kicker-dot" />
                Contact Us
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="contact-card"
            >
              <div className="contact-visual-panel">
                <AnimatedBackground
                  orbColors={[
                    "rgba(251, 26, 14, 0.32)",
                    "rgba(255, 255, 255, 0.08)",
                    "rgba(41, 105, 183, 0.16)",
                    "rgba(251, 26, 14, 0.14)",
                  ]}
                />
                <div className="contact-visual-overlay" />

                <div className="contact-visual-content">
                  <div>
                    <p className="contact-panel-label">DoraScribe</p>
                    <h1 className="contact-title">
                      Tell us how we can help your team move faster.
                    </h1>
                    <p className="contact-subtitle">
                      Whether you are exploring DoraScribe for a clinic, a growing
                      practice, or a large organization, we are here to help you find
                      the right next step.
                    </p>
                  </div>
                </div>
              </div>

              <div className="contact-form-panel">
                <div className="contact-form-intro">
                  <p className="contact-form-kicker">Start the conversation</p>
                  <h2>Contact the DoraScribe team</h2>
                  <p>
                    Send us a message and we will get back to you as soon as we can.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="contact-form">
                  <div className="contact-field-grid">
                    <label className="contact-field">
                      <span>Name</span>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your full name"
                        required
                      />
                    </label>

                    <label className="contact-field">
                      <span>Email</span>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="you@company.com"
                        required
                      />
                    </label>
                  </div>

                  <label className="contact-field">
                    <span>Message</span>
                    <textarea
                      name="message"
                      rows={7}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us about your team, your workflow, or what you want to achieve with DoraScribe."
                      required
                    />
                  </label>

                  <label className="contact-checkbox">
                    <input
                      type="checkbox"
                      name="newsletter"
                      checked={formData.newsletter}
                      onChange={handleChange}
                    />
                    <span>
                      Keep me updated with DoraScribe product news, tutorials, and
                      helpful workflow tips.
                    </span>
                  </label>

                  <button
                    type="submit"
                    className="contact-submit"
                    disabled={status === "sending"}
                  >
                    {status === "sending" ? "Sending..." : "Send message"}
                  </button>

                  {status === "sent" && (
                    <p className="contact-status success">
                      Your message has been sent. We will be in touch shortly.
                    </p>
                  )}

                  {status === "error" && (
                    <p className="contact-status error">
                      Something went wrong. Please try again in a moment.
                    </p>
                  )}
                </form>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />

      <style jsx>{`
        .contact-page {
          min-height: 100vh;
          background: #f7f7f5;
        }

        .contact-main {
          padding-top: 112px;
          background:
            radial-gradient(circle at top left, rgba(251, 26, 14, 0.08), transparent 20%),
            radial-gradient(circle at top right, rgba(41, 105, 183, 0.08), transparent 24%),
            #f7f7f5;
        }

        .contact-section {
          padding: 32px 24px 110px;
        }

        .contact-shell {
          max-width: 1400px;
          margin: 0 auto;
        }

        .contact-kicker-wrap {
          margin-bottom: 22px;
        }

        .contact-kicker {
          width: fit-content;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 10px 14px;
          border-radius: 12px;
          border: 1px solid rgba(0, 0, 0, 0.06);
          background: #ffffff;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.04);
          font-family: "Inter", sans-serif;
          font-size: 0.92rem;
          font-weight: 600;
          color: #1c1c1c;
        }

        .contact-kicker-dot {
          width: 8px;
          height: 8px;
          border-radius: 999px;
          background: #fb1a0e;
        }

        .contact-card {
          display: grid;
          grid-template-columns: 1fr 1fr;
          min-height: 640px;
          overflow: hidden;
          border-radius: 32px;
          border: 1px solid rgba(0, 0, 0, 0.05);
          background: #ffffff;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.08);
        }

        .contact-visual-panel {
          position: relative;
          overflow: hidden;
          background: #1a1a1a;
          min-height: 350px;
        }

        .contact-visual-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            180deg,
            rgba(0, 0, 0, 0.22) 0%,
            rgba(0, 0, 0, 0.38) 52%,
            rgba(0, 0, 0, 0.76) 100%
          );
          pointer-events: none;
        }

        .contact-visual-content {
          position: relative;
          z-index: 1;
          height: 100%;
          padding: 42px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          gap: 28px;
        }

        .contact-panel-label {
          margin: 0;
          font-family: "Inter", sans-serif;
          font-size: 0.86rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.76);
        }

        .contact-title {
          margin: 16px 0 0;
          max-width: 12ch;
          font-family: "Playfair Display", Georgia, serif;
          font-size: clamp(2.4rem, 4.2vw, 4.2rem);
          font-weight: 400;
          line-height: 0.98;
          letter-spacing: -0.04em;
          color: #ffffff;
        }

        .contact-subtitle {
          margin: 18px 0 0;
          max-width: 46ch;
          font-family: "Inter", sans-serif;
          font-size: 1rem;
          line-height: 1.75;
          color: rgba(255, 255, 255, 0.72);
        }

        .contact-form-panel {
          padding: 42px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          background: linear-gradient(180deg, #ffffff 0%, #fcfbf8 100%);
        }

        .contact-form-intro {
          margin-bottom: 26px;
        }

        .contact-form-kicker {
          margin: 0 0 10px;
          font-family: "Inter", sans-serif;
          font-size: 0.78rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #fb1a0e;
        }

        .contact-form-intro h2 {
          margin: 0;
          font-family: "Playfair Display", Georgia, serif;
          font-size: clamp(2rem, 3.2vw, 3rem);
          font-weight: 400;
          line-height: 1.02;
          letter-spacing: -0.035em;
          color: #171717;
        }

        .contact-form-intro p {
          margin: 14px 0 0;
          max-width: 42ch;
          font-family: "Inter", sans-serif;
          font-size: 1rem;
          line-height: 1.7;
          color: #6b7280;
        }

        .contact-form {
          display: flex;
          flex-direction: column;
          gap: 18px;
        }

        .contact-field-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 16px;
        }

        .contact-field {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .contact-field span {
          font-family: "Inter", sans-serif;
          font-size: 0.88rem;
          font-weight: 600;
          color: #171717;
        }

        .contact-field input,
        .contact-field textarea {
          width: 100%;
          border: 1px solid #e5e7eb;
          border-radius: 18px;
          background: #ffffff;
          padding: 16px 18px;
          font-family: "Inter", sans-serif;
          font-size: 0.96rem;
          color: #171717;
          outline: none;
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
          resize: vertical;
        }

        .contact-field input::placeholder,
        .contact-field textarea::placeholder {
          color: #9ca3af;
        }

        .contact-field input:focus,
        .contact-field textarea:focus {
          border-color: rgba(41, 105, 183, 0.5);
          box-shadow: 0 0 0 4px rgba(41, 105, 183, 0.08);
        }

        .contact-checkbox {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          margin-top: 2px;
          font-family: "Inter", sans-serif;
          font-size: 0.92rem;
          line-height: 1.6;
          color: #4b5563;
          cursor: pointer;
        }

        .contact-checkbox input {
          margin: 3px 0 0;
          width: 18px;
          height: 18px;
          accent-color: #2969b7;
          flex-shrink: 0;
        }

        .contact-submit {
          min-height: 52px;
          border: 1px solid #fbf582;
          border-radius: 16px;
          background: #fbf582;
          color: #171717;
          font-family: "Inter", sans-serif;
          font-size: 0.96rem;
          font-weight: 700;
          cursor: pointer;
          transition: transform 0.2s ease, box-shadow 0.2s ease, opacity 0.2s ease;
        }

        .contact-submit:hover:not(:disabled) {
          transform: translateY(-1px);
          box-shadow: 0 14px 28px rgba(251, 245, 130, 0.32);
        }

        .contact-submit:disabled {
          opacity: 0.72;
          cursor: wait;
        }

        .contact-status {
          margin: 0;
          font-family: "Inter", sans-serif;
          font-size: 0.92rem;
          line-height: 1.5;
        }

        .contact-status.success {
          color: #166534;
        }

        .contact-status.error {
          color: #b91c1c;
        }

        @media (max-width: 1080px) {
          .contact-card {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 760px) {
          .contact-main {
            padding-top: 100px;
          }

          .contact-section {
            padding: 22px 14px 90px;
          }

          .contact-card {
            border-radius: 24px;
          }

          .contact-visual-content,
          .contact-form-panel {
            padding: 24px;
          }

          .contact-field-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
