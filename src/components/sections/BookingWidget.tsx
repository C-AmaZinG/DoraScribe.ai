"use client";

import Script from "next/script";

export default function BookingWidget() {
  return (
    <div className="booking-container">
      <h1 className="booking-title">
        Book a Demo
      </h1>
      
      <div 
        className="calendly-inline-widget" 
        data-url="https://calendly.com/help-dorascribe/30min?primary_color=4f8082" 
        style={{ minWidth: '320px', height: '700px' }}
      />
      
      <Script 
        src="https://assets.calendly.com/assets/external/widget.js" 
        strategy="afterInteractive" 
      />

      <style jsx>{`
        .booking-container {
          max-width: 1000px;
          margin: 0 auto;
          padding: 0 24px;
        }
        .booking-title {
          font-family: var(--font-playfair), serif;
          font-size: clamp(2rem, 5vw, 3.5rem);
          text-align: center;
          margin-bottom: 40px;
          color: #0B1D33;
        }
      `}</style>
    </div>
  );
}
