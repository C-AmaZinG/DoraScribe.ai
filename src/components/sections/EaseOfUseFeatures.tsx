"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  BadgeCheck,
  FileText,
  Globe2,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
} from "lucide-react";

const workflowSteps = ["Start", "Review", "Finalize"];
const supportedLanguages = ["EN", "FR", "ES", "DE", "PT", "AR", "ZH", "HI"];
const complianceStandards = ["HIPAA", "PIPEDA", "GDPR", "POPIA"];

export default function EaseOfUseFeatures() {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % workflowSteps.length);
    }, 1800);
    return () => clearInterval(timer);
  }, []);

  const tileMotion = {
    whileHover: { y: -4, transition: { duration: 0.22 } },
    whileTap: { scale: 0.995 },
  } as const;

  return (
    <section className="ease-section">
      <div className="ease-shell">
        <div className="ease-grid">
          <motion.article
            className="ease-card card-easy"
            {...tileMotion}
          >
            <div className="ease-visual step-visual">
              {workflowSteps.map((step, index) => (
                <button
                  type="button"
                  key={step}
                  className={`step-pill ${index === activeStep ? "is-active" : ""}`}
                  onMouseEnter={() => setActiveStep(index)}
                >
                  <span className="step-dot" />
                  {step}
                </button>
              ))}
            </div>
            <p className="ease-title">Easy to Use</p>
            <p className="ease-desc">
              Designed for a seamless experience with minimal learning curve.
            </p>
          </motion.article>

          <motion.article
            className="ease-card card-clean"
            {...tileMotion}
          >
            <div className="ease-visual interface-visual">
              <div className="ui-row row-a" />
              <div className="ui-row row-b" />
              <div className="ui-row row-c" />
              <motion.div
                className="scan-line"
                animate={{ y: [0, 56, 0] }}
                transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
            <p className="ease-title">Clean Interface</p>
            <p className="ease-desc">
              Simple, uncluttered layout that keeps the focus on your workflow.
            </p>
          </motion.article>

          <motion.article
            className="ease-card card-accurate"
            {...tileMotion}
          >
            <div className="ease-visual language-visual">
              <Globe2 size={18} strokeWidth={2} />
              <div className="language-pills">
                {supportedLanguages.map((code, idx) => (
                  <span
                    key={code}
                    className="language-pill"
                    style={{ animationDelay: `${idx * 0.18}s` }}
                  >
                    {code}
                  </span>
                ))}
              </div>
            </div>
            <p className="ease-title">Accurate notes</p>
            <p className="ease-desc">
              Capture every clinical detail with clarity and precision.
            </p>
          </motion.article>

          <motion.article
            className="ease-card card-privacy"
            {...tileMotion}
          >
            <div className="ease-visual compliance-visual">
              {complianceStandards.map((item, index) => (
                <span
                  key={item}
                  className="compliance-pill"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <ShieldCheck size={13} strokeWidth={2.3} />
                  {item}
                </span>
              ))}
            </div>
            <p className="ease-title">Privacy compliant</p>
            <p className="ease-desc">HIPAA, PIPEDA, GDPR, POPIA</p>
          </motion.article>

          <motion.article
            className="ease-card card-soc2"
            {...tileMotion}
          >
            <div className="ease-visual soc2-visual">
              <motion.div
                className="soc2-ring"
                animate={{ rotate: 360 }}
                transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
              />
              <div className="soc2-core">
                <BadgeCheck size={18} strokeWidth={2.2} />
                <span>SOC2</span>
              </div>
            </div>
            <p className="ease-title">SOC2</p>
            <p className="ease-desc">
              Enterprise-grade security and audit-ready controls.
            </p>
          </motion.article>

          <motion.article
            className="ease-card card-handouts"
            {...tileMotion}
          >
            <div className="ease-visual handout-visual">
              <div className="handout-top">
                <div className="left">
                  <FileText size={16} strokeWidth={2.1} />
                  <span>Patient handout preview</span>
                </div>
                <div className="right">
                  <Sparkles size={14} strokeWidth={2.2} />
                  <SlidersHorizontal size={14} strokeWidth={2.2} />
                </div>
              </div>
              <div className="handout-lines">
                <div className="line w-100" />
                <div className="line w-92" />
                <div className="line w-84" />
                <div className="line w-95" />
              </div>
            </div>
            <p className="ease-title">Patient Handouts</p>
            <p className="ease-desc">
              Generate clear, professional handouts directly from your notes.
            </p>
          </motion.article>
        </div>
      </div>

      <style jsx>{`
        .ease-section {
          padding: 0 24px 98px;
          background: #f6f5f4;
        }

        .ease-shell {
          max-width: 1240px;
          margin: 0 auto;
        }

        .ease-grid {
          display: grid;
          grid-template-columns: repeat(12, minmax(0, 1fr));
          grid-auto-rows: minmax(176px, auto);
          gap: 10px;
        }

        .ease-card {
          background: #f7f7f7;
          border: 1px solid #e6e6e6;
          border-radius: 12px;
          padding: 14px;
          display: flex;
          flex-direction: column;
          box-shadow: 0 6px 20px rgba(25, 40, 55, 0.04);
          transition: border-color 0.22s ease, box-shadow 0.22s ease;
        }

        .ease-card:hover {
          border-color: #d5d9dd;
          box-shadow: 0 10px 24px rgba(25, 40, 55, 0.08);
        }

        .card-easy,
        .card-clean,
        .card-accurate {
          grid-column: span 4;
        }

        .card-privacy {
          grid-column: span 8;
        }

        .card-soc2 {
          grid-column: span 4;
        }

        .card-handouts {
          grid-column: span 12;
        }

        .ease-title {
          margin: 14px 0 0;
          font-family: "Inter", sans-serif;
          font-size: clamp(1.5rem, 2vw, 1.95rem);
          font-weight: 600;
          letter-spacing: -0.03em;
          line-height: 1.08;
          color: #393d44;
        }

        .ease-desc {
          margin: 12px 0 0;
          font-family: "Inter", sans-serif;
          font-size: 1.02rem;
          line-height: 1.45;
          color: #8c9096;
          max-width: 34ch;
        }

        .ease-visual {
          border-radius: 9px;
          border: 1px solid #dfdfdf;
          background: #fbfbfb;
          min-height: 114px;
        }

        .step-visual {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding: 12px;
        }

        .step-pill {
          border: 1px solid #d9dee4;
          border-radius: 999px;
          background: #f8fafc;
          color: #4b5563;
          font-family: "Inter", sans-serif;
          font-size: 0.78rem;
          font-weight: 500;
          padding: 7px 11px;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          transition: all 0.2s ease;
          cursor: pointer;
        }

        .step-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #94a3b8;
          transition: all 0.2s ease;
        }

        .step-pill.is-active {
          color: #000000;
          border-color: #b8d2ff;
          background: #eef4ff;
        }

        .step-pill.is-active .step-dot {
          background: #3b82f6;
          box-shadow: 0 0 0 5px rgba(59, 130, 246, 0.14);
        }

        .interface-visual {
          padding: 14px;
          position: relative;
          overflow: hidden;
        }

        .ui-row {
          border-radius: 6px;
          height: 16px;
          background: #eef0f2;
          margin-bottom: 10px;
          position: relative;
        }

        .row-a {
          width: 100%;
        }

        .row-b {
          width: 82%;
        }

        .row-c {
          width: 92%;
          margin-bottom: 0;
        }

        .scan-line {
          position: absolute;
          left: 14px;
          right: 14px;
          height: 12px;
          border-radius: 8px;
          background: linear-gradient(
            90deg,
            rgba(191, 219, 254, 0.16) 0%,
            rgba(147, 197, 253, 0.34) 50%,
            rgba(191, 219, 254, 0.16) 100%
          );
          pointer-events: none;
        }

        .language-visual {
          padding: 12px;
          display: grid;
          place-content: center;
          gap: 10px;
          color: #355073;
        }

        .language-pills {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          justify-content: center;
          max-width: 230px;
        }

        .language-pill {
          border: 1px solid #d6dde5;
          background: #f8fafc;
          border-radius: 999px;
          padding: 3px 8px;
          font-family: "Inter", sans-serif;
          font-size: 0.66rem;
          font-weight: 600;
          color: #4a5563;
          animation: float-chip 3.2s ease-in-out infinite;
        }

        @keyframes float-chip {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-3px);
          }
        }

        .compliance-visual {
          padding: 12px;
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          align-items: center;
        }

        .compliance-pill {
          border: 1px solid #d7dce2;
          border-radius: 999px;
          padding: 5px 9px;
          font-family: "Inter", sans-serif;
          font-size: 0.74rem;
          font-weight: 600;
          color: #364253;
          background: #fafafa;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          animation: pulse-chip 2.8s ease-in-out infinite;
        }

        .compliance-pill :global(svg) {
          color: #2f5ba3;
        }

        @keyframes pulse-chip {
          0%,
          100% {
            box-shadow: 0 0 0 0 rgba(47, 91, 163, 0);
          }
          50% {
            box-shadow: 0 0 0 5px rgba(47, 91, 163, 0.08);
          }
        }

        .soc2-visual {
          position: relative;
          display: grid;
          place-items: center;
          overflow: hidden;
        }

        .soc2-ring {
          width: 88px;
          height: 88px;
          border-radius: 50%;
          border: 1.5px dashed #9fb0c6;
        }

        .soc2-core {
          position: absolute;
          width: 56px;
          height: 56px;
          border-radius: 50%;
          background: #eef4ff;
          color: #000000;
          display: grid;
          place-items: center;
          gap: 1px;
          font-family: "Inter", sans-serif;
          font-size: 0.56rem;
          font-weight: 700;
          letter-spacing: 0.08em;
        }

        .handout-visual {
          padding: 12px;
        }

        .handout-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid #e5e7eb;
          padding-bottom: 8px;
        }

        .handout-top .left,
        .handout-top .right {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          color: #3f4a59;
        }

        .handout-top .left span {
          font-family: "Inter", sans-serif;
          font-size: 0.78rem;
          font-weight: 600;
        }

        .handout-lines {
          margin-top: 10px;
          display: grid;
          gap: 8px;
        }

        .line {
          height: 9px;
          border-radius: 999px;
          background: linear-gradient(
            90deg,
            #e5e7eb 0%,
            #f3f4f6 35%,
            #e5e7eb 70%
          );
          background-size: 220% 100%;
          animation: shimmer 3.2s linear infinite;
        }

        @keyframes shimmer {
          from {
            background-position: 0% 0%;
          }
          to {
            background-position: -220% 0%;
          }
        }

        .w-100 {
          width: 100%;
        }

        .w-95 {
          width: 95%;
        }

        .w-92 {
          width: 92%;
        }

        .w-84 {
          width: 84%;
        }

        @media (max-width: 1080px) {
          .ease-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .card-easy,
          .card-clean,
          .card-accurate,
          .card-soc2 {
            grid-column: span 1;
          }

          .card-privacy,
          .card-handouts {
            grid-column: span 2;
          }
        }

        @media (max-width: 760px) {
          .ease-section {
            padding: 0 16px 78px;
          }

          .ease-grid {
            grid-template-columns: 1fr;
          }

          .card-easy,
          .card-clean,
          .card-accurate,
          .card-privacy,
          .card-soc2,
          .card-handouts {
            grid-column: span 1;
          }

          .ease-title {
            font-size: 1.55rem;
          }

          .step-visual {
            flex-wrap: wrap;
          }

          .handout-top .left span {
            font-size: 0.72rem;
          }
        }
      `}</style>
    </section>
  );
}
