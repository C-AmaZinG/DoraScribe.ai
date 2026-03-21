"use client";

import * as React from "react"
import { motion } from "framer-motion"
import { cn } from "../../lib/utils"

interface TabProps {
  text: string
  selected: boolean
  setSelected: (text: string) => void
  discount?: boolean
}

export function Tab({ text, selected, setSelected, discount }: TabProps) {
  return (
    <button
      onClick={() => setSelected(text)}
      className={cn(
        "relative flex items-center justify-center gap-2 rounded-full px-6 py-2 text-sm font-medium transition-colors hover:text-foreground",
        selected ? "text-foreground" : "text-muted-foreground"
      )}
    >
      {selected && (
        <motion.div
          layoutId="active-tab"
          className="absolute inset-0 rounded-full bg-background shadow-sm"
          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
        />
      )}
      <span className="relative z-10 capitalize">{text}</span>
      {discount && (
        <span className="relative z-10 rounded-full bg-primary/20 px-2.5 py-0.5 text-xs font-semibold text-primary">
          Save 15%
        </span>
      )}
    </button>
  )
}
