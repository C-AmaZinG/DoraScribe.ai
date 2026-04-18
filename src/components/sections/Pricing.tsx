"use client";

import React, { useEffect, useMemo, useState } from "react";
import MakroButton from "@/components/ui/MakroButton";

type ApiPlan = {
  id: number;
  name: string;
  periodicity: number;
  periodicity_type: string;
  price: number;
  description: string;
  currency: string;
  excerpt?: string;
  benefits: string[];
};

type Plan = {
  name: string;
  description: string;
  priceLabel: string;
  features: string[];
};

type BillingCycle = "month" | "year";

const fallbackPlansByCycle: Record<BillingCycle, Plan[]> = {
  month: [
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
    description: "per user / billed monthly",
    priceLabel: "$39/month",
    features: [
      "150 Transcripts/Month",
      "Priority Email Support",
      "Custom Note Templates",
      "Unlimited Dora Evidence Feature",
      "Prescription Generation",
    ],
  },
  {
    name: "Professional",
    description: "per user / billed monthly",
    priceLabel: "$59/month",
    features: [
      "300 Transcripts/Month",
      "Priority Phone & Email Support",
      "Custom Note Templates",
      "Unlimited Dora Evidence Feature",
      "Prescription Generation",
    ],
  },
  {
    name: "Premium",
    description: "per user / billed monthly",
    priceLabel: "$89/month",
    features: [
      "Unlimited Transcripts",
      "Priority Phone & Email Support",
      "1:1 Onboarding Support",
      "Custom Note Templates",
      "Unlimited Dora Evidence Feature",
      "Prescription Generation",
    ],
  },
  ],
  year: [
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
      description: "per user / billed yearly",
      priceLabel: "$399/year",
      features: [
        "150 Transcripts/Month",
        "Priority Email Support",
        "Custom Note Templates",
        "Unlimited Dora Evidence Feature",
        "Prescription Generation",
      ],
    },
    {
      name: "Professional",
      description: "per user / billed yearly",
      priceLabel: "$599/year",
      features: [
        "300 Transcripts/Month",
        "Priority Phone & Email Support",
        "Custom Note Templates",
        "Unlimited Dora Evidence Feature",
        "Prescription Generation",
      ],
    },
    {
      name: "Premium",
      description: "per user / billed yearly",
      priceLabel: "$899/year",
      features: [
        "Unlimited Transcripts",
        "Priority Phone & Email Support",
        "1:1 Onboarding Support",
        "Custom Note Templates",
        "Unlimited Dora Evidence Feature",
        "Prescription Generation",
      ],
    },
  ],
};

const cardOrder = ["Free", "Essential", "Professional", "Premium"];

function toDisplayPlan(plan: ApiPlan): Plan {
  const isFree = plan.price === 0 || plan.name.toLowerCase() === "free";
  const normalizedName = isFree ? "Free Trial" : plan.name;
  const periodType = String(plan.periodicity_type || "").toLowerCase();
  const suffix = periodType === "month" ? "/month" : periodType === "year" ? "/year" : "";

  return {
    name: normalizedName,
    description: plan.excerpt || plan.description || "",
    priceLabel: isFree ? "FREE" : `$${plan.price}${suffix}`,
    features: Array.isArray(plan.benefits) ? plan.benefits.map(f => f.replace(/Ask Dora/gi, "Dora Evidence")) : [],
  };
}

function mapApiToCards(apiPlans: ApiPlan[], cycle: BillingCycle): Plan[] {
  const byName = new Map<string, ApiPlan[]>();

  apiPlans.forEach((plan) => {
    const key = plan.name.toLowerCase();
    byName.set(key, [...(byName.get(key) || []), plan]);
  });

  return cardOrder
    .map((name) => {
      const items = byName.get(name.toLowerCase()) || [];
      if (!items.length) return null;

      const selected = name.toLowerCase() === "free"
        ? items[0]
        : items.find((item) => String(item.periodicity_type).toLowerCase() === cycle)
          || items.find((item) => String(item.periodicity_type).toLowerCase() === "month")
          || items[0];
      return toDisplayPlan(selected);
    })
    .filter((item): item is Plan => Boolean(item));
}

export default function Pricing() {
  const [apiPlans, setApiPlans] = useState<ApiPlan[] | null>(null);
  const [billingCycle, setBillingCycle] = useState<BillingCycle>("month");

  useEffect(() => {
    let isMounted = true;

    const loadPlans = async () => {
      try {
        const response = await fetch("/api/plans", { method: "GET" });
        if (!response.ok) {
          return;
        }

        const payload = await response.json();
        if (isMounted && Array.isArray(payload?.data)) {
          setApiPlans(payload.data as ApiPlan[]);
        }
      } catch {
        // Keep fallback plans on error.
      }
    };

    loadPlans();

    return () => {
      isMounted = false;
    };
  }, []);

  const plans = useMemo(() => {
    if (!apiPlans) return fallbackPlansByCycle[billingCycle];
    const mapped = mapApiToCards(apiPlans, billingCycle);
    return mapped.length ? mapped : fallbackPlansByCycle[billingCycle];
  }, [apiPlans, billingCycle]);

  return (
    <section id="pricing" className="pricing-clone">
      <div className="pricing-wrap">
        <div className="pricing-top">
          <p className="pricing-title">
            Find the right package
          </p>

          <p className="pricing-subtitle">
            Enhance your medical scribing experience at a price that fits your budget.
          </p>

          <div className="billing-toggle" role="tablist" aria-label="Billing cycle">
            <button
              type="button"
              className={`billing-btn ${billingCycle === "month" ? "is-active" : ""}`}
              onClick={() => setBillingCycle("month")}
              role="tab"
              aria-selected={billingCycle === "month"}
            >
              Monthly
            </button>
            <button
              type="button"
              className={`billing-btn ${billingCycle === "year" ? "is-active" : ""}`}
              onClick={() => setBillingCycle("year")}
              role="tab"
              aria-selected={billingCycle === "year"}
            >
              Yearly
            </button>
          </div>
        </div>

        <div className="pricing-board">
          <div className="pricing-cards">
            {plans.map((plan) => (
              <article
                key={plan.name}
                className={`pricing-card ${plan.name === "Premium" ? "is-premium" : ""}`}
              >
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
                  {plan.features.map((feature) => {
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

        </div>
      </div>

      <style jsx>{`
        .pricing-clone {
          padding: 100px 24px;
          background: #FDFCFA;
        }

        .pricing-wrap {
          max-width: 1030px;
          margin: 0 auto;
        }

        .pricing-top {
          text-align: center;
          margin-bottom: 18px;
        }

        .pricing-title {
          margin: 20px auto 0;
          max-width: 620px;
          font-family: "DM Sans", sans-serif !important;
          font-size: clamp(2.25rem, 5vw, 3.45rem);
          font-weight: 400;
          letter-spacing: -0.04em;
          line-height: 1.05;
          color: #000000;
          text-wrap: balance;
        }

        .pricing-title mark {
          display: inline-block;
          background: var(--brand-primary);
          border-radius: 14px;
          padding: 0 16px 5px;
        }

        .pricing-title mark span {
          color: #000000;
          font-family: inherit;
        }

        .pricing-subtitle {
          margin: 14px auto 0;
          max-width: 560px;
          font-family: "DM Sans", sans-serif;
          font-size: 1.05rem;
          line-height: 1.5;
          color: rgba(54, 56, 71, 0.7);
          text-wrap: pretty;
        }

        .billing-toggle {
          margin: 18px auto 0;
          width: fit-content;
          display: inline-flex;
          background: #eef2f7;
          border-radius: 999px;
          padding: 4px;
          border: 1px solid #d8e0ec;
          gap: 4px;
        }

        .billing-btn {
          border: 0;
          background: transparent;
          border-radius: 999px;
          padding: 8px 14px;
          font-family: "DM Sans", sans-serif;
          font-size: 0.85rem;
          font-weight: 600;
          color: #5f6b7d;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .billing-btn.is-active {
          background: #ffffff;
          color: #121827;
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.06);
        }

        .pricing-board {
          border: 0;
          border-radius: 0;
          overflow: visible;
          background: transparent;
        }

        .pricing-cards {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 14px;
          background: transparent;
          padding: 14px;
        }

        .pricing-card {
          background: #fff;
          padding: 28px 20px 24px;
          display: flex;
          flex-direction: column;
          min-height: 530px;
          border-radius: 14px;
          border: 1px solid #cad3e3;
        }

        .pricing-card.is-premium {
          background: #0B1D33;
        }

        .plan-copy {
          margin-bottom: 36px;
        }

        .plan-name {
          font-family: "DM Sans", sans-serif;
          font-size: 1.8rem;
          line-height: 1.12;
          color: #2d3143;
          letter-spacing: -0.02em;
          font-weight: 400;
        }

        .pricing-card.is-premium .plan-name {
          color: #f7f9ff;
        }

        .plan-description {
          margin-top: 8px;
          min-height: 42px;
          font-family: "DM Sans", sans-serif;
          font-size: 0.93rem;
          line-height: 1.45;
          color: #9298a9;
        }

        .pricing-card.is-premium .plan-description {
          color: rgba(247, 249, 255, 0.72);
        }

        .plan-price {
          margin-top: 24px;
          font-family: "DM Sans", sans-serif;
          font-size: 30px;
          line-height: 1;
          letter-spacing: -0.04em;
          color: #161a27;
        }

        .pricing-card.is-premium .plan-price {
          color: #ffffff;
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
          font-family: "DM Sans", sans-serif;
          font-size: 0.9rem;
          color: #34384a;
        }

        .pricing-card.is-premium .feature-row {
          border-bottom-color: rgba(255, 255, 255, 0.18);
          color: #f0f4ff;
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

        .pricing-card.is-premium .feature-icon.check {
          color: var(--brand-primary);
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

