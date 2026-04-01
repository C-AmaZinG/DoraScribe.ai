"use client";

import React from "react";
import { motion } from "framer-motion";

export default function CTASection() {
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
          <div className="cta-content">
            <h2>Real adoption drives real transformation</h2>
            <p>Join thousands of teams worldwide who&apos;ve made Dora part of their daily practice</p>
            <motion.a
              href="/contact"
              className="cta-button"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
            >
              Contact sales
            </motion.a>
          </div>
        </motion.div>
      </div>

      <style jsx>{`
        .cta-adoption {
          padding: 20px 24px 44px;
          background: #FDFCFA;
        }

        .cta-shell {
          max-width: 1200px;
          margin: 0 auto;
        }

        .cta-panel {
          position: relative;
          overflow: hidden;
          border-radius: 34px;
          background: #145524;
          min-height: 280px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid rgba(16, 77, 35, 0.65);
        }

        .cta-content {
          position: relative;
          z-index: 1;
          text-align: center;
          max-width: 920px;
          padding: 20px 24px;
        }

        .cta-content :global(h2) {
          margin: 0;
          color: #f2efe8;
          font-family: "Playfair Display", serif;
          font-size: clamp(2.5rem, 5vw, 5rem);
          line-height: 0.95;
          letter-spacing: -0.03em;
          text-wrap: balance;
        }

        .cta-content p {
          margin: 14px auto 0;
          max-width: 760px;
          color: rgba(246, 243, 236, 0.95);
          font-family: "Inter", sans-serif;
          font-size: 1.06rem;
          line-height: 1.55;
        }

        .cta-button {
          margin: 16px auto 0;
          width: fit-content;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          border-radius: 14px;
          background: #f4efea;
          color: #2e0518;
          border: 1px solid rgba(255, 255, 255, 0.2);
          text-decoration: none;
          font-family: "Inter", sans-serif;
          font-size: 0.95rem;
          font-weight: 600;
          padding: 12px 20px;
          transition: background-color 0.2s ease, color 0.2s ease;
        }

        .cta-button:hover {
          background: #ffffff;
          color: #1f1020;
        }

        @media (max-width: 900px) {
          .cta-panel {
            min-height: 240px;
            border-radius: 24px;
          }
        }

        @media (max-width: 640px) {
          .cta-adoption {
            padding: 24px 16px 44px;
          }

          .cta-panel {
            min-height: 210px;
          }
        }
      `}</style>
    </section>
  );
}

