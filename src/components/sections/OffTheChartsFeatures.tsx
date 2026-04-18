"use client";

import React, { useEffect, useState } from "react";
import { ChevronRight, Languages, Plus, Upload } from "lucide-react";

const commandPrompts = [
  "Summarize the treatment plan",
  "Add follow-up instructions for the patient",
  "Include current medication changes",
  "Create a concise assessment and plan",
];

const insightLines = [
  "Add more details about patient's cardiovascular examination",
  "Include current medication list and any recent changes",
  "Specify follow-up timeline for lab results",
  "Add vital signs from today's visit",
];

const languageCodes = [
  "US",
  "DE",
  "PT",
  "BR",
  "JP",
  "CN",
  "ES",
  "FR",
  "IT",
  "IN",
  "PL",
  "RU",
];

export default function OffTheChartsFeatures() {
  const [promptIndex, setPromptIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setPromptIndex((prev) => (prev + 1) % commandPrompts.length);
    }, 3200);

    return () => clearInterval(timer);
  }, [isPaused]);

  return (
    <section className="off-charts-section">
      <div 
        className="off-charts-shell"
        onPointerDown={() => setIsPaused(true)}
        onPointerUp={() => setIsPaused(false)}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="off-heading">
          <p className="off-title">Features that are off the charts</p>
          <p className="off-subtitle">
            Powerful tools to streamline your workflow and save time.
          </p>
        </div>

        <div className="off-grid">
          <article className="off-card span-1">
            <div className="upload-visual">
              <div className="upload-icon">
                <Upload size={18} strokeWidth={1.9} />
              </div>
              <p>Drag and drop files</p>
              <span>Upload pdf, docs, etc...</span>
            </div>
            <p className="card-title">Create from uploads</p>
            <p className="card-desc">
              Upload files and create anything from admission notes to discharge
              summaries.
            </p>
          </article>

          <article className="off-card span-2">
            <div className="prompt-visual">
              <div className="prompt-dot">
                <ChevronRight size={13} strokeWidth={2.2} />
              </div>
              <p className="prompt-text">{commandPrompts[promptIndex]}</p>
              <div className="prompt-keys">
                <span>Ctrl</span>
                <span>Enter</span>
              </div>
            </div>
            <p className="card-title">AI Commands & Chat</p>
            <p className="card-desc">
              Ask Vero to edit notes, recommend treatment plans, confirm
              medication doses quickly and effortlessly.
            </p>
          </article>

          <article className="off-card span-2">
            <div className="template-strip">
              <div className="template-mini lilac">
                <small>Referral Letter</small>
              </div>
              <div className="template-mini sand">
                <p className="mini-title">Patient Care Plan</p>
                <small>Patient Instructions</small>
                <ul>
                  <li>Diagnosis: Acute Bronchitis</li>
                  <li>Medications: Ventolin 2 puffs PRN</li>
                  <li>Seek care if: short of breath</li>
                  <li>Follow-up: 1 week</li>
                </ul>
              </div>
              <div className="template-mini mint">
                <p className="mini-title">Work Note</p>
                <ul>
                  <li>Patient seen today</li>
                  <li>Restrictions: Limited lifting</li>
                  <li>Duration: 5 days</li>
                  <li>Return to work: Modified duty</li>
                </ul>
              </div>
            </div>
            <p className="card-title">Custom templates</p>
            <p className="card-desc">
              Use pre-built Vero templates, those shared by the community, or
              build your own.
            </p>
          </article>

          <article className="off-card span-1">
            <div className="insights-list">
              {insightLines.map((item) => (
                <div className="insight-row" key={item}>
                  <Plus size={12} strokeWidth={2.4} />
                  <span>{item}</span>
                </div>
              ))}
            </div>
            <p className="card-title">Vero Insights for Feedback</p>
            <p className="card-desc">
              Get real-time, AI-driven feedback to improve note quality and
              documentation.
            </p>
          </article>

          <article className="off-card span-1">
            <div className="language-visual">
              <Languages size={20} strokeWidth={2} />
              <div className="language-cloud">
                {languageCodes.map((code, index) => (
                  <span
                    key={code}
                    style={{
                      left: `${18 + ((index * 23) % 64)}%`,
                      top: `${8 + ((index * 31) % 72)}%`,
                    }}
                  >
                    {code}
                  </span>
                ))}
              </div>
            </div>
            <p className="card-title">Multilingual Support</p>
            <p className="card-desc">
              Transcribe and translate patient encounters from over 50 different
              languages.
            </p>
          </article>

          <article className="off-card span-2">
            <div className="wave-visual">
              <svg viewBox="0 0 1440 300" preserveAspectRatio="none">
                <path
                  className="wave wave-a"
                  d="M -720 150 C -480 70, -240 230, 0 150 C 240 70, 480 230, 720 150 C 960 70, 1200 230, 1440 150 C 1680 70, 1920 230, 2160 150"
                />
                <path
                  className="wave wave-b"
                  d="M -720 150 C -480 220, -240 80, 0 150 C 240 220, 480 80, 720 150 C 960 220, 1200 80, 1440 150 C 1680 220, 1920 80, 2160 150"
                />
                <path
                  className="wave wave-c"
                  d="M -720 150 C -480 45, -240 255, 0 150 C 240 45, 480 255, 720 150 C 960 45, 1200 255, 1440 150 C 1680 45, 1920 255, 2160 150"
                />
              </svg>
            </div>
            <p className="card-title">Learns Your Unique Documentation Style</p>
            <p className="card-desc">
              The AI scribe adapts to your unique phrasing, so notes always sound
              like you.
            </p>
          </article>
        </div>
      </div>

      <style jsx>{`
        .off-charts-section {
          padding: 98px 24px;
          background: #f6f5f4;
        }

        .off-charts-shell {
          max-width: 1240px;
          margin: 0 auto;
        }

        .off-heading {
          text-align: center;
          margin-bottom: 34px;
        }

        .off-title {
          margin: 0;
          font-family: "DM Sans", sans-serif;
          font-size: clamp(2rem, 4.2vw, 3.15rem);
          font-weight: 600;
          line-height: 1.08;
          letter-spacing: -0.03em;
          color: #1a2b3b;
        }

        .off-subtitle {
          margin: 12px 0 0;
          font-family: "DM Sans", sans-serif;
          font-size: 1.08rem;
          color: #67717f;
          line-height: 1.45;
        }

        .off-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 10px;
        }

        .off-card {
          background: #f7f7f7;
          border: 1px solid #e6e6e6;
          border-radius: 12px;
          padding: 14px;
          min-height: 212px;
          display: flex;
          flex-direction: column;
        }

        .span-1 {
          grid-column: span 1;
        }

        .span-2 {
          grid-column: span 2;
        }

        .card-title {
          margin: 14px 0 0;
          font-family: "DM Sans", sans-serif;
          font-size: 1.95rem;
          font-weight: 600;
          letter-spacing: -0.03em;
          line-height: 1.1;
          color: #393d44;
        }

        .card-desc {
          margin: 8px 0 0;
          font-family: "DM Sans", sans-serif;
          font-size: 1.04rem;
          line-height: 1.45;
          color: #8c9096;
          max-width: 56ch;
        }

        .upload-visual {
          border: 1px dashed #3b82f6;
          border-radius: 10px;
          height: 132px;
          display: grid;
          place-items: center;
          place-content: center;
          background: #f8fbff;
          color: #4b5563;
          gap: 4px;
          text-align: center;
          font-family: "DM Sans", sans-serif;
        }

        .upload-icon {
          color: #6b7280;
        }

        .upload-visual p {
          margin: 0;
          font-size: 0.98rem;
          font-weight: 500;
        }

        .upload-visual span {
          font-size: 0.84rem;
          color: #3b82f6;
        }

        .prompt-visual {
          border: 1px solid #ddddde;
          border-radius: 9px;
          background: #fcfcfc;
          min-height: 40px;
          margin-top: 56px;
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 0 10px;
        }

        .prompt-dot {
          width: 16px;
          height: 16px;
          border-radius: 5px;
          background: #eef4ff;
          color: #3b82f6;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .prompt-text {
          margin: 0;
          font-family: "DM Sans", sans-serif;
          font-size: 0.92rem;
          color: #1f2937;
          font-weight: 500;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          flex: 1;
        }

        .prompt-keys {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          color: #9ca3af;
        }

        .prompt-keys span {
          border: 1px solid #e5e7eb;
          border-radius: 4px;
          min-width: 18px;
          min-height: 18px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-size: 0.66rem;
          line-height: 1;
          background: #f9fafb;
        }

        .template-strip {
          display: grid;
          grid-template-columns: 0.6fr 1.25fr 1fr;
          gap: 8px;
          height: 132px;
          overflow: hidden;
          border-radius: 10px;
          margin-bottom: 2px;
        }

        .template-mini {
          border-radius: 10px;
          padding: 10px;
          border: 1px solid rgba(17, 24, 39, 0.08);
          overflow: hidden;
          font-family: "DM Sans", sans-serif;
        }

        .template-mini small {
          font-size: 0.72rem;
          color: #5f6877;
          font-weight: 500;
        }

        .template-mini .mini-title {
          margin: 0 0 5px;
          font-family: "DM Sans", sans-serif;
          font-size: 0.9rem;
          font-weight: 600;
          color: #2e3743;
        }

        .template-mini ul {
          margin: 6px 0 0;
          padding: 0;
          list-style: none;
          display: grid;
          gap: 4px;
        }

        .template-mini li {
          font-size: 0.72rem;
          color: #5e636b;
          line-height: 1.3;
        }

        .template-mini.lilac {
          background: #ece6f3;
        }

        .template-mini.sand {
          background: #f0ede1;
        }

        .template-mini.mint {
          background: #e3ece9;
        }

        .insights-list {
          display: grid;
          gap: 8px;
          margin-bottom: 6px;
        }

        .insight-row {
          display: flex;
          align-items: flex-start;
          gap: 8px;
          font-family: "DM Sans", sans-serif;
          font-size: 0.84rem;
          line-height: 1.36;
          color: #505866;
        }

        .insight-row :global(svg) {
          margin-top: 2px;
          color: #3b82f6;
          flex-shrink: 0;
        }

        .language-visual {
          position: relative;
          height: 132px;
          border-radius: 10px;
          border: 1px solid #e4e4e4;
          background: #f9f9f9;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #35475e;
          overflow: hidden;
        }

        .language-cloud {
          position: absolute;
          inset: 0;
        }

        .language-cloud span {
          position: absolute;
          font-family: "DM Sans", sans-serif;
          font-size: 0.66rem;
          letter-spacing: 0.03em;
          color: #2f3339;
          opacity: 0.9;
        }

        .wave-visual {
          height: 132px;
          border-radius: 10px;
          border: 1px solid #e4e4e4;
          background: #f8f8f8;
          overflow: hidden;
          margin-bottom: 2px;
        }

        .wave-visual svg {
          width: 100%;
          height: 100%;
          display: block;
        }

        .wave {
          fill: none;
        }

        .wave-a {
          stroke: rgba(96, 147, 232, 0.55);
          stroke-width: 3;
          animation: wave-slide 8s linear infinite;
        }

        .wave-b {
          stroke: rgba(148, 180, 235, 0.36);
          stroke-width: 2;
          animation: wave-slide 10.5s linear infinite reverse;
        }

        .wave-c {
          stroke: rgba(176, 198, 234, 0.28);
          stroke-width: 2;
          animation: wave-slide 13s linear infinite;
        }

        @keyframes wave-slide {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-720px);
          }
        }

        @media (max-width: 1080px) {
          .off-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .span-2 {
            grid-column: span 2;
          }
        }

        @media (max-width: 760px) {
          .off-charts-section {
            padding: 78px 16px;
          }

          .off-grid {
            grid-template-columns: 1fr;
          }

          .span-1,
          .span-2 {
            grid-column: span 1;
          }

          .prompt-visual {
            margin-top: 28px;
          }

          .card-title {
            font-size: 1.55rem;
          }
        }
      `}</style>
    </section>
  );
}


