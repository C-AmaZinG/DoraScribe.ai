"use client";

import React from "react";
import { motion } from "framer-motion";

export default function CTASection() {
  const leftBars = [112, 68, 82, 54, 38];
  const rightBars = [38, 54, 68, 54, 82, 112];

  return (
    <section className="cta-adoption">
      <div className="cta-shell">
        <motion.div
          className="cta-panel"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="cta-bars cta-bars-left" aria-hidden="true">
            {leftBars.map((height, index) => (
              <span key={`left-${index}`} style={{ height }} />
            ))}
          </div>

          <div className="cta-bars cta-bars-right" aria-hidden="true">
            {rightBars.map((height, index) => (
              <span key={`right-${index}`} style={{ height }} />
            ))}
          </div>

          <div className="cta-content">
            <h2>Feel the difference of Heidi by your side.</h2>
            <motion.a
              href="https://dorascribe.ai/book-demo/"
              className="cta-button"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
            >
              BOOK A TIME TO CONNECT
              <span className="cta-icon" aria-hidden="true">
                &gt;
              </span>
            </motion.a>
          </div>
        </motion.div>
      </div>

      <style jsx>{`
        .cta-adoption {
          padding: 20px 24px 56px;
          background: #FDFCFA;
        }

        .cta-shell {
          max-width: 1200px;
          margin: 0 auto;
        }

        .cta-panel {
          position: relative;
          overflow: hidden;
          border-radius: 42px;
          background: #13a7ae;
          min-height: 300px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid rgba(13, 133, 140, 0.82);
        }

        .cta-bars {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          display: flex;
          align-items: center;
          gap: 10px;
          pointer-events: none;
        }

        .cta-bars-left {
          left: 0;
          padding-left: 8px;
        }

        .cta-bars-right {
          right: 0;
          padding-right: 8px;
        }

        .cta-bars span {
          width: 12px;
          border-radius: 2px;
          background: #e6e46a;
          display: block;
        }

        .cta-content {
          position: relative;
          z-index: 1;
          text-align: center;
          max-width: 620px;
          padding: 20px 24px;
        }

        .cta-content :global(h2) {
          margin: 0;
          color: #f7fff8;
          font-family: "DM Sans", sans-serif;
          font-size: clamp(2rem, 4.2vw, 3.3rem);
          line-height: 1.06;
          letter-spacing: -0.015em;
          text-wrap: balance;
        }

        .cta-button {
          margin: 24px auto 0;
          width: fit-content;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          border-radius: 8px;
          background: #e6e46a;
          color: #2c2a12;
          border: 1px solid rgba(87, 85, 33, 0.32);
          text-decoration: none;
          font-family: "DM Sans", "DM Sans", sans-serif;
          font-size: 0.67rem;
          font-weight: 700;
          letter-spacing: 0.045em;
          padding: 11px 18px;
          transition: background-color 0.2s ease, color 0.2s ease;
        }

        .cta-button:hover {
          background: #f2ef81;
          color: #211f0f;
        }

        .cta-icon {
          width: 14px;
          height: 14px;
          border-radius: 999px;
          border: 1px solid rgba(45, 44, 17, 0.42);
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-size: 0.58rem;
          line-height: 1;
        }

        @media (max-width: 900px) {
          .cta-panel {
            min-height: 250px;
            border-radius: 28px;
          }

          .cta-bars span {
            width: 10px;
          }

          .cta-bars {
            gap: 8px;
          }
        }

        @media (max-width: 640px) {
          .cta-adoption {
            padding: 24px 16px 44px;
          }

          .cta-panel {
            min-height: 220px;
            border-radius: 22px;
          }

          .cta-bars span:nth-child(1),
          .cta-bars span:nth-child(6) {
            display: none;
          }

          .cta-content :global(h2) {
            font-size: clamp(1.55rem, 7vw, 2rem);
          }

          .cta-button {
            font-size: 0.62rem;
            letter-spacing: 0.035em;
          }
        }
      `}</style>
    </section>
  );
}

