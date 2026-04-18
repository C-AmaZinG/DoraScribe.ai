"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FAQ from "@/components/sections/FAQ";
import MakroButton from "@/components/ui/MakroButton";
import { AnimatePresence } from "framer-motion";

const tutorialCards = [
  {
    eyebrow: "How To Get Started",
    title: "Set up your Dorascribe account",
    description: "Get your workspace ready and start transcribing in minutes.",
    videoId: "R8Ytt90iFU8",
    duration: "1:45"
  },
  {
    eyebrow: "How to Transcribe",
    title: "Capture clinical notes effortlessly",
    description: "Turn patient conversations into accurate medical notes instantly.",
    videoId: "SfjUAceKG0o",
    duration: "2:20"
  },
  {
    eyebrow: "Workflow Design",
    title: "Creating Custom Note Templates",
    description: "Build templates that perfectly align with your unique clinical workflow.",
    videoId: "Xin6AIcSU9k",
    duration: "3:15"
  },
  {
    eyebrow: "Mobile Experience",
    title: "Notes on the go with your phone",
    description: "Master the mobile app to capture documentation anytime, anywhere.",
    videoId: "Xin6AIcSU9k",
    duration: "1:55"
  },
];

export default function TutorialsPage() {
  return (
    <div className="tutorials-page">
      <Header />
      <main className="tutorials-main">
        <section className="tutorials-library">
          <div className="page-shell">
            <div className="section-heading">
              <span className="section-kicker">Tutorial Library</span>
              <h2>Everything the old tutorials page offered, rebuilt for the new experience.</h2>
            </div>

            <div className="tutorial-grid">
              {tutorialCards.map((card, index) => (
                <motion.article
                  key={card.eyebrow}
                  className="tutorial-card card-with-embed"
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.45, delay: index * 0.06 }}
                >
                  <div className="card-video-mockup">
                    <iframe
                      width="100%"
                      height="100%"
                      src={`https://www.youtube.com/embed/${card.videoId}`}
                      title={card.title}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      referrerPolicy="strict-origin-when-cross-origin"
                      allowFullScreen
                      style={{ borderRadius: "12px" }}
                    ></iframe>
                  </div>

                  <div className="card-content">
                    <div className="card-header">
                      <span className="card-index">0{index + 1}</span>
                      <p className="card-eyebrow">{card.eyebrow}</p>
                    </div>
                    <h3>{card.title}</h3>
                    <p className="card-description">{card.description}</p>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <FAQ />

        <section className="tutorials-cta">
          <div className="page-shell">
            <motion.div
              className="cta-panel"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.5 }}
            >
              <span className="section-kicker kicker-light">Get Started</span>
              <h2>Do less admin, provide more care.</h2>
              <p>
                Convert clinical consultations into notes quickly and easily.
                Book a live demo and explore the features that set Dorascribe apart.
              </p>
              <div className="cta-actions">
                <MakroButton
                  text="Start Free Trial"
                  href="https://app.dorascribe.ai/signUp"
                  size="sm"
                  variant="secondary"
                />
                <Link href="/contact" className="cta-link">
                  Book a Demo
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />

      <style jsx>{`
        .tutorials-page {
          background:
            radial-gradient(circle at top left, rgba(52, 105, 183, 0.14), transparent 28%),
            linear-gradient(180deg, #f5f2ed 0%, #faf8f5 24%, #f4f6f9 100%);
          min-height: 100vh;
        }

        .tutorials-main {
          padding-top: 124px;
        }

        .page-shell {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 24px;
        }

        .tutorials-library,
        .tutorials-cta {
          padding: 34px 0 72px;
        }

        .section-heading {
          max-width: 780px;
          margin-bottom: 28px;
        }

        .section-kicker {
          display: inline-flex;
          align-items: center;
          width: fit-content;
          border-radius: 999px;
          padding: 8px 14px;
          font-family: "DM Sans", sans-serif;
          font-size: 0.78rem;
          font-weight: 700;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          background: #EBF8F8;
          color: #000000;
        }

        .section-heading h2,
        .cta-panel h2 {
          margin: 18px 0 0;
          font-family: "DM Sans", Georgia, sans-serif;
          color: #161616;
          letter-spacing: -0.04em;
          line-height: 0.95;
          font-size: clamp(2.4rem, 5vw, 4rem);
        }

        .tutorial-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 60px;
        }

        .tutorial-card {
          position: relative;
          display: flex;
          flex-direction: column;
          border-radius: 16px;
          background: #FFFFFF;
          border: 1px solid rgba(22, 22, 22, 0.08);
          box-shadow: 0 12px 32px rgba(0, 0, 0, 0.04);
          overflow: hidden;
          padding: 10px;
          transition: all 0.3s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .tutorial-card:hover {
          box-shadow: 0 42px 80px rgba(14, 20, 28, 0.12);
        }

        .card-video-mockup {
          position: relative;
          aspect-ratio: 16/9;
          overflow: hidden;
          background: #0b1121;
          border-radius: 12px;
        }

        .card-content {
          padding: 24px 28px 32px;
          background: #FFFFFF;
          flex-grow: 1;
        }

        .card-header {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 18px;
        }

        .card-index {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-width: 32px;
          height: 32px;
          border-radius: 50%;
          background: #f1ede7;
          color: #2c1810;
          font-family: "DM Sans", sans-serif;
          font-size: 0.75rem;
          font-weight: 700;
        }

        .card-eyebrow {
          margin: 0 !important;
          font-family: "DM Sans", sans-serif;
          font-size: 0.8rem;
          font-weight: 700;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          color: #000000;
        }

        .tutorial-card h3 {
          margin: 14px 0 0;
          font-family: "DM Sans", sans-serif;
          color: #161616;
          letter-spacing: -0.03em;
          font-size: 1.65rem;
          line-height: 1.3;
        }

        .card-description {
          margin: 14px 0 0;
          font-size: 1rem;
          line-height: 1.6;
          color: #4b5563;
          font-family: "DM Sans", sans-serif;
        }

        .tutorials-cta {
          padding-bottom: 96px;
        }

        .cta-panel {
          border-radius: 36px;
          padding: 42px;
          background:
            linear-gradient(135deg, rgba(21, 34, 48, 0.96), rgba(33, 70, 114, 0.92)),
            #16212e;
          color: #ffffff;
          border: 1px solid rgba(19, 26, 35, 0.08);
          box-shadow: 0 24px 60px rgba(14, 20, 28, 0.06);
        }

        .kicker-light {
          background: rgba(255, 255, 255, 0.12);
          color: rgba(255, 255, 255, 0.88);
        }

        .cta-panel h2,
        .cta-panel p {
          color: #ffffff;
        }

        .cta-panel p {
          max-width: 46ch;
          opacity: 0.82;
          margin: 18px 0 0;
          font-family: "DM Sans", sans-serif;
          line-height: 1.7;
        }

        .cta-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          margin-top: 28px;
        }

        .cta-link {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 44px;
          padding: 0 18px;
          border-radius: 999px;
          font-family: "DM Sans", sans-serif;
          font-weight: 600;
          text-decoration: none;
          background: rgba(255, 255, 255, 0.1);
          color: #ffffff;
          border: 1px solid rgba(255, 255, 255, 0.16);
          transition: all 0.2s ease;
        }

        .cta-link:hover {
          border-color: rgba(255, 140, 66, 0.5);
        }

        @media (max-width: 960px) {
          .tutorial-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 640px) {
          .page-shell {
            padding: 0 16px;
          }

          .tutorials-main {
            padding-top: 80px;
          }

          .cta-panel {
            padding: 22px;
            border-radius: 24px;
          }
        }
      `}</style>
    </div>
  );
}
