"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

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
            HIPAA-ready clinical documentation for private practices and hospitals
          </p>

          <h1 className="hero-title">The AI Clinical Notes Assistant doctors love</h1>

          <p className="hero-subtitle">
            DoraScribe instantly captures patient encounters and turns them into clean,
            structured notes in seconds so you can focus on care, not typing.
          </p>

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

          <div className="hero-rating">
            <span className="stars">â˜…â˜…â˜…â˜…â˜…</span>
            <span>Trusted by clinicians across specialties</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="hero-device-zone"
        >
          <div className="pill-row-wrap">
            <button aria-label="Previous product tab" className="circle-nav">
              <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
                <path
                  d="M9.5 4.5L6 8L9.5 11.5"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            <div className="pill-row">
              {productPills.map((pill, index) => (
                <span
                  key={pill}
                  className={`product-pill ${index === 1 ? "is-active" : ""}`}
                >
                  {pill}
                </span>
              ))}
            </div>

            <button aria-label="Next product tab" className="circle-nav">
              <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
                <path
                  d="M6.5 4.5L10 8L6.5 11.5"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>

          <div className="tablet-frame">
            <div className="tablet-screen">
              <Image
                src="/assets/Dora_scribe_landing_page.png"
                alt="DoraScribe tablet mockup"
                fill
                style={{ objectFit: "cover", objectPosition: "72% center" }}
                priority
              />
            </div>
          </div>
        </motion.div>
      </div>

      <style jsx>{`
        .hero-playground-clone {
          position: relative;
          background: #e8eaee;
          padding: 122px 24px 54px;
          overflow: hidden;
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
          border: 1px solid rgba(31, 92, 247, 0.2);
          background: rgba(255, 255, 255, 0.55);
          color: #1f5cf7;
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
          color: #0f172a;
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

        .hero-cta-wrap {
          margin-top: 30px;
          width: 100%;
          display: flex;
          justify-content: center;
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
          color: #fff;
          background: #0B1D33;
          border: 1px solid #0B1D33;
          box-shadow: none;
          transition: background-color 0.2s ease;
        }

        .hero-main-cta:hover {
          background: #08162b;
        }

        .hero-rating {
          margin-top: 16px;
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 8px;
          font-family: "Inter", sans-serif;
          font-size: 0.77rem;
          color: #6b7280;
          flex-wrap: wrap;
        }

        .stars {
          color: #f59e0b;
          letter-spacing: 0.12em;
          font-size: 0.82rem;
        }

        .hero-device-zone {
          margin-top: 34px;
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
          width: 150%;
          max-width: 1470px;
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
      `}</style>
    </section>
  );
}

