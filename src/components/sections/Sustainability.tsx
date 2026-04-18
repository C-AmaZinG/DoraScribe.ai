"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Mic } from "lucide-react";

const quickActions = ["Referral letter", "Prescription", "Assessment"];

export default function Sustainability() {
  const [activeAction, setActiveAction] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveAction((prev) => (prev + 1) % quickActions.length);
    }, 2200);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="burnout-section">
      <div className="burnout-shell">
        <motion.div
          className="burnout-copy"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="burnout-chip">Step 1</span>
          <h2>Record</h2>
          <p>
            Instantly capture live conversations with your patient or dictate a
            summary of the interaction.
          </p>
        </motion.div>

        <motion.div
          className="burnout-visual"
          initial={{ opacity: 0, y: 22, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="visual-top">
            <div className="mic-zone">
              <motion.div
                className="mic-shell"
                animate={{ scale: [1, 1.03, 1] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="mic-ring" />
                <motion.div
                  className="mic-core"
                  animate={{ scale: [1, 1.02, 1] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Mic size={42} strokeWidth={2.2} />
                </motion.div>
              </motion.div>
            </div>

            <motion.div
              className="note-card"
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <h4>Note</h4>
              <div className="line w-100" />
              <div className="line w-88" />
              <div className="line w-92" />
              <div className="line w-78" />
              <div className="line w-95" />
              <div className="line w-86" />
            </motion.div>

            <motion.div
              className="action-card"
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
            >
              {quickActions.map((item, index) => (
                <div
                  key={item}
                  className={`action-row ${index === activeAction ? "is-active" : ""}`}
                >
                  {item}
                </div>
              ))}
              <div className="action-lines">
                <div className="line w-100" />
                <div className="line w-96" />
                <div className="line w-54" />
                <div className="line w-82" />
              </div>
            </motion.div>
          </div>

        </motion.div>
      </div>

      <style jsx>{`
        .burnout-section {
          padding: 100px 24px;
          background: #FDFCFA;
        }

        .burnout-shell {
          max-width: 1240px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: minmax(0, 0.95fr) minmax(0, 1.05fr);
          gap: 48px;
          align-items: center;
        }

        .burnout-copy {
          max-width: 620px;
        }

        .burnout-chip {
          display: inline-flex;
          align-items: center;
          border-radius: 999px;
          padding: 8px 14px;
          background: #F9F4F1;
          color: #1a2340;
          font-family: "DM Sans", sans-serif;
          font-size: 0.93rem;
          font-weight: 600;
          letter-spacing: 0.01em;
        }

        .burnout-copy :global(h2) {
          margin-top: 18px;
          font-family: "DM Sans", sans-serif;
          font-size: clamp(2.4rem, 5vw, 4rem);
          line-height: 0.96;
          letter-spacing: -0.04em;
          color: #230717;
          max-width: 14ch;
        }

        .burnout-copy p {
          margin-top: 20px;
          font-family: "DM Sans", sans-serif;
          font-size: 1.02rem;
          line-height: 1.55;
          color: #271623;
          max-width: 58ch;
        }

        .burnout-visual {
          background: #f3f2f2;
          border: 1px solid #ece9e8;
          border-radius: 24px;
          box-shadow: 0 20px 40px rgba(30, 12, 24, 0.04);
          padding: 24px 22px;
          overflow: hidden;
        }

        .visual-top {
          display: grid;
          grid-template-columns: 220px minmax(0, 1fr) 190px;
          gap: 14px;
          align-items: end;
        }

        .mic-zone {
          position: relative;
          height: 240px;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: visible;
        }

        .mic-zone::after {
          content: "";
          position: absolute;
          right: -16px;
          top: 54%;
          width: 56px;
          height: 56px;
          border-right: 1.5px solid rgba(0, 170, 170, 0.42);
          border-bottom: 1.5px solid rgba(0, 170, 170, 0.42);
          border-radius: 0 0 56px 0;
          transform: translateY(-50%);
        }

        .mic-shell {
          width: 188px;
          height: 188px;
          border-radius: 50%;
          background: #F9F4F1;
          display: grid;
          place-items: center;
          position: relative;
        }

        .mic-ring {
          position: absolute;
          inset: 21px;
          border-radius: 50%;
          background: #c9dbf8;
        }

        .mic-core {
          width: 98px;
          height: 98px;
          border-radius: 50%;
          background: #000000;
          color: #ffffff;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          position: relative;
          z-index: 2;
          box-shadow: 0 10px 26px rgba(0, 170, 170, 0.28);
        }

        .note-card,
        .action-card {
          background: #f6f4f5;
          border: 1px solid #e9e3e5;
          border-radius: 10px;
          padding: 12px 14px;
          box-shadow: 0 12px 24px rgba(40, 10, 24, 0.06);
        }

        .note-card h4 {
          margin: 0 0 10px;
          font-family: "DM Sans", sans-serif;
          font-size: 2rem;
          font-weight: 600;
          color: #23111d;
        }

        .line {
          height: 14px;
          border-radius: 4px;
          background: #d5c8ce;
          margin-bottom: 8px;
        }

        .line:last-child {
          margin-bottom: 0;
        }

        .w-100 {
          width: 100%;
        }

        .w-96 {
          width: 96%;
        }

        .w-95 {
          width: 95%;
        }

        .w-92 {
          width: 92%;
        }

        .w-88 {
          width: 88%;
        }

        .w-86 {
          width: 86%;
        }

        .w-82 {
          width: 82%;
        }

        .w-78 {
          width: 78%;
        }

        .w-54 {
          width: 54%;
        }

        .action-row {
          padding-bottom: 7px;
          margin-bottom: 7px;
          border-bottom: 2px solid rgba(73, 21, 43, 0.15);
          color: #22121d;
          font-family: "DM Sans", sans-serif;
          font-size: 1.03rem;
          line-height: 1.2;
          transition: color 0.25s ease, border-color 0.25s ease;
        }

        .action-row.is-active {
          color: #350017;
          border-bottom-color: rgba(73, 21, 43, 0.48);
        }

        .action-lines {
          margin-top: 12px;
        }

        @media (max-width: 1080px) {
          .burnout-shell {
            grid-template-columns: 1fr;
            gap: 34px;
          }

          .burnout-copy {
            max-width: none;
          }
        }

        @media (max-width: 820px) {
          .burnout-section {
            padding: 88px 16px;
          }

          .visual-top {
            grid-template-columns: 1fr;
            gap: 10px;
          }

          .mic-zone {
            height: 160px;
          }

          .mic-zone::after {
            display: none;
          }
        }
      `}</style>
    </section>
  );
}

