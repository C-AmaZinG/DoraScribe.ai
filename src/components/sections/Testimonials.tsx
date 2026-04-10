"use client";

import React from "react";

const baseQuotes = [
  {
    quote: "I finish clinic with charting already done, and that has changed my evenings completely. Dorascribe captures the details accurately without breaking my flow with patients.",
    name: "Lara M.",
    role: "Family Physician",
    initials: "LM",
    avatarColor: "#9EC5F8",
  },
  {
    quote: "The note quality is consistently strong, even on complex follow-ups. I spend less time correcting documentation and more time discussing treatment decisions with patients.",
    name: "Nora I.",
    role: "Internal Medicine Physician",
    initials: "NI",
    avatarColor: "#B8C7D9",
  },
  {
    quote: "Our team adopted Dorascribe quickly because it fits naturally into the visit. Documentation feels lighter, and we can stay focused on delivering safe, attentive care.",
    name: "Chinelo A.",
    role: "Family Medicine Physician",
    initials: "CA",
    avatarColor: "#F3A78C",
  },
  {
    quote: "What I value most is how reliable the summaries are after emotionally demanding sessions. It helps me preserve energy for patients instead of spending it all on admin work.",
    name: "Ruth E.",
    role: "Clinical Psychologist",
    initials: "RE",
    avatarColor: "#C7C2EA",
  },
  {
    quote: "Dorascribe seamlessly integrates into our daily routine. The ease of use and accuracy empower our clinical team to maintain high patient care standards.",
    name: "Samuel K.",
    role: "Neurologist",
    initials: "SK",
    avatarColor: "#00AAAA",
  },
  {
    quote: "A game changer for patient engagement. I can actually look at my patients instead of my screen. The emotional connection I've reclaimed is invaluable.",
    name: "Alice R.",
    role: "Pediatrician",
    initials: "AR",
    avatarColor: "#06D6A0",
  },
  {
    quote: "The immediate return on investment was obvious. Time saved on charting translates directly to more patients seen and fewer late nights.",
    name: "David H.",
    role: "Orthopedic Surgeon",
    initials: "DH",
    avatarColor: "#EF476F",
  },
  {
    quote: "It captures the nuances of psychiatric evaluation perfectly. I never worry about a missed detail when reviewing past sessions.",
    name: "Rachel T.",
    role: "Psychiatrist",
    initials: "RT",
    avatarColor: "#118AB2",
  },
  {
    quote: "I've tried other scribes, but this is the most intuitive. It understands medical jargon out of the box and requires almost no edits.",
    name: "James F.",
    role: "Dermatologist",
    initials: "JF",
    avatarColor: "#073B4C",
  }
];

const col1Items = [baseQuotes[0], baseQuotes[1], baseQuotes[2]];
const col2Items = [baseQuotes[3], baseQuotes[4], baseQuotes[5]];
const col3Items = [baseQuotes[6], baseQuotes[7], baseQuotes[8]];

export default function Testimonials() {
  return (
    <section id="testimonials" className="testimonials-section">
      <div className="testimonials-shell">
        <div className="header-container">
          <h2 className="section-title">Don't just take our word for it.</h2>
          <p className="section-subtitle">
            See how Dorascribe is transforming practices across various specialties.
          </p>
        </div>

        <div className="marquee-wrapper">
          {/* Column 1 - Up */}
          <div className="marquee-col marquee-up">
            <div className="marquee-inner">
              {col1Items.map((card, idx) => (
                <article key={`c1-a-${idx}`} className="quote-card">
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
            <div className="marquee-inner" aria-hidden="true">
              {col1Items.map((card, idx) => (
                <article key={`c1-b-${idx}`} className="quote-card">
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
          </div>

          {/* Column 2 - Down */}
          <div className="marquee-col marquee-down">
            <div className="marquee-inner">
              {col2Items.map((card, idx) => (
                <article key={`c2-a-${idx}`} className="quote-card">
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
            <div className="marquee-inner" aria-hidden="true">
              {col2Items.map((card, idx) => (
                <article key={`c2-b-${idx}`} className="quote-card">
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
          </div>

          {/* Column 3 - Up */}
          <div className="marquee-col marquee-up">
            <div className="marquee-inner">
              {col3Items.map((card, idx) => (
                <article key={`c3-a-${idx}`} className="quote-card">
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
            <div className="marquee-inner" aria-hidden="true">
              {col3Items.map((card, idx) => (
                <article key={`c3-b-${idx}`} className="quote-card">
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
          </div>
        </div>
      </div>

      <style jsx>{`
        .testimonials-section {
          background: #fdfcfa;
          padding: 120px 24px;
          position: relative;
        }

        .testimonials-shell {
          max-width: 1280px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .header-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          margin-bottom: 64px;
        }

        .section-title {
          font-family: "Playfair Display", Georgia, serif;
          font-size: clamp(36px, 5vw, 56px);
          font-weight: 500;
          color: #1c1c1c;
          margin: 0 0 16px 0;
          letter-spacing: -0.02em;
        }

        .section-subtitle {
          font-family: 'Inter', sans-serif;
          font-size: clamp(17px, 2vw, 20px);
          color: rgba(28, 28, 28, 0.5);
          font-weight: 300;
          max-width: 600px;
          line-height: 1.6;
        }

        /* --- Marquee Setup --- */
        .marquee-wrapper {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
          height: 800px;
          overflow: hidden;
          width: 100%;
          /* Add subtle fade masks at top and bottom */
          mask-image: linear-gradient(to bottom, transparent, black 10%, black 90%, transparent);
          -webkit-mask-image: linear-gradient(to bottom, transparent, black 10%, black 90%, transparent);
        }

        .marquee-col {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .marquee-inner {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        /* Animations */
        .marquee-up {
          animation: slideUp 40s linear infinite;
        }
        
        .marquee-down {
          animation: slideDown 40s linear infinite;
        }

        @keyframes slideUp {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(-50%);
          }
        }

        @keyframes slideDown {
          0% {
            transform: translateY(-50%);
          }
          100% {
            transform: translateY(0);
          }
        }

        /* Pause on hover (optional, user might like it) */
        .marquee-wrapper:hover .marquee-up,
        .marquee-wrapper:hover .marquee-down {
          animation-play-state: paused;
        }

        /* --- Cards --- */
        .quote-card {
          background: #ffffff;
          border-radius: 20px;
          padding: 32px;
          display: flex;
          flex-direction: column;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.03);
          border: 1px solid rgba(0, 0, 0, 0.04);
        }

        .quote {
          margin: 0 0 32px;
          font-family: "Inter", sans-serif;
          font-size: 1.05rem;
          line-height: 1.6;
          color: #2d2d2d;
          flex: 1;
        }

        .person {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .avatar {
          width: 48px;
          height: 48px;
          border-radius: 999px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: "Inter", sans-serif;
          font-size: 0.9rem;
          font-weight: 700;
          color: #000000;
        }

        .name {
          margin: 0;
          font-family: "Inter", sans-serif;
          font-size: 1.05rem;
          font-weight: 600;
          color: #1c1c1c;
        }

        .role {
          margin: 4px 0 0;
          font-family: "Inter", sans-serif;
          letter-spacing: 0.02em;
          font-size: 0.85rem;
          color: rgba(28, 28, 28, 0.5);
        }

        @media (max-width: 900px) {
          .marquee-wrapper {
            grid-template-columns: repeat(2, 1fr);
            height: 700px;
          }
          /* Hide the third column on tablets/small screens to maintain aesthetic */
          .marquee-col:nth-child(3) {
            display: none;
          }
        }

        @media (max-width: 600px) {
          .marquee-wrapper {
            grid-template-columns: 1fr;
            height: 600px;
          }
          /* Hide second column on mobile */
          .marquee-col:nth-child(2) {
            display: none;
          }
          .testimonials-section {
            padding: 80px 16px;
          }
        }
      `}</style>
    </section>
  );
}
