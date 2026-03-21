"use client";

import * as React from "react"
import { Check } from "lucide-react"
import { cn } from "../../lib/utils"

export interface PricingTier {
  name: string
  price: Record<string, string | number>
  description: string
  features: string[]
  cta: string
  popular: boolean
}

interface PricingCardProps {
  tier: PricingTier
  paymentFrequency: string
  className?: string
}

export function PricingCard({
  tier,
  paymentFrequency,
  className,
}: PricingCardProps) {
  const price = tier.price[paymentFrequency]

  return (
    <div
      className={cn(
        "relative flex flex-col gap-6 overflow-hidden rounded-2xl border bg-background p-8 shadow-sm transition-all hover:shadow-md",
        tier.popular ? "border-primary shadow-lg ring-1 ring-primary" : "border-muted",
        className
      )}
    >
      {tier.popular && (
        <div className="absolute right-0 top-0 rounded-bl-xl rounded-tr-xl bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
          Most Popular
        </div>
      )}
      <div className="space-y-4">
        <h3 className="text-xl font-medium">{tier.name}</h3>
        <div className="flex items-baseline gap-2">
          <span className="text-4xl font-bold tracking-tight text-foreground">
            {price}
          </span>
          {price !== "FREE" && (
            <span className="text-sm font-medium text-muted-foreground">
              / {paymentFrequency === "monthly" ? "mo" : "yr"}
            </span>
          )}
        </div>
        <p className="text-sm text-muted-foreground min-h-[40px]">{tier.description}</p>
      </div>

      <button
        className={cn(
          "w-full rounded-lg px-4 py-2.5 text-center text-sm font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-offset-2",
          tier.popular
            ? "bg-primary text-primary-foreground hover:bg-primary/90 focus:ring-primary"
            : "bg-secondary text-secondary-foreground hover:bg-secondary/80 focus:ring-secondary"
        )}
      >
        {tier.cta}
      </button>

      <div className="flex flex-1 flex-col gap-4">
        <p className="text-sm font-medium uppercase tracking-wider text-muted-foreground mt-4">
          Features
        </p>
        <ul className="flex flex-col gap-3">
          {tier.features.map((feature) => (
            <li key={feature} className="flex items-start gap-3">
              <Check className="h-5 w-5 shrink-0 text-primary" />
              <span className="text-sm text-muted-foreground">{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
