"use client";

import React from "react";
import { motion } from "framer-motion";
import MakroButton from "@/components/ui/MakroButton";
import Image from "next/image";

export default function BottomCTA() {
  return (
    <section style={{ padding: "100px 24px", background: "#FDFCFA" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div
          style={{
            position: "relative",
            width: "100%",
            background: "#00AAAA",
            borderRadius: "32px",
            padding: "160px 24px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            overflow: "hidden",
          }}
        >
          {/* Left Background Pattern */}
          <div style={{ position: "absolute", top: "50%", left: 0, transform: "translateY(-50%)", width: "18%", height: "72%", zIndex: 0, pointerEvents: "none" }}>
            <Image
              src="/assets/left-pattern.svg"
              alt="Left decorative pattern"
              fill
              style={{ objectFit: "contain", objectPosition: "left center" }}
              priority
            />
          </div>

          {/* Right Background Pattern */}
          <div style={{ position: "absolute", top: "50%", right: 0, transform: "translateY(-50%)", width: "18%", height: "72%", zIndex: 0, pointerEvents: "none" }}>
            <Image
              src="/assets/right-pattern.svg"
              alt="Right decorative pattern"
              fill
              style={{ objectFit: "contain", objectPosition: "right center" }}
              priority
            />
          </div>


          <div
            style={{
              position: "relative",
              zIndex: 1,
              width: "100%",
              paddingInline: "clamp(12px, 8vw, 170px)",
            }}
          >


            <motion.h2
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(2rem, 4vw, 3.5rem)",
                fontWeight: 500,
                color: "#FFFFFF",
                lineHeight: 1.1,
                marginBottom: "16px",
                maxWidth: "600px",
                margin: "0 auto 16px",
              }}
            >
              Do less Admin,<br />Provide More Care
            </motion.h2>

            <motion.p
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.16 }}
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "clamp(1rem, 1.6vw, 1.18rem)",
                color: "rgba(255,255,255,0.9)",
                lineHeight: 1.5,
                maxWidth: "680px",
                margin: "0 auto 24px",
              }}
            >
              Convert clinical consultations into notes quickly and easily. Book a live demo and explore
              the features and capabilities that set us apart.
            </motion.p>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              style={{
                display: "flex",
                gap: "12px",
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              <MakroButton text="Start Free Trial" href="https://dorascribe.ai/book-demo/" />
              <MakroButton text="Book a Demo" href="https://dorascribe.ai/book-demo/" variant="outline" />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
