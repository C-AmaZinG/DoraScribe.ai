"use client";

import React from "react";
import { motion } from "framer-motion";
import { Heart, Zap, ShieldCheck, Settings2 } from "lucide-react";
import Image from "next/image";

export default function WhyChoose() {
  const iconWrapperStyle = {
    marginBottom: "24px",
    color: "#000000"
  };
  return (
    <section id="why-choose" className="why-choose-redesign">
      <div className="wc-container">
        {/* Header */}
        <div className="wc-header">
          <h2 className="wc-title">Why Choose Dorascribe?</h2>
          <p className="wc-subtitle">
            Streamline your workflow and enhance patient interactions with these benefits
          </p>
        </div>

        {/* Grid Layout */}
        <div className="wc-grid">
          {/* Left Column */}
          <div className="wc-col wc-col-left">
            <motion.div 
              className="wc-card"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div style={iconWrapperStyle}>
                <Heart size={20} strokeWidth={2} />
              </div>
              <h3>Engage Your Patients</h3>
              <p>
                Eliminate note-taking distractions, allowing you to focus on your patients and foster meaningful connections.
              </p>
            </motion.div>

            <motion.div 
              className="wc-card"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div style={iconWrapperStyle}>
                <Zap size={20} strokeWidth={2} />
              </div>
              <h3>Maximize Your Efficiency</h3>
              <p>
                Instantly capture live conversations with your patient or dictate a summary of the interaction.
              </p>
            </motion.div>
          </div>

          {/* Center Column - Hero Feature */}
          <motion.div 
            className="wc-card-hero"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{ position: "relative", overflow: "hidden", display: "flex", alignItems: "flex-end", justifyContent: "center" }}
          >
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, zIndex: 1 }}>
              <Image 
                src="/images/doctor-phone.png" 
                alt="Doctor holding phone" 
                fill 
                style={{ objectFit: "cover", objectPosition: "center top" }} 
                priority
              />
            </div>
          </motion.div>



          {/* Right Column */}
          <div className="wc-col wc-col-right">
            <motion.div 
              className="wc-card"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div style={iconWrapperStyle}>
                <ShieldCheck size={20} strokeWidth={2} />
              </div>
              <h3>Enhance Your Precision</h3>
              <p>
                Eliminate note-taking distractions, allowing you to focus on your patients and foster meaningful connections.
              </p>
            </motion.div>

            <motion.div 
              className="wc-card"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div style={iconWrapperStyle}>
                <Settings2 size={20} strokeWidth={2} />
              </div>
              <h3>Adapt to Your Needs</h3>
              <p>
                Customize templates and workflows to suit your specific practice, making documentation tailored and efficient.
              </p>
            </motion.div>
          </div>
        </div>
      </div>

    </section>
  );
}
