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
  "Getting Started",
  "Using Dorascribe",
  "Security & Privacy",
] as const;

type Category = (typeof categories)[number];

const faqContent: Record<Category, FAQItem[]> = {
  General: [
    {
      q: "What is Dorascribe?",
      a: "Dorascribe is a medical transcription app that converts patient consultations into text for seamless integration with Electronic Medical Records (EMRs).",
    },
    {
      q: "How does Dorascribe work?",
      a: "Dorascribe utilizes a combination of large medical language models, artificial intelligence and web3 technologies to generate medical dictations, transcriptions, and chart notes. Simply speak into the app, and it will transcribe your voice into accurate and detailed medical notes.",
    },
    {
      q: "How much time will Dorascribe save me?",
      a: "The time saved will vary based on your individual workflow and the complexity of your medical cases. However, initial users have reported reducing their charting time by up to 60 to 70%. On average, users can expect to save 2 to 3 hours daily.",
    },
    {
      q: "What specialties is Dorascribe designed for?",
      a: "Dorascribe is designed for a wide range of healthcare professionals, offering AI-powered medical transcription tailored to different specialties. Whether you’re a doctor, surgeon, psychiatrist, physiotherapist, massage therapist, optometrist, or specialize in another area, Dorascribe provides structured note formats to fit your practice.",
    },
    {
      q: "How accurate is Dorascribe?",
      a: "Dorascribe’s AI-powered technology delivers over 99% accuracy for clear recordings and continues to learn and improve with usage.",
    },
  ],
  "Getting Started": [
    {
      q: "Does Dorascribe work on multiple devices?",
      a: "Yes. Dorascribe supports multiple devices including smartphones, tablets and computers.",
    },
    {
      q: "What browser should I use?",
      a: "While all commonly used browsers are supported, we recommend using Google Chrome for the best Dorascribe experience, including for Apple device users.",
    },
    {
      q: "Does it support multiple languages?",
      a: "Yes. We support transcription in Spanish, French, Italian, German, Portuguese and English. After your note is generated, you can also ask the AI to translate it to any language you want in the “interact with note” section.",
    },
  ],
  "Using Dorascribe": [
    {
      q: "How are errors addressed?",
      a: "Dorascribe addresses potential errors in transcriptions through advanced algorithms and user-editing capabilities, ensuring a high level of accuracy in the final output.",
    },
    {
      q: "Any tips for best recording results?",
      a: "If you’re using Dorascribe on a desktop or laptop, make sure the microphone is turned on. You can also use an external microphone for clearer audio. On a mobile device, keep the screen active and avoid letting it go to sleep.",
    },
    {
      q: "How long are notes kept?",
      a: "Notes are kept for 28 days to comply with HIPAA guidelines and allow time for EMR transfers. They stay in your inbox for 14 days, then move to the trash for another 14 days before permanent deletion.",
    },
  ],
  "Security & Privacy": [
    {
      q: "Is my data secure and HIPAA-compliant?",
      a: "Yes. Dorascribe prioritizes the confidentiality and integrity of your medical data. We adhere to the highest security standards and HIPAA regulations, employing robust encryption, de-identification measures, and Google authentication to protect patient privacy and ensure data remains anonymous.",
    },
    {
      q: "Is my payment information secure?",
      a: "Your payment information is fully secure. Dorascribe uses Stripe, a globally trusted and PCI-DSS Level 1 certified payment processor, to handle all transactions.",
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
          <p className="faq-title">
            We have the <mark>answers</mark>
          </p>

          <p className="faq-subtitle">
            Have questions about Dorascribe? Our FAQ provides the information you need to maximize your medical documentation efficiency.
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
                  style={{ position: "relative", zIndex: 1, backgroundColor: "transparent" }}
                >
                  <span style={{ position: "relative", zIndex: 2 }}>{category}</span>
                  {activeCategory === category && (
                    <motion.div
                      layoutId="faq-active-highlight"
                      initial={false}
                      transition={{ type: "spring", stiffness: 450, damping: 35 }}
                      style={{
                        position: "absolute",
                        inset: 0,
                        backgroundColor: "#fff",
                        borderTopLeftRadius: idx === 0 ? 16 : 4,
                        borderBottomLeftRadius: idx === categories.length - 1 ? 16 : 4,
                        borderTopRightRadius: 4,
                        borderBottomRightRadius: 4,
                        zIndex: 0,
                      }}
                      className="faq-active-bg"
                    />
                  )}
                </button>
              ))}
            </aside>
          </div>

          <motion.div layout transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }} className="faq-main">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.div
                key={activeCategory}
                layout
                initial={{ opacity: 0, x: 10, filter: "blur(4px)" }}
                animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, x: -10, filter: "blur(4px)" }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
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

            <motion.div layout transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }} className="faq-contact">
              <div className="faq-contact-copy">
                <span className="faq-contact-chip">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  </svg>
                  Let's connect
                </span>

                <p className="faq-contact-title">Still have questions? We're here to help.</p>

                <p className="faq-contact-text">
                  If you have unique practice setups, EMR integrations, or require
                  custom workflows, our team can tailor Dorascribe to your needs.
                </p>

                <MakroButton text="Contact us" href="https://dorascribe.ai/contact-us/" className="faq-contact-default-btn" />
              </div>
            </motion.div>
          </motion.div>
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
          background: #EBF8F8;
          color: #000000;
          border-radius: 14px;
          padding: 0 16px 5px;
        }

        .faq-subtitle {
          margin: 14px auto 0;
          max-width: 560px;
          font-family: "DM Sans", sans-serif;
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
          font-family: "DM Sans", sans-serif;
          font-size: 1rem;
          color: #8E8E8E;
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
          font-family: "DM Sans", sans-serif;
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
          font-family: "DM Sans", sans-serif;
          font-size: 1rem;
          line-height: 1.55;
          color: #8E8E8E;
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
          display: flex;
          flex-direction: column;
        }

        .faq-contact-chip {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          padding: 5px 10px;
          border-radius: 999px;
          background: #ebeff5;
          color: var(--text-main);
          font-family: "DM Sans", sans-serif;
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
          margin-bottom: 44px;
          max-width: 640px;
          font-family: "DM Sans", sans-serif;
          font-size: 0.92rem;
          line-height: 1.55;
          color: var(--text-muted);
        }

        .faq-contact-default-btn {
          margin-top: 0;
          align-self: flex-start;
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
          .faq-active-bg {
            border-radius: 10px !important;
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


