"use client";

import React from "react";
import { motion } from "framer-motion";
import { BookOpen, FileText, Languages, Mic, Sparkles } from "lucide-react";

const productPills = [
  "Dictation",
  "SOAP Notes",
  "ICD-10 Coding",
  "EMR Ready",
  "Referrals",
  "Billing",
];

export default function Hero() {
  return (
    <section className="hero-playground-clone">
      <div className="hero-shell">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="hero-copy"
        >
          <p className="hero-badge">
            Designed by Healthcare Professionals
          </p>

          <h1 className="hero-title">AI Medical Scribe: Turn Consults Into Accurate Medical Notes</h1>

          <p className="hero-subtitle">
            Focus on your patients, not the paperwork. Let Dorascribe&apos;s AI handle the note-taking for you.
          </p>

          <div className="hero-compliance-row">
            {["PIPEDA COMPLIANT", "HIPAA COMPLIANT", "POPIA COMPLIANT"].map((label) => (
              <span key={label} className="compliance-badge">
                <svg className="compliance-check" width="22" height="22" viewBox="0 0 22 22" fill="none">
                  <circle cx="11" cy="11" r="10" stroke="#2ABFBF" strokeWidth="1.5" fill="none"/>
                  <path d="M7 11.5L9.5 14L15 8.5" stroke="#2ABFBF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                {label}
              </span>
            ))}
          </div>

          <div className="hero-cta-wrap">
            <a
              href="https://dorascribe.ai/book-demo/"
              target="_blank"
              rel="noopener noreferrer"
              className="hero-main-cta"
            >
              Get a free demo
            </a>
          </div>

        </motion.div>
      </div>

      <style jsx>{`
        .hero-playground-clone {
          position: relative;
          background: #ffffff;
          padding: 148px 24px 100px;
          overflow: hidden;
          border-bottom-left-radius: 28px;
          border-bottom-right-radius: 28px;
        }

        .hero-shell {
          max-width: 1180px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .hero-copy {
          width: 100%;
          max-width: 900px;
          margin: 0 auto;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .hero-badge {
          display: block;
          width: fit-content;
          padding: 8px 14px;
          border-radius: 999px;
          border: 1.5px solid #00AAAA;
          background: rgba(0, 170, 170, 0.15);
          color: #000000;
          font-family: "Inter", sans-serif;
          font-size: 0.75rem;
          font-weight: 500;
          margin: 0 auto 18px;
          text-align: center;
        }

        .hero-title {
          margin: 0;
          width: 100%;
          max-width: 900px;
          font-family: "Inter", sans-serif;
          color: #000000;
          letter-spacing: -0.04em;
          font-size: clamp(2.15rem, 6vw, 4.15rem);
          line-height: 0.98;
          font-weight: 700;
          text-align: center;
          margin-left: auto;
          margin-right: auto;
          text-wrap: balance;
        }

        .hero-subtitle {
          margin: 20px auto 0;
          max-width: 670px;
          font-family: "Inter", sans-serif;
          font-size: clamp(0.95rem, 1.9vw, 1.08rem);
          line-height: 1.6;
          color: #374151;
          text-align: center;
        }

        .hero-compliance-row {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 32px;
          margin-top: 24px;
          flex-wrap: wrap;
        }

        .compliance-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: "Inter", sans-serif;
          font-size: 0.78rem;
          font-weight: 600;
          letter-spacing: 0.06em;
          color: #000000;
        }

        .hero-cta-wrap {
          margin-top: 30px;
          width: 100%;
          display: flex;
          justify-content: center;
        }

        .hero-template-box {
          margin-top: 24px;
          width: min(1180px, calc(100vw - 48px));
          border: none;
          border-radius: 20px;
          padding: 12px;
          background: #F9F4F1;
          position: relative;
          left: 50%;
          transform: translateX(-50%);
        }

        .hero-template-grid {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;
          gap: 24px 32px;
        }

        .hero-template-card {
          background: transparent;
          border: none;
          border-radius: 0;
          padding: 0;
          min-height: 0;
          text-align: left;
          box-shadow: none;
          display: flex;
          align-items: center;
          gap: 8px;
          font-family: "Inter", sans-serif;
        }

        .template-icon {
          width: 32px;
          height: 32px;
          border-radius: 8px;
          background: rgba(255, 255, 255, 0.45);
          border: 1.5px solid rgba(255, 255, 255, 0.85);
          backdrop-filter: blur(10px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.04);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 0;
          color: #000000;
          flex-shrink: 0;
        }

        .template-title {
          margin: 0;
          font-family: "Inter", sans-serif;
          font-size: 0.78rem;
          font-weight: 600;
          letter-spacing: 0.06em;
          color: #000000;
        }

        .hero-main-cta {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          text-decoration: none;
          min-height: 0;
          padding: 10px 20px;
          border-radius: 14px;
          font-family: "Inter", sans-serif;
          font-size: 0.9rem;
          font-weight: 600;
          color: #000000;
          background: #FBF582;
          border: 1px solid #FBF582;
          box-shadow: none;
          transition: background-color 0.2s ease;
        }

        .hero-main-cta:hover {
          background: #EBE570;
        }

        .hero-device-zone {
          margin-top: 52px;
          width: 100%;
        }

        .pill-row-wrap {
          display: flex;
          align-items: center;
          gap: 10px;
          width: 100%;
        }

        .pill-row {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          flex-wrap: wrap;
          min-height: 42px;
          background: rgba(255, 255, 255, 0.64);
          border: 1px solid rgba(17, 24, 39, 0.08);
          border-radius: 999px;
          padding: 6px 12px;
        }

        .product-pill {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          height: 30px;
          padding: 0 11px;
          border-radius: 999px;
          font-family: "Inter", sans-serif;
          font-size: 0.78rem;
          color: #6b7280;
          background: transparent;
          border: 1px solid transparent;
          white-space: nowrap;
        }

        .product-pill.is-active {
          color: #1f5cf7;
          background: #eaf1ff;
          border-color: #d5e2ff;
          font-weight: 600;
        }

        .circle-nav {
          width: 30px;
          height: 30px;
          border-radius: 999px;
          border: 1px solid rgba(17, 24, 39, 0.12);
          background: rgba(255, 255, 255, 0.8);
          color: #6b7280;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: color 0.2s ease, border-color 0.2s ease, background-color 0.2s ease;
        }

        .circle-nav:hover {
          color: #111827;
          border-color: rgba(17, 24, 39, 0.24);
          background: #fff;
        }

        .tablet-frame {
          margin: 16px auto 0;
          width: 120%;
          max-width: 1176px;
          position: relative;
          left: 50%;
          transform: translateX(-50%);
          background: rgba(128, 128, 128, 0.2);
          border: 1px solid rgba(128, 128, 128, 0.2);
          border-radius: 12px;
          box-shadow: none;
          padding: 10px;
        }

        .tablet-screen {
          position: relative;
          width: 100%;
          border-radius: 8px;
          overflow: hidden;
          background: rgba(255, 255, 255, 0.96);
          border: none;
          aspect-ratio: 16 / 9;
        }
        @media (max-width: 820px) {
          .hero-playground-clone {
            padding: 110px 16px 36px;
            border-bottom-left-radius: 22px;
            border-bottom-right-radius: 22px;
          }

          .hero-template-box {
            width: calc(100vw - 32px);
            padding: 10px;
          }

          .hero-template-grid {
            gap: 14px 18px;
          }

          .pill-row-wrap {
            gap: 6px;
          }

          .pill-row {
            justify-content: flex-start;
            overflow-x: auto;
            flex-wrap: nowrap;
            scrollbar-width: none;
          }

          .pill-row::-webkit-scrollbar {
            display: none;
          }

          .tablet-frame {
            width: 100%;
            max-width: 980px;
            left: auto;
            transform: none;
            border-radius: 10px;
            padding: 7px;
          }
        }

        @media (max-width: 560px) {
          .hero-template-box {
            padding: 8px;
          }

          .hero-template-grid { gap: 10px 12px; }
        }
      `}</style>
    </section>
  );
}

