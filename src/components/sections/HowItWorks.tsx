"use client"

import React from "react"
import { useIsMobile } from "@/lib/hooks"
import MakroButton from "@/components/ui/MakroButton"
import { motion } from "framer-motion"

/* ─────────────────────────────────────────────
   Local public/assets icons
───────────────────────────────────────────── */
const iconMic        = "/assets/Mic_white.svg"   // white – for orange button in Card 3
const iconMicGray    = "/assets/mic.svg"          // gray  – for step buttons in Card 1
const iconCopy       = "/assets/Copy icon.svg"
const iconDownload   = "/assets/Download Icon.svg"
const iconEdit       = "/assets/Edit Icon.svg"
const iconGenerate   = "/assets/Generate Note.svg"
const iconTemplate   = "/assets/Template icon.svg"

function Card1Illustration() {
  const [activeStep, setActiveStep] = React.useState(1);

  React.useEffect(() => {
    const int = setInterval(() => {
      setActiveStep(s => s >= 4 ? 1 : s + 1);
    }, 2800); 
    return () => clearInterval(int);
  }, []);

  const isActive = (step: number) => activeStep >= step;

  const btnStyle = (step: number, top: number) => ({
    position: "absolute" as const, left: 24, top,
    background: isActive(step) ? "var(--how-it-works-orange, #ff7429)" : "#fff",
    border: `1px solid ${isActive(step) ? "var(--how-it-works-orange, #ff7429)" : "#e8e8e8"}`,
    borderRadius: 6, height: 40, width: 215,
    display: "flex", alignItems: "center", gap: 8, padding: "0 14px",
    transition: "all 0.4s ease",
    transitionDelay: (isActive(step) && step > 1) ? "0.4s" : "0s",
  });

  const textStyle = (step: number) => ({
    color: isActive(step) ? "var(--brand-primary-text, #fff)" : "#bbb",
    fontFamily: "'DM Sans', sans-serif",
    fontWeight: isActive(step) ? 500 : 400,
    fontSize: 14,
    transition: "all 0.4s ease",
    transitionDelay: (isActive(step) && step > 1) ? "0.4s" : "0s",
    flex: step === 2 ? 1 : undefined,
  });

  const dotStyle = (step: number, topInactive: number) => ({
    position: "absolute" as const,
    left: isActive(step) ? 0 : 2,
    top: isActive(step) ? topInactive - 2 : topInactive,
    width: isActive(step) ? 14 : 10,
    height: isActive(step) ? 14 : 10,
    borderRadius: "50%",
    background: isActive(step) ? "var(--how-it-works-orange, #ff7429)" : "#ccc",
    boxShadow: isActive(step) ? "0 0 0 3px var(--how-it-works-orange-glow, rgba(255,116,41,0.2))" : "none",
    transition: "all 0.4s ease",
    transitionDelay: (isActive(step) && step > 1) ? "0.4s" : "0s", 
  });

  const lineStyle = (top: number, height: number) => ({
    position: "absolute" as const,
    left: 6, top, width: 1, height,
    background: "#e8e8e8",
  });

  const lineFillStyle = (step: number) => ({
    width: "100%",
    background: "var(--how-it-works-orange, #ff7429)",
    height: isActive(step) ? "100%" : "0%",
    transition: "height 0.4s ease-in-out",
  });

  return (
    <div style={{
      background: "#f8f7f5", borderRadius: 8, width: "100%", height: 360,
      position: "relative", overflow: "hidden",
      display: "flex", alignItems: "center", justifyContent: "center",
    }}>
      <img src="/assets/card1_bg.png" alt="" style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.05, pointerEvents: "none" }} />
      <div style={{ position: "relative", width: 242, height: 260 }}>
        {/* Dots */}
        <div style={dotStyle(1, 15)} />
        <div style={dotStyle(2, 83)} />
        <div style={dotStyle(3, 151)} />
        <div style={dotStyle(4, 219)} />

        {/* Lines */}
        <div style={lineStyle(27, 56)}>
          <div style={lineFillStyle(2)} />
        </div>
        <div style={lineStyle(93, 58)}>
          <div style={lineFillStyle(3)} />
        </div>
        <div style={lineStyle(161, 58)}>
          <div style={lineFillStyle(4)} />
        </div>

        {/* Button 1 */}
        <div style={btnStyle(1, 0)}>
          <span style={textStyle(1)}>+ Start Consult</span>
        </div>

        {/* Button 2 */}
        <div style={btnStyle(2, 68)}>
          <span style={textStyle(2)}>Patient Details</span>
          <span style={{
            fontSize: 9, fontFamily: "'DM Sans', sans-serif", fontWeight: 500,
            color: isActive(2) ? "var(--brand-primary-text, #fff)" : "#158384",
            background: isActive(2) ? "rgba(255,255,255,0.2)" : "rgba(21,131,132,0.08)",
            border: isActive(2) ? "1px solid rgba(255,255,255,0.4)" : "1px solid rgba(21,131,132,0.2)",
            borderRadius: 3, padding: "1px 5px", whiteSpace: "nowrap",
            transition: "all 0.4s ease",
            transitionDelay: isActive(2) ? "0.4s" : "0s",
          }}>Optional</span>
        </div>

        {/* Button 3 */}
        <div style={btnStyle(3, 136)}>
          <img src={iconMicGray} alt="mic" style={{
            width: 15, height: 15,
            filter: isActive(3) ? "var(--btn-icon-filter, brightness(0) invert(1))" : "none",
            transition: "filter 0.4s ease",
            transitionDelay: isActive(3) ? "0.4s" : "0s",
          }} />
          <span style={textStyle(3)}>Start Recording</span>
        </div>

        {/* Button 4 */}
        <div style={btnStyle(4, 204)}>
          <img src={iconGenerate} alt="generate" style={{
            width: 15, height: 15,
            filter: isActive(4) ? "var(--btn-icon-filter, brightness(0) invert(1))" : "none",
            transition: "filter 0.4s ease",
            transitionDelay: isActive(4) ? "0.4s" : "0s",
          }} />
          <span style={textStyle(4)}>Generate Note</span>
        </div>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────
   Card 2 illustration – "Notes Ready"
───────────────────────────────────────────── */
function Card2Illustration() {
  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (custom: number) => ({
      opacity: 1, y: 0,
      transition: { delay: custom * 0.2, duration: 0.4, ease: "easeOut" }
    })
  };

  return (
    <div style={{
      background: "#f8f7f5",
      borderRadius: 8,
      width: "100%",
      height: 360,
      position: "relative",
      overflow: "hidden",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}>
      <img src="/assets/card2_bg.png" alt="" style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.13, pointerEvents: "none" }} />
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        style={{ position: "relative", width: "90%", display: "flex", flexDirection: "column", gap: 12 }}>
        
        {/* Toolbar row */}
        <div style={{
          background: "#fff", borderRadius: 4,
          padding: "8px 12px",
          display: "flex", alignItems: "center", gap: 8,
        }}>
          {/* Icon buttons */}
          <motion.div variants={itemVariants} custom={1} style={{ background: "#fff", border: "1px solid #e5e5e5", borderRadius: 6, padding: 8 }}>
            <img src={iconCopy} alt="copy" style={{ width: 16, height: 16 }} />
          </motion.div>
          <motion.div variants={itemVariants} custom={2} style={{ background: "#fff", border: "1px solid #e5e5e5", borderRadius: 6, padding: 8 }}>
            <img src={iconDownload} alt="download" style={{ width: 16, height: 16 }} />
          </motion.div>
          
          {/* Dropdown */}
          <motion.div variants={itemVariants} custom={3} style={{
            background: "#fff", border: "1px solid #d1d5db", borderRadius: 6,
            padding: "8px 12px", display: "flex", alignItems: "center", gap: 6,
          }}>
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#0a0a0a", whiteSpace: "nowrap" }}>SOAP Note - Standard</span>
          </motion.div>
        </div>

        {/* Document skeleton */}
        <motion.div variants={itemVariants} custom={4} style={{
          background: "#fff", borderRadius: 4,
          padding: "16px",
          display: "flex", flexDirection: "column", gap: 16,
        }}>
          {/* Continuous pulsing skeleton lines */}
          <motion.div 
            animate={{ opacity: [1, 0.4, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            style={{ display: "flex", flexDirection: "column", gap: 16, width: "100%" }}
          >
            {[0, 1].map((g) => (
              <div key={g} style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <div style={{ display: "flex", gap: 4 }}>
                  <div style={{ flex: 1, height: 14, background: "#efefef", borderRadius: 4 }} />
                  <div style={{ width: 54, height: 14, background: "#efefef", borderRadius: 4 }} />
                </div>
                <div style={{ height: 14, background: "#efefef", borderRadius: 4 }} />
                <div style={{ width: "80%", height: 14, background: "#efefef", borderRadius: 4 }} />
              </div>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  )
}

/* ─────────────────────────────────────────────
   Card 3 illustration – "Edit & Refine"
───────────────────────────────────────────── */
function Card3Illustration() {
  const [activeIndex, setActiveIndex] = React.useState(1);

  React.useEffect(() => {
    const int = setInterval(() => {
      setActiveIndex(i => (i + 1) % 3);
    }, 2800); 
    return () => clearInterval(int);
  }, []);

  const items = [
    { id: 0, icon: iconGenerate, baseScale: 22, activeScale: 28 },
    { id: 1, icon: iconMicGray, baseScale: 22, activeScale: 28 },
    { id: 2, icon: iconEdit, baseScale: 16, activeScale: 22 }
  ];

  const getPosition = (id: number) => {
    const diff = (id - activeIndex + 3) % 3;
    return diff === 2 ? -1 : diff; 
  };

  return (
    <div style={{
      background: "#f8f7f5",
      borderRadius: 8,
      width: "100%",
      height: 360,
      position: "relative",
      overflow: "hidden",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}>
      <img src="/assets/card3_bg.png" alt="" style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.04, pointerEvents: "none" }} />
      <div style={{ position: "relative", width: 240, height: 110 }}>
        {items.map(item => {
          const pos = getPosition(item.id);
          const isCenter = pos === 0;
          
          let left = "50%";
          let xTransform = "-50%";
          if (pos === -1) {
            left = "0%";
            xTransform = "0%";
          } else if (pos === 1) {
            left = "100%";
            xTransform = "-100%";
          }

          return (
            <div key={item.id} style={{
              position: "absolute" as const,
              top: "50%",
              left,
              transform: `translate(${xTransform}, -50%)`,
              background: isCenter ? "var(--how-it-works-orange, #ff7429)" : "#fff",
              borderRadius: isCenter ? 16 : 12,
              width: isCenter ? 72 : 54,
              height: isCenter ? 72 : 54,
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: isCenter ? "0px 10px 24px var(--how-it-works-orange-shadow, rgba(255,116,41,0.4))" : "0px 4px 16px rgba(0,0,0,0.1)",
              zIndex: isCenter ? 2 : 1,
              transition: "all 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
            }}>
              <img src={item.icon} alt="icon" style={{
                width: isCenter ? item.activeScale : item.baseScale,
                height: isCenter ? item.activeScale : item.baseScale,
                filter: isCenter ? "var(--btn-icon-filter, brightness(0) invert(1))" : "none",
                transition: "all 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
              }} />
            </div>
          )
        })}
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────
   Step card data
───────────────────────────────────────────── */
const cards = [
  {
    title: "Start Your Consult in Seconds",
    desc: "Tap the \u201cStart Consult\u201d button, optionally enter patient details, select your note type, and begin recording instantly\u2014no setup, no disruption to your workflow.",
    illustration: <Card1Illustration />,
  },
  {
    title: "Your Notes, Ready the Moment You Finish",
    desc: "Clear, structured, and clinically accurate notes are generated in real time, so everything is ready for review as soon as your consult ends.",
    illustration: <Card2Illustration />,
  },
  {
    title: "Edit, Refine, and Finalize with Ease",
    desc: "Need to add more details? Easily update your notes using voice or text, with full control to refine, adjust, and finalize your documentation anytime.",
    illustration: <Card3Illustration />,
  },
]

/* ─────────────────────────────────────────────
   Main section
───────────────────────────────────────────── */
export default function HowItWorks() {
  const isMobile = useIsMobile()

  return (
    <section
      id="how-it-works"
      style={{
        width: "100%",
        background: "#f8f8f8",
        borderTop: "1px solid #dcdcdc",
        borderBottom: "1px solid #dcdcdc",
        padding: isMobile ? "60px 0" : "80px 0",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      {/* ── Header ── */}
      <div style={{
        textAlign: "center",
        padding: isMobile ? "0 24px 48px" : "0 24px 56px",
        maxWidth: 960,
        width: "100%",
      }}>
        <h2 style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          fontWeight: 600,
          fontSize: isMobile ? "32px" : "40px",
          lineHeight: "50px",
          color: "#0a0a0a",
          margin: "0 0 16px",
          letterSpacing: "-0.01em",
        }}>
          How to use
        </h2>
        <p style={{
          fontFamily: "'DM Sans', sans-serif",
          fontWeight: 400,
          fontSize: 16,
          lineHeight: 1.6,
          color: "#4D4D4D",
          maxWidth: 680,
          margin: "0 auto",
        }}>
          From recording to ready-to-file notes, Dorascribe handles every step automatically so you can stay focused on your patient.
        </p>
      </div>

      {/* ── Cards ── */}
      <div style={{
        width: "100%",
        maxWidth: 1280,
        padding: isMobile ? "0 20px" : "0 80px",
        display: "grid",
        gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)",
        gap: isMobile ? "20px" : "20px",
        marginBottom: isMobile ? "48px" : "56px",
      }}>
        {cards.map((card, idx) => (
          <div
            key={idx}
            style={{
              background: "#ffffff",
              borderRadius: 8,
              overflow: "hidden",
              padding: 20,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              gap: 20,
            }}
          >
            {/* Text */}
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <h3 style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontWeight: 600,
                fontSize: 24,
                lineHeight: 1.2,
                color: "#0a0a0a",
                margin: 0,
              }}>
                {card.title}
              </h3>
              <p style={{
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 400,
                fontSize: 14,
                lineHeight: 1.6,
                color: "#4D4D4D",
                margin: 0,
              }}>
                {card.desc}
              </p>
            </div>

            {/* Illustration */}
            {card.illustration}
          </div>
        ))}
      </div>

      {/* ── CTA ── */}
      <div style={{ width: isMobile ? "calc(100% - 40px)" : "auto", maxWidth: isMobile ? "300px" : "none" }}>
        <MakroButton
          href="https://app.dorascribe.ai/signUp"
          text="Start a free trial"
          className="how-it-works-cta"
        />
      </div>

      <style jsx>{`
        .how-it-works-cta {
          width: 100%;
          justify-content: center;
        }
      `}</style>
    </section>
  )
}
