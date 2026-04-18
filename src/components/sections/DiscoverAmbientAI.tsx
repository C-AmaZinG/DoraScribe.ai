"use client";

import React from "react";
import Image from "next/image";
import { useTranslations } from "@/lib/translations/translations-context";

const featureRows = [
  {
    title: "Engage Your Patients",
    description:
      "Eliminate note-taking distractions, allowing you to focus on your patients and foster meaningful connections.",
    image: "/assets/discover-engage.svg",
  },
  {
    title: "Maximize Your Efficiency",
    description:
      "Instantly capture live conversations with your patient or dictate a summary of the interaction.",
    image: "/assets/discover-efficiency.svg",
  },
  {
    title: "Enhance Your Precision",
    description:
      "Reduce errors and enhance data accuracy with our AI medical scribe, ensuring your notes are detailed and compliant.",
    image: "/assets/discover-precision.svg",
  },
  {
    title: "Adapt to Your Needs",
    description:
      "Customize templates and workflows to suit your specific practice, making documentation tailored and efficient.",
    image: "/assets/discover-adapt.svg",
  },
];

export default function DiscoverAmbientAI() {
  const t = useTranslations();
  return (
    <section className="discover-section">
      <div className="discover-shell">
        <div className="discover-heading">
          <h2>{t("Why Choose Dorascribe?")}</h2>
          <p>
            {t("Streamline your workflow and enhance patient interactions with these benefits.")}
          </p>
        </div>

        <div className="discover-grid">
          {featureRows.map((row) => (
            <article className="discover-row" key={row.title}>
              <div className="discover-media">
                <Image
                  src={row.image}
                  alt={t(row.title)}
                  fill
                  sizes="(max-width: 900px) 100vw, 50vw"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div className="discover-copy">
                <h3>{t(row.title)}</h3>
                <p>{t(row.description)}</p>
              </div>
            </article>
          ))}
        </div>
      </div>

      <style jsx>{`
        .discover-section {
          padding: 90px 24px;
          background: #fdfcfa;
        }

        .discover-shell {
          max-width: 1200px;
          margin: 0 auto;
        }

        .discover-heading {
          max-width: 800px;
          margin-bottom: 34px;
        }

        .discover-heading h2 {
          margin: 0;
          font-family: "DM Sans", sans-serif;
          font-size: clamp(2.4rem, 4vw, 3.5rem) !important;
          line-height: 1.03;
          letter-spacing: -0.02em;
          color: #1a1018;
        }

        .discover-heading > p {
          margin: 14px 0 0;
          font-family: "DM Sans", sans-serif;
          font-size: 1.03rem;
          color: #2a2830;
          line-height: 1.55;
          max-width: 64ch;
        }

        .discover-grid {
          display: grid;
          gap: 18px;
        }

        .discover-row {
          display: grid;
          grid-template-columns: 46% 54%;
          align-items: center;
          gap: 28px;
          border-radius: 16px;
          overflow: hidden;
          background: #f2f2f2;
          padding: 12px;
        }

        .discover-media {
          position: relative;
          min-height: 350px;
          height: 100%;
          border-radius: 10px;
          overflow: hidden;
        }

        .discover-copy {
          padding: 24px 24px 24px 10px;
        }

        .discover-copy h3 {
          margin: 0 0 14px;
          font-family: "DM Sans", sans-serif;
          font-size: clamp(2rem, 3.2vw, 2.8rem) !important;
          line-height: 1.02;
          font-weight: 500 !important;
          letter-spacing: -0.02em;
          color: #0e131f;
        }

        .discover-copy p {
          margin: 0;
          font-family: "DM Sans", sans-serif;
          font-size: clamp(1.05rem, 1.4vw, 1.2rem);
          color: #1f2430;
          line-height: 1.45;
          max-width: 34ch;
        }

        @media (max-width: 980px) {
          .discover-row {
            grid-template-columns: 1fr;
            gap: 0;
            padding: 10px;
          }

          .discover-media {
            min-height: 240px;
          }

          .discover-shell {
            max-width: 680px;
          }

          .discover-copy {
            padding: 20px 14px 18px;
          }
        }

        @media (max-width: 640px) {
          .discover-section {
            padding: 72px 16px;
          }
        }
      `}</style>
    </section>
  );
}
