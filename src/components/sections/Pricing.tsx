"use client";

import React from "react";
import MakroButton from "@/components/ui/MakroButton";

type Plan = {
  name: string;
  description: string;
  priceLabel: string;
  features: string[];
};

const plans: Plan[] = [
  {
    name: "Free Trial",
    description: "No credit card needed",
    priceLabel: "FREE",
    features: [
      "20 Transcripts/Month",
      "Standard Email Support",
      "Default Note Templates",
    ],
  },
  {
    name: "Essential",
    description: "$399 billed annually",
    priceLabel: "$39/month",
    features: [
      "150 Transcripts/Month",
      "Priority Email Support",
      "Custom Note Templates",
      "Unlimited Ask Dora Feature",
      "Prescription Generation",
    ],
  },
  {
    name: "Professional",
    description: "$599 billed annually",
    priceLabel: "$59/month",
    features: [
      "300 Transcripts/Month",
      "Priority Phone & Email Support",
      "Custom Note Templates",
      "Unlimited Ask Dora Feature",
      "Prescription Generation",
    ],
  },
  {
    name: "Premium",
    description: "$899 billed annually",
    priceLabel: "$89/month",
    features: [
      "Unlimited Transcripts",
      "Priority Phone & Email Support",
      "1:1 Onboarding Support",
      "Custom Note Templates",
      "Unlimited Ask Dora Feature",
      "Prescription Generation",
    ],
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="pricing-clone">
      <div className="pricing-wrap">
        <div className="pricing-top">
          <span className="section-chip">
            <span className="chip-dot" />
            Pricing
          </span>

          <p className="pricing-title">
            Your smart finance assistant,{" "}
            <mark>
              <span>starting free</span>
            </mark>
          </p>

          <p className="pricing-subtitle">
            Simple plans for founders and teams. No contracts, no hidden fees.
            Upgrade, downgrade, or cancel anytime.
          </p>
        </div>

        <div className="pricing-board">
          <div className="pricing-cards">
            {plans.map((plan) => (
              <article key={plan.name} className="pricing-card">
                <div className="plan-copy">
                  <p className="plan-name">{plan.name}</p>
                  <p className="plan-description">{plan.description}</p>
                  <p className="plan-price">{plan.priceLabel}</p>
                </div>

                <MakroButton
                  text="Get Started"
                  href="https://app.dorascribe.ai/signUp"
                  className="plan-default-btn"
                  tone={plan.name === "Free Trial" ? "gray" : "default"}
                />

                <ul className="feature-list">
                  {plan.features.map((feature, idx) => {
                    return (
                      <li key={feature} className="feature-row">
                        <span className="feature-icon check">
                          <svg
                            viewBox="0 0 24 24"
                            width="14"
                            height="14"
                            aria-hidden="true"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M20 6L9 17l-5-5" />
                          </svg>
                        </span>
                        <span>{feature}</span>
                      </li>
                    );
                  })}
                </ul>
              </article>
            ))}
          </div>

          <div className="enterprise-row">
            <div className="enterprise-copy">
              <span className="section-chip enterprise-chip">
                <span className="chip-dot" />
                Enterprise plans
              </span>
              <p className="enterprise-title">Get custom pricing</p>
              <p className="enterprise-subtitle">
                If you manage high transaction volumes, multiple entities, or require
                custom integrations, our team can tailor Makro to your needs.
              </p>
            </div>

            <MakroButton text="Contact sales" href="/contact" className="enterprise-default-btn" />
          </div>
        </div>
      </div>

      <style jsx>{`
        .pricing-clone {
          padding: 120px 24px;
          background: #ebeff5;
        }

        .pricing-wrap {
          max-width: 1030px;
          margin: 0 auto;
        }

        .pricing-top {
          text-align: center;
          margin-bottom: 18px;
        }

        .section-chip {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 6px 12px;
          border-radius: 999px;
          background: #f6f8fc;
          border: 1px solid rgba(140, 149, 170, 0.28);
          font-family: "Inter", sans-serif;
          font-size: 0.76rem;
          color: #656c80;
          line-height: 1;
        }

        .chip-dot {
          width: 8px;
          height: 8px;
          border-radius: 999px;
          background: #98a2b3;
        }

        .pricing-title {
          margin: 20px auto 0;
          max-width: 620px;
          font-family: "Playfair Display", serif !important;
          font-size: clamp(2.25rem, 5vw, 3.45rem);
          font-weight: 400;
          letter-spacing: -0.04em;
          line-height: 1.05;
          color: #21222f;
          text-wrap: balance;
        }

        .pricing-title mark {
          display: inline-block;
          background: #d9ff5c;
          border-radius: 14px;
          padding: 0 16px 5px;
        }

        .pricing-title mark span {
          color: #161a28;
          font-family: inherit;
        }

        .pricing-subtitle {
          margin: 14px auto 0;
          max-width: 560px;
          font-family: "Inter", sans-serif;
          font-size: 1.05rem;
          line-height: 1.5;
          color: rgba(54, 56, 71, 0.7);
          text-wrap: pretty;
        }

        .pricing-board {
          border: 1.5px solid #cad3e3;
          border-radius: 16px;
          overflow: hidden;
          background: linear-gradient(180deg, #ebeff5 0%, #a5b2cf 100%);
        }

        .pricing-cards {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 2px;
          background: #cad3e3;
        }

        .pricing-card {
          background: #fff;
          padding: 28px 20px 24px;
          display: flex;
          flex-direction: column;
          min-height: 530px;
        }

        .plan-copy {
          margin-bottom: 36px;
        }

        .plan-name {
          font-family: "Playfair Display", serif;
          font-size: 1.8rem;
          line-height: 1.12;
          color: #2d3143;
          letter-spacing: -0.02em;
          font-weight: 400;
        }

        .plan-description {
          margin-top: 8px;
          min-height: 42px;
          font-family: "Inter", sans-serif;
          font-size: 0.93rem;
          line-height: 1.45;
          color: #9298a9;
        }

        .plan-price {
          margin-top: 24px;
          font-family: "Inter", sans-serif;
          font-size: 30px;
          line-height: 1;
          letter-spacing: -0.04em;
          color: #161a27;
        }

        .plan-default-btn {
          margin-top: 0;
          width: 100%;
        }

        .feature-list {
          list-style: none;
          margin-top: 24px;
          display: flex;
          flex-direction: column;
        }

        .feature-row {
          min-height: 46px;
          border-bottom: 1px solid #ebedf4;
          display: flex;
          align-items: center;
          gap: 10px;
          font-family: "Inter", sans-serif;
          font-size: 0.9rem;
          color: #34384a;
        }

        .feature-row:last-child {
          border-bottom: 0;
        }

        .feature-icon {
          width: 14px;
          height: 14px;
          text-align: center;
          color: #9ca3b8;
          font-size: 1rem;
          line-height: 1;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .feature-icon.check {
          color: #212733;
        }

        .enterprise-row {
          background: linear-gradient(180deg, rgba(255, 255, 255, 0.75) 0%, rgba(255, 255, 255, 0.5) 100%);
          border-top: 1.5px solid rgba(255, 255, 255, 0.6);
          padding: 26px;
          display: grid;
          grid-template-columns: 1fr 280px;
          align-items: center;
          gap: 24px;
        }

        .enterprise-chip {
          background: rgba(255, 255, 255, 0.82);
        }

        .enterprise-title {
          margin-top: 14px;
          font-family: "Playfair Display", serif;
          font-size: clamp(1.8rem, 3vw, 2.25rem);
          letter-spacing: -0.03em;
          color: #21222f;
          font-weight: 400;
        }

        .enterprise-subtitle {
          margin-top: 8px;
          max-width: 560px;
          font-family: "Inter", sans-serif;
          font-size: 0.92rem;
          line-height: 1.5;
          color: rgba(51, 51, 94, 0.82);
        }

        .enterprise-default-btn {
          width: 100%;
        }

        @media (max-width: 1200px) {
          .pricing-cards {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }

        @media (max-width: 980px) {
          .pricing-cards {
            grid-template-columns: 1fr;
          }

          .pricing-card {
            min-height: unset;
          }

          .enterprise-row {
            grid-template-columns: 1fr;
            padding: 22px;
          }
        }

        @media (max-width: 680px) {
          .pricing-clone {
            padding: 90px 16px;
          }

          .pricing-card {
            padding: 24px 18px 20px;
          }

          .plan-name {
            font-size: 1.8rem;
          }

          .feature-row {
            min-height: 42px;
          }
        }
      `}</style>
    </section>
  );
}
