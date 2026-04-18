"use client";

import React from "react";
import { useTranslations } from "@/lib/translations/translations-context";

function PracticeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="8" r="7" />
      <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
    </svg>
  );
}

function ReviewIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function PrivacyIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
      <circle cx="12" cy="12" r="3" />
      <path d="M12 15v2" />
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
    body: "We test and iterate our models in real-world scenarios to ensure Dorascribe remains accurate, reliable and clinically sound.",
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
  const t = useTranslations();
  return (
    <section className="duty-section">
      <div className="duty-shell">
        <div className="duty-top">
          <div className="duty-copy">
            <h2>{t("Your duty of care, built in")}</h2>
            <p>
              {t("We hold ourselves to the highest standard there is: the one you set when you care for patients.")}
            </p>
            <div className="badge-grid">
              {complianceBadges.map((badge) => (
                <span key={badge} className="badge-pill">
                  {t(badge)}
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
                <h3>{t(item.title)}</h3>
                <p>{t(item.body)}</p>
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
          background: #F9F4F1;
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
          font-family: "DM Sans", sans-serif;
          font-size: clamp(2.3rem, 5vw, 4.4rem);
          line-height: 0.94;
          letter-spacing: -0.03em;
          color: #000000;
          white-space: nowrap;
        }

        .duty-copy p {
          margin: 16px 0 0;
          font-family: "DM Sans", sans-serif;
          font-size: 1.06rem;
          line-height: 1.5;
          color: #000000;
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
          font-family: "DM Sans", sans-serif;
          font-size: 0.68rem;
          font-weight: 700;
          color: #000000;
          text-align: center;
        }

        .duty-cards {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 16px;
        }

        .duty-card {
          border-radius: 18px;
          background: #FFFFFF;
          padding: 24px 24px 22px;
          border: 1px solid rgba(33, 8, 23, 0.08);
        }

        .card-icon {
          display: inline-block;
          margin-bottom: 4px;
          color: #000000;
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
          font-family: "DM Sans", sans-serif;
          font-size: 1.9rem;
          line-height: 1.05;
          letter-spacing: -0.02em;
          color: #000000;
        }

        .duty-card p {
          margin: 0;
          font-family: "DM Sans", sans-serif;
          font-size: 1rem;
          line-height: 1.5;
          color: #000000;
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
