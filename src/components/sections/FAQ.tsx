"use client";

import React, { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import MakroButton from "@/components/ui/MakroButton";

type FAQItem = {
  q: string;
  a: string;
};

const categories = [
  "General",
  "Forecasting",
  "Setup & integrations",
  "Security and privacy",
] as const;

type Category = (typeof categories)[number];

const faqContent: Record<Category, FAQItem[]> = {
  General: [
    {
      q: "What makes Makro different from a normal dashboard?",
      a: "It's built for decisions, not reporting. Instead of only showing charts, it explains what matters, what changed, and what you should review next.",
    },
    {
      q: "How does the AI help (in plain English)?",
      a: "It categorizes and summarizes activity, highlights what's unusual, explains drivers behind changes, and turns raw transactions into an actionable weekly finance brief.",
    },
    {
      q: "Does Makro replace my accountant or bookkeeper?",
      a: "No. Makro complements them by keeping your internal view clean and current so month-end is easier and decisions are faster.",
    },
    {
      q: "What problems does it solve day-to-day?",
      a: "Forecasting cash flow, organizing expenses, tracking invoice status, spotting anomalies, and keeping a clear weekly view of what changed in your finances.",
    },
    {
      q: "Who is Makro for?",
      a: "Small teams, agencies, and digital businesses that want clear visibility into runway, upcoming bills, and spend drivers, especially if finance is handled part-time.",
    },
    {
      q: "What is Makro?",
      a: "Makro is an AI-powered finance workspace that helps operators and founders stay on top of cash flow, expenses, and invoices without living in spreadsheets.",
    },
  ],
  Forecasting: [
    {
      q: "How often does forecasting update?",
      a: "Forecasts refresh as new transactions and invoice events come in, so your view stays current without manual spreadsheet updates.",
    },
    {
      q: "Can I model different scenarios?",
      a: "Yes. You can compare best-case, expected, and downside assumptions to understand runway and cash timing before making decisions.",
    },
    {
      q: "Does it account for recurring revenue and costs?",
      a: "It recognizes recurring patterns and scheduled obligations, then rolls them into projections to reduce surprises.",
    },
    {
      q: "Will it flag anomalies early?",
      a: "Yes. Unusual movements are highlighted with context so you can investigate quickly and avoid downstream cash issues.",
    },
  ],
  "Setup & integrations": [
    {
      q: "How long does setup take?",
      a: "Most teams can connect data sources and see their first dashboard in minutes, not days.",
    },
    {
      q: "Can I connect accounting tools and banks?",
      a: "Yes. Makro supports integrations across core finance tools and data providers to keep information centralized.",
    },
    {
      q: "Can teams share one workspace?",
      a: "Absolutely. Workspaces support collaboration so founders, operators, and finance leads can work from the same source of truth.",
    },
    {
      q: "Do I need technical help to get started?",
      a: "No. The onboarding flow is designed for non-technical users, with support available if you need custom setup.",
    },
  ],
  "Security and privacy": [
    {
      q: "How is financial data protected?",
      a: "Data is encrypted in transit and at rest, with strict access controls and environment hardening across infrastructure.",
    },
    {
      q: "Can I manage team permissions?",
      a: "Yes. Role-based access lets you control who can view, edit, or export information across your workspace.",
    },
    {
      q: "Do you share customer data with third parties?",
      a: "No. Customer financial data is not sold or repurposed, and integrations follow scoped permissions.",
    },
    {
      q: "Is there auditability for critical actions?",
      a: "Yes. Key actions can be tracked so teams have visibility and accountability over important workflow changes.",
    },
  ],
};

function PlusIcon({ open }: { open: boolean }) {
  return (
    <motion.span
      className="faq-plus"
      aria-hidden="true"
      initial={false}
      animate={{
        rotate: open ? 45 : 0,
        scale: open ? [1, 1.14, 1] : [1, 0.92, 1],
        opacity: open ? 1 : 0.7,
      }}
      transition={{
        rotate: { type: "spring", stiffness: 360, damping: 24 },
        scale: { duration: 0.28, ease: [0.16, 1, 0.3, 1] },
        opacity: { duration: 0.2 },
      }}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <line x1="12" y1="5" x2="12" y2="19" />
        <line x1="5" y1="12" x2="19" y2="12" />
      </svg>
    </motion.span>
  );
}

export default function FAQ() {
  const [activeCategory, setActiveCategory] = useState<Category>("General");
  const [openIndex, setOpenIndex] = useState(0);

  const items = useMemo(() => faqContent[activeCategory], [activeCategory]);

  return (
    <section id="faq" className="faq-makro-clone">
      <div className="faq-wrap">
        <div className="faq-head">
          <span className="faq-chip">
            <span className="faq-chip-icon">?</span>
            FAQ
          </span>

          <p className="faq-title">
            We have the <mark>answers</mark>
          </p>

          <p className="faq-subtitle">
            Simple plans for founders and teams. No contracts, no hidden fees.
            Upgrade, downgrade, or cancel anytime.
          </p>
        </div>

        <div className="faq-shell">
          <div className="faq-side">
            <aside className="faq-cats">
              {categories.map((category, idx) => (
                <button
                  key={category}
                  type="button"
                  className={`faq-cat ${activeCategory === category ? "is-active" : ""} ${
                    idx === 0 ? "is-first" : ""
                  } ${idx === categories.length - 1 ? "is-last" : ""}`}
                  onClick={() => {
                    setActiveCategory(category);
                    setOpenIndex(0);
                  }}
                >
                  {category}
                </button>
              ))}
            </aside>
          </div>

          <div className="faq-main">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="faq-list"
              >
                {items.map((item, idx) => {
                  const isOpen = idx === openIndex;
                  return (
                    <div key={item.q} className={`faq-item ${isOpen ? "is-open" : ""}`}>
                      <button
                        type="button"
                        className="faq-q"
                        onClick={() => setOpenIndex(isOpen ? -1 : idx)}
                      >
                        <span>{item.q}</span>
                        <PlusIcon open={isOpen} />
                      </button>

                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                          >
                            <div className="faq-a-wrap">
                              <p className="faq-a">{item.a}</p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </motion.div>
            </AnimatePresence>

            <div className="faq-contact">
              <div className="faq-contact-copy">
                <span className="faq-contact-chip">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  </svg>
                  Let's connect
                </span>

                <p className="faq-contact-title">Still have questions? We're here to help.</p>

                <p className="faq-contact-text">
                  If you manage high transaction volumes, multiple entities, or require
                  custom integrations, our team can tailor Makro to your needs.
                </p>

                <MakroButton text="Contact us" href="/contact" className="faq-contact-default-btn" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .faq-makro-clone {
          padding: 100px 24px;
          background: #FDFCFA;
        }

        .faq-wrap {
          max-width: 1028px;
          margin: 0 auto;
        }

        .faq-head {
          text-align: center;
          margin-bottom: 32px;
        }

        .faq-chip {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 6px 11px;
          border: 1px solid rgba(140, 149, 170, 0.25);
          border-radius: 999px;
          background: #f5f7fb;
          color: var(--text-main);
          font-family: "Inter", sans-serif;
          font-size: 0.75rem;
          font-weight: 500;
        }

        .faq-chip-icon {
          width: 14px;
          height: 14px;
          border-radius: 999px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: #e8edf4;
          color: var(--text-main);
          font-size: 0.67rem;
        }

        .faq-title {
          margin: 18px auto 0;
          font-family: var(--font-heading);
          font-size: clamp(2.5rem, 5vw, 4rem);
          font-weight: 400;
          line-height: 1.05;
          letter-spacing: -0.04em;
          color: var(--text-main);
        }

        .faq-title mark {
          display: inline-block;
          margin-left: 2px;
          background: #E6DE69;
          color: var(--text-main);
          border-radius: 14px;
          padding: 0 16px 5px;
        }

        .faq-subtitle {
          margin: 14px auto 0;
          max-width: 560px;
          font-family: "Inter", sans-serif;
          font-size: 1.05rem;
          line-height: 1.55;
          color: var(--text-muted);
          text-wrap: pretty;
        }

        .faq-shell {
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(0, 3fr);
          align-items: start;
          gap: 0;
          overflow: visible;
        }

        .faq-side {
          align-self: stretch;
          display: flex;
          flex-direction: column;
          padding: 0 0 48px;
          min-width: 0;
        }

        .faq-cats {
          background: #F9F4F1;
          padding: 8px 0 8px 8px;
          border-radius: 24px 0 0 24px;
          display: flex;
          flex-direction: column;
          gap: 0;
          position: sticky;
          top: 96px;
          align-self: start;
          z-index: 2;
          width: 100%;
          overflow: visible;
        }

        .faq-cats::before,
        .faq-cats::after {
          content: "";
          position: absolute;
          right: 0;
          width: 24px;
          height: 24px;
          background: radial-gradient(circle at 0 0, transparent 0 68%, #F9F4F1 69% 100%);
          pointer-events: none;
        }

        .faq-cats::before {
          top: -24px;
          transform: rotate(90deg);
        }

        .faq-cats::after {
          bottom: -24px;
          transform: rotate(180deg);
        }

        .faq-cat {
          border: 0;
          background: transparent;
          text-align: left;
          width: 100%;
          padding: 24px;
          cursor: pointer;
          font-family: "Inter", sans-serif;
          font-size: 1rem;
          color: rgba(11, 29, 51, 0.48);
          transition: background-color 0.2s ease, color 0.2s ease;
        }

        .faq-cat.is-first {
          border-top-left-radius: 16px;
          border-top-right-radius: 4px;
          border-bottom-left-radius: 4px;
          border-bottom-right-radius: 4px;
        }

        .faq-cat.is-last {
          border-bottom-left-radius: 16px;
          border-bottom-right-radius: 4px;
          border-top-left-radius: 4px;
          border-top-right-radius: 4px;
        }

        .faq-cat.is-active {
          background: #fff;
          color: var(--text-main);
        }

        .faq-main {
          background: #F9F4F1;
          border-radius: 0 24px 24px 24px;
          padding: 8px;
          display: flex;
          flex-direction: column;
          gap: 0;
        }

        .faq-list {
          display: flex;
          flex-direction: column;
          gap: 0;
          background: #F9F4F1;
        }

        .faq-item {
          background: #fff;
          border-radius: 8px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          gap: 0;
          padding: 24px 28px;
        }

        .faq-item + .faq-item {
          margin-top: 6px;
        }

        .faq-item.is-open {
          gap: 12px;
        }

        .faq-q {
          width: 100%;
          border: 0;
          background: transparent;
          padding: 0;
          cursor: pointer;
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 16px;
          text-align: left;
        }

        .faq-q span:first-child {
          font-family: "Playfair Display", serif;
          font-size: 24px;
          font-weight: 400;
          line-height: 1.35;
          color: var(--text-main);
          letter-spacing: -0.015em;
        }

        .faq-plus {
          width: 18px;
          height: 18px;
          flex-shrink: 0;
          color: var(--text-main);
          opacity: 0.7;
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }

        .faq-a-wrap {
          padding: 0;
          max-width: 600px;
        }

        .faq-a {
          font-family: "Inter", sans-serif;
          font-size: 1rem;
          line-height: 1.55;
          color: var(--text-muted);
        }

        .faq-contact {
          margin-top: 6px;
          background: #fff;
          border-radius: 16px;
          display: block;
          min-height: auto;
          overflow: hidden;
          padding: 0 36px;
        }

        .faq-contact-copy {
          padding: 36px 0;
        }

        .faq-contact-chip {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          padding: 5px 10px;
          border-radius: 999px;
          background: #ebeff5;
          color: var(--text-main);
          font-family: "Inter", sans-serif;
          font-size: 0.75rem;
          font-weight: 500;
        }

        .faq-contact-title {
          margin-top: 20px;
          font-family: var(--font-heading);
          font-size: clamp(1.5rem, 2.6vw, 2rem);
          font-weight: 400;
          line-height: 1.2;
          letter-spacing: -0.02em;
          color: var(--text-main);
          text-wrap: balance;
          max-width: 640px;
        }

        .faq-contact-text {
          margin-top: 10px;
          max-width: 640px;
          font-family: "Inter", sans-serif;
          font-size: 0.92rem;
          line-height: 1.55;
          color: var(--text-muted);
        }

        .faq-contact-default-btn {
          margin-top: 36px;
        }

        @media (max-width: 1020px) {
          .faq-shell {
            grid-template-columns: 1fr;
            gap: 12px;
          }

          .faq-side {
            padding: 0;
          }

          .faq-cats {
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 2px;
            position: static;
            top: auto;
            border-radius: 14px;
            padding: 4px;
          }

          .faq-cats::before,
          .faq-cats::after {
            display: none;
          }

          .faq-cat,
          .faq-cat.is-first,
          .faq-cat.is-last {
            border-radius: 10px;
          }

          .faq-main {
            border-radius: 18px;
            padding: 4px;
          }
        }

        @media (max-width: 720px) {
          .faq-makro-clone {
            padding: 92px 16px;
          }

          .faq-q {
            padding: 0;
          }

          .faq-item {
            padding: 18px 16px;
          }

          .faq-a-wrap {
            max-width: 100%;
          }

          .faq-contact {
            padding: 0 16px;
          }

          .faq-contact-copy {
            padding: 18px 0 20px;
          }
        }
      `}</style>
    </section>
  );
}

