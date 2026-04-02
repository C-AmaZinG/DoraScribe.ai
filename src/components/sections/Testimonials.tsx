"use client";

import React from "react";
import Image from "next/image";

const quoteCards = [
  {
    org: "TEXAS ONCOLOGY",
    quote:
      "I finish clinic with charting already done, and that has changed my evenings completely. DoraScribe captures the details accurately without breaking my flow with patients.",
    name: "Lara M.",
    role: "Family Physician",
    initials: "LM",
    avatarColor: "#9EC5F8",
  },
  {
    org: "Ochsner Health",
    quote:
      "The note quality is consistently strong, even on complex follow-ups. I spend less time correcting documentation and more time discussing treatment decisions with patients.",
    name: "Nora I.",
    role: "Internal Medicine Physician",
    initials: "NI",
    avatarColor: "#B8C7D9",
  },
  {
    org: "COVENANT Healthcare",
    quote:
      "Our team adopted DoraScribe quickly because it fits naturally into the visit. Documentation feels lighter, and we can stay focused on delivering safe, attentive care.",
    name: "Chinelo A.",
    role: "Family Medicine Physician",
    initials: "CA",
    avatarColor: "#F3A78C",
  },
  {
    org: "pearl",
    quote:
      "What I value most is how reliable the summaries are after emotionally demanding sessions. It helps me preserve energy for patients instead of spending it all on admin work.",
    name: "Ruth E.",
    role: "Clinical Psychologist",
    initials: "RE",
    avatarColor: "#C7C2EA",
  },
];

export default function Testimonials() {
  return (
    <section className="testimonials-section">
      <div className="testimonials-shell">
        <h2 className="section-title">Don't just take our word for it.</h2>
        <div className="quote-grid">
          {quoteCards.map((card) => (
            <article key={card.name} className="quote-card">
              <p className="quote">"{card.quote}"</p>
              <div className="person">
                <div className="avatar" style={{ background: card.avatarColor }}>
                  {card.initials}
                </div>
                <div>
                  <p className="name">{card.name}</p>
                  <p className="role">{card.role}</p>
                </div>
              </div>
            </article>
          ))}
        </div>

        <article className="feature-panel">
          <div className="feature-media-wrap">
            <div className="feature-media" style={{ position: 'relative', minHeight: '360px', height: '100%', width: '100%', borderRadius: '14px', overflow: 'hidden' }}>
              <Image
                src="/portrait.jpg"
                alt="Smiling American female doctor"
                fill
                sizes="(max-width: 900px) 100vw, 50vw"
                style={{ objectFit: "cover", objectPosition: "center top" }}
              />
            </div>
          </div>
          <div className="feature-content">
            <h3>"DoraScribe lets us stay fully present with patients while documentation is handled accurately in real time."</h3>
            <p className="feature-attribution">Rachel T.</p>
          </div>
        </article>
      </div>

      <style jsx>{`
        .testimonials-section {
          background: #fdfcfa;
          padding: 96px 24px;
        }

        .testimonials-shell {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .section-title {
          font-family: "Playfair Display", serif;
          font-size: clamp(2.5rem, 5vw, 4rem);
          font-weight: 400;
          color: #000000;
          text-align: center;
          margin: 0 0 32px 0;
        }

        .quote-grid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 20px;
        }

        .quote-card {
          background: #F9F4F1;
          border-radius: 16px;
          padding: 30px 26px;
          display: flex;
          flex-direction: column;
          min-height: 320px;
        }

        .quote {
          margin: 0 0 30px;
          font-family: "Inter", sans-serif;
          font-size: 1rem;
          line-height: 1.45;
          color: #000000;
          flex: 1;
        }

        .person {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .avatar {
          width: 44px;
          height: 44px;
          border-radius: 999px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: "Inter", sans-serif;
          font-size: 0.82rem;
          font-weight: 700;
          color: #000000;
        }

        .name {
          margin: 0;
          font-family: "Inter", sans-serif;
          font-size: 1.02rem;
          color: #000000;
        }

        .role {
          margin: 2px 0 0;
          font-family: "Inter", sans-serif;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          font-size: 0.68rem;
          color: #353535;
        }

        .feature-panel {
          display: grid;
          grid-template-columns: 1fr 1fr;
          background: #F9F4F1;
          border-radius: 16px;
          overflow: hidden;
          min-height: 430px;
        }

        .feature-media {
          position: relative;
          min-height: 360px;
          border-radius: 14px;
          overflow: hidden;
          height: 100%;
        }

        .feature-media-wrap {
          padding: 14px;
          background: #ece8e8;
        }

        .feature-content {
          padding: 64px 54px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .feature-org {
          margin: 0;
          font-family: "Inter", sans-serif;
          font-size: 2rem;
          font-weight: 700;
          color: #151515;
        }

        .feature-content h3 {
          margin: 26px 0 18px;
          font-family: "Inter", sans-serif;
          font-size: 40px !important;
          line-height: 1.06;
          letter-spacing: -0.02em;
          color: #000000;
          max-width: 580px;
        }

        .feature-content p {
          margin: 0;
          font-family: "Inter", sans-serif;
          font-size: 1.02rem;
          line-height: 1.5;
          color: #000000;
          max-width: 520px;
        }

        .feature-attribution {
          margin-top: 12px !important;
          font-family: "Inter", sans-serif;
          font-size: 0.98rem !important;
          font-weight: 600;
          color: #1b1b1b;
        }

        .feature-content a {
          margin-top: 34px;
          width: fit-content;
          text-decoration: none;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          font-family: "Inter", sans-serif;
          font-size: 0.73rem;
          color: #000000;
        }

        @media (max-width: 1100px) {
          .quote-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }

        @media (max-width: 900px) {
          .feature-panel {
            grid-template-columns: 1fr;
          }

          .feature-content {
            padding: 34px 24px 38px;
          }
        }

        @media (max-width: 640px) {
          .testimonials-section {
            padding: 68px 16px;
          }

          .quote-grid {
            grid-template-columns: 1fr;
          }

          .quote-card {
            min-height: 280px;
            padding: 24px 20px;
          }

          .feature-media {
            min-height: 280px;
          }

          .feature-org {
            font-size: 1.7rem;
          }
        }
      `}</style>
    </section>
  );
}




