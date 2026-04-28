"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useTranslations } from "@/lib/translations/translations-context";

type SubmitStatus = "idle" | "sent";

const helpEmail = "help@dorascribe.com";

export default function ContactPage() {
  const t = useTranslations();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<SubmitStatus>("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const subject = `Dorascribe contact request from ${formData.name}`;
    const body = [
      `Name: ${formData.name}`,
      `Email: ${formData.email}`,
      "",
      "Message:",
      formData.message,
    ].join("\n");

    window.location.href = `mailto:${helpEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setStatus("sent");
    window.setTimeout(() => setStatus("idle"), 5000);
  };

  return (
    <div className="contact-page">
      <Header />

      <main className="contact-main">
        <section className="contact-section">
          <div className="contact-shell">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="contact-card"
            >
              <div className="contact-form-panel">
                <div className="contact-form-intro">
                  <p className="contact-form-kicker">{t("Start the conversation")}</p>
                  <h2>{t("Contact the Dorascribe team")}</h2>
                  <p>
                    {t("Send us a message and we will get back to you as soon as we can.")}
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="contact-form">
                  <div className="contact-field-grid">
                    <label className="contact-field">
                      <span>{t("Name")}</span>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder={t("Your full name")}
                        required
                      />
                    </label>

                    <label className="contact-field">
                      <span>{t("Email")}</span>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder={t("you@company.com")}
                        required
                      />
                    </label>
                  </div>

                  <label className="contact-field">
                    <span>{t("Message")}</span>
                    <textarea
                      name="message"
                      rows={7}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder={t("Tell us about your team, your workflow, or what you want to achieve with Dorascribe.")}
                      required
                    />
                  </label>

                  <button
                    type="submit"
                    className="contact-submit"
                  >
                    {t("Send message")}
                  </button>

                  {status === "sent" && (
                    <p className="contact-status success">
                      {t("Your email app is opening with your message ready to send.")}
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

        .contact-card {
          display: block;
          min-height: auto;
          overflow: hidden;
          border-radius: 32px;
          border: 1px solid rgba(0, 0, 0, 0.05);
          background: #ffffff;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.08);
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
          font-family: "DM Sans", sans-serif;
          font-size: 0.78rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #fb1a0e;
        }

        .contact-form-intro h2 {
          margin: 0;
          font-family: "DM Sans", Georgia, sans-serif;
          font-size: clamp(2rem, 3.2vw, 3rem);
          font-weight: 400;
          line-height: 1.02;
          letter-spacing: -0.035em;
          color: #171717;
        }

        .contact-form-intro p {
          margin: 14px 0 0;
          max-width: 42ch;
          font-family: "DM Sans", sans-serif;
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
          font-family: "DM Sans", sans-serif;
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
          font-family: "DM Sans", sans-serif;
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

        .contact-submit {
          min-height: 52px;
          border: 1px solid var(--brand-primary);
          border-radius: 16px;
          background: var(--brand-primary);
          color: #000000;
          font-family: "DM Sans", sans-serif;
          font-size: 0.96rem;
          font-weight: 700;
          cursor: pointer;
          transition: transform 0.2s ease, box-shadow 0.2s ease, opacity 0.2s ease;
        }

        .contact-submit:hover:not(:disabled) {
          transform: translateY(-1px);
          box-shadow: 0 14px 28px rgba(0, 170, 170, 0.32);
        }

        .contact-status {
          margin: 0;
          font-family: "DM Sans", sans-serif;
          font-size: 0.92rem;
          line-height: 1.5;
        }

        .contact-status.success {
          color: #166534;
        }

        .contact-status.error {
          color: #b91c1c;
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
