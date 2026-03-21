"use client";

import React, { useEffect } from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import MockupSection from '../components/MockupSection';
import HowItWorks from '../components/HowItWorks';
import WhyChoose from '../components/WhyChoose';
import Sustainability from '../components/Sustainability';
import Pricing from '../components/Pricing';
import Testimonials from '../components/Testimonials';
import FAQ from '../components/FAQ';
import CTASection from '../components/CTASection';
import Footer from '../components/Footer';

export default function Page() {
  useEffect(() => {
    // Scroll reveal logic originally from HTML/JS
    const revealElements = document.querySelectorAll('.reveal');
    
    const reveal = () => {
      const windowHeight = window.innerHeight;
      const elementVisible = 150;
      revealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        if (elementTop < windowHeight - elementVisible) {
          element.classList.add('visible');
        }
      });
    };

    window.addEventListener('scroll', reveal);
    reveal(); // Trigger on load
    return () => window.removeEventListener('scroll', reveal);
  }, []);

  return (
    <div className="app-container">
      <Header />
      <main>
        <Hero />
        <MockupSection />
        <HowItWorks />
        <WhyChoose />
        <Sustainability />
        <Pricing />
        <Testimonials />
        <FAQ />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
