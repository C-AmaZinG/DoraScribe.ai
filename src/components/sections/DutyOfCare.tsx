"use client";

import React from "react";

function PracticeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 3.5L18.5 6.2V11C18.5 15.1 16 18.8 12 20.4C8 18.8 5.5 15.1 5.5 11V6.2L12 3.5Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.3 11.9L11.1 13.8L14.8 10.2"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ReviewIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="6.2" y="4.8" width="11.6" height="14.5" rx="2.2" stroke="currentColor" strokeWidth="1.8" />
      <path d="M9 9.1H15.1M9 12H13.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="14.7" cy="14.8" r="2.1" stroke="currentColor" strokeWidth="1.8" />
      <path d="M16.2 16.3L18 18.1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function PrivacyIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M8 3.8H14.2L18.2 7.8V19.1C18.2 20 17.5 20.7 16.6 20.7H8C7.1 20.7 6.4 20 6.4 19.1V5.4C6.4 4.5 7.1 3.8 8 3.8Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M14.2 3.8V7.8H18.2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <rect x="9.2" y="13.1" width="6.2" height="4.8" rx="1.2" stroke="currentColor" strokeWidth="1.8" />
      <path d="M10.7 13.1V11.9C10.7 11 11.4 10.3 12.3 10.3C13.2 10.3 13.9 11 13.9 11.9V13.1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

const complianceBadges = [
  "HIPAA COMPLIANT",
  "PIPEDA COMPLIANT",
  "POPIA COMPLIANT",
];

const trustItems = [
  {
    title: "Validated in practice",
    body: "We test and iterate our models in real-world scenarios to ensure DoraScribe remains accurate, reliable and clinically sound.",
    icon: PracticeIcon,
  },
  {
    title: "Deep clinical review",
    body: "Our medical team reviews and refines outputs, adding the reliability automation alone cannot provide.",
    icon: ReviewIcon,
  },
  {
    title: "Privacy, without shortcuts",
    body: "Our systems are built to the highest global standards, keeping every patient record secure, private, and protected.",
    icon: PrivacyIcon,
  },
];

export default function DutyOfCare() {
  return (
    <section className="duty-section">
      <div className="duty-shell">
        <div className="duty-top">
          <div className="duty-copy">
            <h2>Your duty of care, built in</h2>
            <p>
              We hold ourselves to the highest standard there is: the one you set when you care for
              patients.
            </p>
            <div className="badge-grid">
              {complianceBadges.map((badge) => (
                <span key={badge} className="badge-pill">
                  {badge}
                </span>
              ))}
            </div>
          </div>

        </div>

        <div className="duty-cards">
          {trustItems.map((item) => {
            const Icon = item.icon;
            return (
              <article className="duty-card" key={item.title}>
                <div className="card-icon">
                  <Icon className="icon-svg" />
                </div>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        .duty-section {
          padding: 0 24px 96px;
          background: #fdfcfa;
        }

        .duty-shell {
          max-width: 1200px;
          margin: 0 auto;
          border-radius: 34px;
          background: #f1eeed;
          padding: 52px;
          display: grid;
          gap: 38px;
        }

        .duty-top {
          display: grid;
          grid-template-columns: minmax(0, 1fr) auto;
          gap: 36px;
          align-items: end;
        }

        .duty-copy h2 {
          margin: 0;
          font-family: "Playfair Display", serif;
          font-size: clamp(2.3rem, 5vw, 4.4rem);
          line-height: 0.94;
          letter-spacing: -0.03em;
          color: #2a0016;
          white-space: nowrap;
        }

        .duty-copy p {
          margin: 16px 0 0;
          font-family: "Inter", sans-serif;
          font-size: 1.06rem;
          line-height: 1.5;
          color: #260e1d;
          max-width: 58ch;
        }

        .badge-grid {
          margin-top: 22px;
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 10px;
          max-width: 760px;
        }

        .badge-pill {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border-radius: 10px;
          background: #faf7f6;
          border: 1px solid rgba(39, 10, 26, 0.08);
          min-height: 40px;
          padding: 8px 10px;
          text-transform: uppercase;
          letter-spacing: 0.03em;
          font-family: "Inter", sans-serif;
          font-size: 0.68rem;
          font-weight: 700;
          color: #2a0016;
          text-align: center;
        }

        .duty-cards {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 16px;
        }

        .duty-card {
          border-radius: 18px;
          background: #f8f7f6;
          padding: 24px 24px 22px;
          border: 1px solid rgba(33, 8, 23, 0.08);
        }

        .card-icon {
          width: 46px;
          height: 46px;
          border-radius: 12px;
          background: #ffffff;
          border: 1px solid rgba(42, 0, 22, 0.12);
          display: inline-flex;
          align-items: center;
          justify-content: center;
          color: #2a0016;
        }

        .icon-svg {
          animation: icon-float 3.2s ease-in-out infinite;
        }

        .duty-card:nth-child(2) .icon-svg {
          animation-delay: 0.22s;
        }

        .duty-card:nth-child(3) .icon-svg {
          animation-delay: 0.44s;
        }

        @keyframes icon-float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-3px);
          }
        }

        .duty-card h3 {
          margin: 16px 0 10px;
          font-family: "Playfair Display", serif;
          font-size: 1.9rem;
          line-height: 1.05;
          letter-spacing: -0.02em;
          color: #2a0016;
        }

        .duty-card p {
          margin: 0;
          font-family: "Inter", sans-serif;
          font-size: 1rem;
          line-height: 1.5;
          color: #2b1321;
        }

        @media (max-width: 1080px) {
          .duty-shell {
            padding: 34px 26px;
          }

          .duty-top {
            grid-template-columns: 1fr;
            align-items: start;
          }

          .badge-grid {
            grid-template-columns: repeat(3, minmax(0, 1fr));
            max-width: none;
          }

          .duty-cards {
            grid-template-columns: 1fr;
          }

          .duty-card h3 {
            font-size: 1.7rem;
          }
        }

        @media (max-width: 680px) {
          .duty-section {
            padding: 0 16px 72px;
          }

          .badge-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

        }
      `}</style>
    </section>
  );
}
