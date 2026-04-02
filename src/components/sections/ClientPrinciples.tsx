"use client";

import React from "react";
import { motion } from "framer-motion";
import { Heart, ArrowUpLeft, LayoutGrid } from "lucide-react";

const principles = [
  {
    title: "Understanding client needs",
    description: "Deeply researching and analyzing each client's needs and goals to create tailored and effective design solutions.",
    icon: <Heart className="w-12 h-12 text-black" />,
    bgColor: "#EEFDEF",
    pattern: "heart"
  },
  {
    title: "Effective communication",
    description: "Maintaining constant interaction with the client throughout the project to ensure transparency and openness.",
    icon: <ArrowUpLeft className="w-12 h-12 text-black" />,
    bgColor: "#F8F4FF",
    pattern: "arrows"
  },
  {
    title: "Focus on user experience",
    description: "Prioritizing user experience in interface design, ensuring intuitive and user-friendly interaction with the product.",
    icon: <LayoutGrid className="w-12 h-12 text-blue-400" />,
    bgColor: "#000000",
    textColor: "white",
    pattern: "grid"
  }
];

export default function ClientPrinciples() {
  return (
    <section className="principles-section">
      <div className="container">
        <div className="principles-grid">
          {principles.map((p, idx) => (
            <motion.div
              key={idx}
              className="principle-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              style={{ backgroundColor: p.bgColor, color: p.textColor || "black" }}
            >
              <div className="card-top">
                <h3>{p.title}</h3>
                <p style={{ opacity: p.textColor ? 0.8 : 0.7 }}>{p.description}</p>
              </div>
              
              <div className="card-visual">
                {p.pattern === "heart" && (
                   <div className="heart-pattern">
                      <div className="grid-bg">
                         {[...Array(25)].map((_, i) => <div key={i} className="dot" />)}
                      </div>
                      <div className="heart-shape">
                         <div className="bar b1" /> <div className="bar b2" /> <div className="bar b3" />
                         <div className="bar b4" /> <div className="bar b5" /> <div className="bar b6" />
                         <div className="bar b7" /> <div className="bar b8" /> <div className="bar b9" />
                      </div>
                   </div>
                )}
                
                {p.pattern === "arrows" && (
                   <div className="arrows-pattern">
                      <div className="grid-bg">
                         {[...Array(25)].map((_, i) => <div key={i} className="dot" />)}
                      </div>
                      <div className="arrow-line">
                         <div className="arrow a-small" />
                         <div className="arrow a-medium" />
                         <div className="arrow a-large" />
                         <div className="arrow-main" />
                      </div>
                   </div>
                )}

                {p.pattern === "grid" && (
                   <div className="grid-pattern">
                      <div className="main-grid">
                         {[...Array(16)].map((_, i) => (
                           <div key={i} className={`grid-box ${i === 10 ? 'active' : ''}`} />
                         ))}
                      </div>
                   </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .principles-section {
          padding: 80px 0;
          background: #FCFAF8;
        }
        .container {
          max-width: 1300px;
          margin: 0 auto;
          padding: 0 24px;
        }
        .principles-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }
        .principle-card {
          border-radius: 24px;
          padding: 40px;
          min-height: 520px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          overflow: hidden;
          position: relative;
        }
        .card-top h3 {
          font-family: 'Monument Grotesk', sans-serif;
          font-size: 32px;
          line-height: 1.1;
          margin-bottom: 16px;
          font-weight: 500;
          letter-spacing: -0.02em;
        }
        .card-top p {
          font-family: 'Monument Grotesk', sans-serif;
          font-size: 16px;
          line-height: 1.5;
        }

        .card-visual {
          height: 240px;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* Heart Pattern */
        .heart-pattern {
          position: relative;
          width: 200px;
          height: 200px;
        }
        .grid-bg {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 30px;
          opacity: 0.05;
        }
        .dot { width: 4px; height: 12px; background: currentColor; border-radius: 2px; transform: rotate(45deg); }
        .heart-shape {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .bar {
          position: absolute;
          width: 8px;
          height: 48px;
          background: #000;
          border-radius: 4px;
        }
        .b1 { transform: translate(-30px, -20px) rotate(-45deg); }
        .b2 { transform: translate(0, -20px) rotate(45deg); }
        .b3 { transform: translate(30px, -20px) rotate(-45deg); }
        .b4 { transform: translate(-45px, 10px) rotate(45deg); }
        .b5 { transform: translate(45px, 10px) rotate(-45deg); }
        .b6 { transform: translate(-15px, 40px) rotate(-45deg); }
        .b7 { transform: translate(15px, 40px) rotate(45deg); }
        .b8 { transform: translate(0, 10px) rotate(-45deg); }
        .b9 { transform: translate(0, 10px) rotate(45deg); }

        /* Arrows Pattern */
        .arrows-pattern {
           position: relative;
           width: 220px;
           height: 220px;
        }
        .arrow-line {
           position: absolute;
           inset: 0;
           display: flex;
           align-items: flex-end;
           justify-content: flex-start;
        }
        .arrow {
           position: absolute;
           border-top: 6px solid black;
           border-right: 6px solid black;
           width: 30px;
           height: 30px;
           transform: rotate(-45deg);
        }
        .a-small { bottom: 60px; left: 40px; transform: scale(0.6) rotate(-45deg); }
        .a-medium { bottom: 100px; left: 80px; transform: scale(0.8) rotate(-45deg); }
        .a-large { bottom: 150px; left: 130px; rotate: -45deg; border-width: 8px; width: 40px; height: 40px; }
        .arrow-main {
           width: 60px;
           height: 8px;
           background: black;
           position: absolute;
           bottom: 30px;
           left: 20px;
        }

        /* Grid Pattern */
        .grid-pattern {
           width: 200px;
           height: 200px;
        }
        .main-grid {
           display: grid;
           grid-template-columns: repeat(4, 1fr);
           gap: 2px;
           width: 100%;
           height: 100%;
        }
        .grid-box {
           background: rgba(255,255,255,0.05);
           border: 1px solid rgba(255,255,255,0.1);
           border-radius: 4px;
        }
        .grid-box.active {
           background: transparent;
           border: 2px solid #60A5FA;
           position: relative;
        }
        .grid-box.active::after, .grid-box.active::before {
           content: "";
           position: absolute;
           background: #60A5FA;
        }
        .grid-box.active::before { width: 100vw; height: 2px; left: -50vw; top: 50%; }
        .grid-box.active::after { height: 100vh; width: 2px; top: -50vh; left: 50%; }

        @media (max-width: 1024px) {
          .principles-grid { grid-template-columns: 1fr; }
          .principle-card { min-height: 480px; }
        }
      `}</style>
    </section>
  );
}
