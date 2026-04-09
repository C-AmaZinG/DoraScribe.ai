"use client";

import React from "react";
import { motion } from "framer-motion";

const featureCards = [
  { title: "Globally certified", key: "certified" },
  { title: "Instant answers", key: "answers" },
  { title: "Works on any device", key: "device" },
  { title: "Local data processing", key: "local" },
  { title: "110+ languages", key: "languages" },
  { title: "Seamless authentication", key: "auth" },
  { title: "Centralised administration", key: "admin" },
  { title: "Enterprise integrations", key: "integrations" },
];

function Visual({ cardKey, animateRight }: { cardKey: string; animateRight: boolean }) {
  if (cardKey === "certified") {
    return (
      <div className="v-cert-grid">
        {["ISO-27001", "AICPA", "GDPR", "SOC-9001"].map((item) => (
          <div key={item} className="v-badge">
            {item}
          </div>
        ))}
      </div>
    );
  }

  if (cardKey === "answers") {
    return (
      <div className="v-chat">
        <div className="v-bubble top-left">Referral letter</div>
        <div className="v-bubble top-right">Patient explainer</div>
        <motion.div
          className="v-chat-input"
          animate={{ boxShadow: ["0 0 0 rgba(63,7,34,0)", "0 0 0 6px rgba(63,7,34,0.08)", "0 0 0 rgba(63,7,34,0)"] }}
          transition={{ duration: 2.1, repeat: Infinity, ease: "easeInOut" }}
        >
          <span>Ask Dora to do anything...</span>
          <button type="button">↑</button>
        </motion.div>
        <div className="v-bubble bottom-left">SOAP</div>
        <div className="v-bubble bottom-right">Assessments</div>
      </div>
    );
  }

  if (cardKey === "device") {
    return (
      <div className="v-devices">
        <motion.div
          className="v-device v-device-back"
          animate={animateRight ? { y: [0, -5, 0] } : undefined}
          transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="v-mic-dot" />
          <div className="v-wave" />
        </motion.div>
        <motion.div
          className="v-device v-device-front"
          animate={animateRight ? { y: [0, 6, 0] } : undefined}
          transition={{ duration: 3.1, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="v-mic-dot" />
          <div className="v-wave" />
        </motion.div>
      </div>
    );
  }

  if (cardKey === "local") {
    return (
      <div className="v-local">
        <div className="v-database">
          <div className="v-database-top" />
        </div>
        <motion.div
          className="v-flags"
          animate={animateRight ? { x: [0, 4, 0, -4, 0] } : undefined}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          {["🇨🇦", "🇺🇸", "🇦🇺", "🇬🇧", "🇪🇺"].map((f, i) => (
            <span key={`${f}-${i}`}>{f}</span>
          ))}
        </motion.div>
      </div>
    );
  }

  if (cardKey === "languages") {
    return (
      <div className="v-languages">
        <div className="v-lang-row">
          <span className="v-lang-pill">110+ languages</span>
          <span className="v-lang-plus">+</span>
          <span className="v-lang-emoji">🇨🇳</span>
          <span className="v-lang-emoji">🇫🇷</span>
          <span className="v-lang-emoji">🇩🇪</span>
        </div>
        <div className="v-note-card">
          <p>Note</p>
          <div />
          <div />
          <div />
        </div>
      </div>
    );
  }

  if (cardKey === "auth") {
    return (
      <div className="v-auth">
        <div className="v-monitor">
          <div className="v-lock">🔒</div>
          <div className="v-password">✶ ✶ ✶ ✶ ✶ ✶</div>
        </div>
      </div>
    );
  }

  if (cardKey === "admin") {
    return (
      <div className="v-admin">
        <motion.div
          className="v-admin-chip"
          animate={animateRight ? { x: [0, 8, 0] } : undefined}
          transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
        >
          Team settings
        </motion.div>
        <div className="v-admin-card v-admin-main" />
        <div className="v-admin-card v-admin-sub" />
      </div>
    );
  }

  return (
    <div className="v-integrations">
      <div className="v-core">✽</div>
      <motion.div
        className="v-orbit"
        animate={animateRight ? { rotate: 360 } : undefined}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      >
        {["◉", "✦", "✚", "◌"].map((i, idx) => (
          <span key={`${i}-${idx}`}>{i}</span>
        ))}
      </motion.div>
    </div>
  );
}

export default function WidelyAdopted() {
  return (
    <section className="features-grid-section">
      <div className="features-grid-shell">
        {featureCards.map((card, index) => {
          const isRightSection = index % 4 >= 2;

          return (
            <motion.article
              key={card.key}
              className="feature-tile"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: index * 0.04, ease: [0.16, 1, 0.3, 1] }}
            >
              <motion.div
                className="feature-visual"
                animate={
                  isRightSection
                    ? { y: [0, -5, 0], boxShadow: ["0 10px 24px rgba(38,15,25,0.03)", "0 14px 28px rgba(38,15,25,0.08)", "0 10px 24px rgba(38,15,25,0.03)"] }
                    : undefined
                }
                transition={{ duration: 3 + (index % 3) * 0.4, repeat: Infinity, ease: "easeInOut" }}
              >
                <Visual cardKey={card.key} animateRight={isRightSection} />
              </motion.div>
              <h3>{card.title}</h3>
            </motion.article>
          );
        })}
      </div>

      <style jsx>{`
        .features-grid-section {
          padding: 100px 24px;
          background: #FDFCFA;
        }

        .features-grid-shell {
          max-width: 1220px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 34px 26px;
        }

        .feature-tile {
          display: flex;
          flex-direction: column;
          gap: 18px;
        }

        .feature-visual {
          height: 146px;
          border-radius: 16px;
          background: #f5f3f2;
          border: 1px solid #ece8e6;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          position: relative;
        }

        .feature-tile :global(h3) {
          margin: 0;
          font-family: "Playfair Display", serif;
          font-size: clamp(1.45rem, 2.7vw, 2.1rem);
          line-height: 1.05;
          letter-spacing: -0.03em;
          color: #2b0718;
          max-width: 12ch;
        }

        .v-cert-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 8px;
        }

        .v-badge {
          width: 54px;
          height: 54px;
          border-radius: 12px;
          background: #310015;
          color: #fff;
          font-family: "Inter", sans-serif;
          font-size: 0.64rem;
          font-weight: 600;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 4px;
        }

        .v-chat {
          width: 88%;
          height: 92%;
          border-radius: 50%;
          border: 1px solid #e4dcdf;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .v-bubble {
          position: absolute;
          padding: 3px 8px;
          border-radius: 999px;
          border: 1px solid #bca8b1;
          background: #f8f5f6;
          color: #4a2334;
          font-size: 0.72rem;
          font-family: "Inter", sans-serif;
        }

        .top-left {
          top: -8px;
          left: -6px;
        }

        .top-right {
          top: -8px;
          right: -6px;
        }

        .bottom-left {
          bottom: -9px;
          left: 38%;
          transform: translateX(-50%);
        }

        .bottom-right {
          bottom: -9px;
          right: -10px;
        }

        .v-chat-input {
          width: 88%;
          height: 26px;
          border-radius: 7px;
          border: 1px solid #3f0722;
          background: #fff;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 6px 0 8px;
          font-family: "Inter", sans-serif;
          font-size: 0.73rem;
          color: #4b2535;
        }

        .v-chat-input button {
          width: 16px;
          height: 16px;
          border-radius: 4px;
          border: 0;
          color: #fff;
          background: #3f0722;
          line-height: 1;
          font-size: 0.7rem;
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }

        .v-devices {
          width: 88%;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 8px;
          align-items: end;
        }

        .v-device {
          border-radius: 10px;
          border: 1px solid #d8d2d4;
          background: #faf9f9;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }

        .v-device-back {
          height: 98px;
        }

        .v-device-front {
          height: 132px;
          border-width: 4px;
        }

        .v-mic-dot {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background: #330015;
          position: relative;
        }

        .v-mic-dot::after {
          content: "🎙";
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.9rem;
        }

        .v-wave {
          width: 42px;
          height: 8px;
          border-radius: 6px;
          background: repeating-linear-gradient(90deg, #2f0014 0 3px, transparent 3px 5px);
        }

        .v-local {
          width: 90%;
          position: relative;
        }

        .v-database {
          width: 90px;
          height: 78px;
          border-radius: 40px;
          border: 6px solid #e5dfdd;
          margin: 0 auto;
        }

        .v-database-top {
          width: 70px;
          height: 20px;
          border-radius: 50%;
          border: 4px solid #e5dfdd;
          background: #f7f5f4;
          margin: -10px auto 0;
        }

        .v-flags {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -20%);
          display: flex;
          gap: 2px;
        }

        .v-flags span {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: #fff;
          font-size: 1rem;
          box-shadow: 0 6px 16px rgba(37, 13, 23, 0.12);
        }

        .v-languages {
          width: 88%;
        }

        .v-lang-row {
          display: flex;
          align-items: center;
          gap: 4px;
          margin-bottom: 10px;
        }

        .v-lang-pill {
          padding: 4px 10px;
          border-radius: 999px;
          background: #2e0014;
          color: #fff;
          font-size: 0.64rem;
          font-family: "Inter", sans-serif;
        }

        .v-lang-plus {
          font-size: 1.4rem;
          line-height: 1;
          color: #2e0014;
        }

        .v-lang-emoji {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: #fff;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 6px 14px rgba(37, 13, 23, 0.1);
          font-size: 0.95rem;
        }

        .v-note-card {
          border-radius: 12px;
          background: #f8f5f6;
          border: 1px solid #ece6e8;
          padding: 10px;
        }

        .v-note-card p {
          margin: 0 0 8px;
          font-family: "Playfair Display", serif;
          color: #280618;
          font-size: 0.9rem;
        }

        .v-note-card div {
          height: 8px;
          border-radius: 4px;
          background: #d9ccd2;
          margin-bottom: 6px;
        }

        .v-note-card div:last-child {
          margin-bottom: 0;
          width: 72%;
        }

        .v-auth {
          width: 90%;
          display: flex;
          justify-content: center;
        }

        .v-monitor {
          width: 96%;
          max-width: 240px;
          border: 5px solid #ddd7d8;
          border-radius: 10px;
          padding: 18px 18px 14px;
          background: #fbf9f9;
          position: relative;
        }

        .v-monitor::after {
          content: "";
          position: absolute;
          bottom: -14px;
          left: 50%;
          width: 46px;
          height: 10px;
          border-radius: 0 0 8px 8px;
          background: #ddd7d8;
          transform: translateX(-50%);
        }

        .v-lock {
          font-size: 2rem;
          text-align: center;
        }

        .v-password {
          margin-top: 8px;
          text-align: center;
          border-radius: 8px;
          border: 1px solid #e7e1e3;
          background: #fff;
          color: #6f5f66;
          font-family: "Inter", sans-serif;
          padding: 5px 8px;
          font-size: 0.78rem;
        }

        .v-admin {
          width: 90%;
          position: relative;
        }

        .v-admin-card {
          border-radius: 8px;
          background: #fff;
          border: 1px solid #eee8ea;
          box-shadow: 0 8px 18px rgba(36, 13, 23, 0.08);
        }

        .v-admin-main {
          width: 65%;
          height: 56px;
          margin-left: auto;
        }

        .v-admin-sub {
          margin-top: 8px;
          width: 78%;
          height: 48px;
          margin-left: 14%;
        }

        .v-admin-chip {
          position: absolute;
          left: 0;
          top: 58px;
          border-radius: 8px;
          background: #2e0014;
          color: #fff;
          font-family: "Inter", sans-serif;
          font-size: 0.62rem;
          padding: 4px 8px;
          z-index: 2;
        }

        .v-integrations {
          width: 90%;
          height: 88%;
          border-radius: 999px;
          background: radial-gradient(circle, rgba(58, 9, 30, 0.08) 0 36%, transparent 37%);
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .v-core {
          width: 64px;
          height: 64px;
          border-radius: 50%;
          background: #330015;
          color: #00AAAA;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-size: 1.8rem;
          z-index: 2;
        }

        .v-orbit {
          position: absolute;
          inset: 0;
        }

        .v-orbit span {
          position: absolute;
          width: 34px;
          height: 34px;
          border-radius: 50%;
          background: #fff;
          box-shadow: 0 6px 16px rgba(37, 13, 23, 0.12);
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-size: 1rem;
          color: #4b2033;
        }

        .v-orbit span:nth-child(1) {
          top: 14%;
          left: 49%;
          transform: translateX(-50%);
        }

        .v-orbit span:nth-child(2) {
          top: 44%;
          right: 7%;
        }

        .v-orbit span:nth-child(3) {
          bottom: 8%;
          left: 49%;
          transform: translateX(-50%);
        }

        .v-orbit span:nth-child(4) {
          top: 44%;
          left: 7%;
        }

        @media (max-width: 1120px) {
          .features-grid-shell {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 26px 18px;
          }
        }

        @media (max-width: 720px) {
          .features-grid-section {
            padding: 84px 16px;
          }

          .features-grid-shell {
            grid-template-columns: 1fr;
            gap: 24px;
          }

          .feature-visual {
            height: 170px;
          }
        }
      `}</style>
    </section>
  );
}


