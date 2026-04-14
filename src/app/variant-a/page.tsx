"use client";

import React, { useEffect, useState } from 'react';
import Header from '@/components/layout/Header';
import Hero from '@/components/sections/Hero';
import FeatureCards from '@/components/sections/FeatureCards';
import HowItWorks from '@/components/sections/HowItWorks';
import WhyChoose from '@/components/sections/WhyChoose';
import Pricing from '@/components/sections/Pricing';
import Specialties from '@/components/sections/Specialties';
import BottomCTA from '@/components/sections/BottomCTA';
import Testimonials from '@/components/sections/Testimonials';
import FAQ from '@/components/sections/FAQ';
import Footer from '@/components/layout/Footer';

export default function VariantA() {
  const [navigationRefreshKey, setNavigationRefreshKey] = useState(0);

  useEffect(() => {
    const refreshSections = () => {
      setNavigationRefreshKey((prev) => prev + 1);
    };

    const handlePageShow = (event: PageTransitionEvent) => {
      if (event.persisted) {
        refreshSections();
      }
    };

    window.addEventListener('pageshow', handlePageShow);
    window.addEventListener('popstate', refreshSections);

    return () => {
      window.removeEventListener('pageshow', handlePageShow);
      window.removeEventListener('popstate', refreshSections);
    };
  }, []);

  return (
    <>
      {/* Variant A: Light hero override */}
      <style>{`
        .variant-a-wrap .hero-playground-clone {
          background: #ffffff !important;
          --hero-bg: #ffffff;
          --hero-text: #000000;
          --hero-subtitle-text: #374151;
          --hero-badge-bg: #f3f4f6;
          --hero-badge-text: #000000;
          --hero-badge-spin-color: #3d8183;
        }

        .variant-a-wrap .hero-playground-clone .hero-title {
          color: #000000 !important;
        }

        .variant-a-wrap .hero-playground-clone .hero-subtitle {
          color: #374151 !important;
        }

        .variant-a-wrap .hero-playground-clone .hero-badge {
          color: #000000 !important;
        }

        .variant-a-wrap .feature-cards-section {
          --feature-section-bg: #ffffff;
          --feature-section-text: #000000;
          --feature-section-subtitle: #555555;
        }
      `}</style>
      <div className="app-container variant-a-wrap" key={navigationRefreshKey}>
        <Header />
        <main>
          <Hero />
          <FeatureCards />
          <HowItWorks />
          <WhyChoose />
          <Specialties />
          <Pricing />
          <Testimonials />
          <BottomCTA />
          <FAQ />
        </main>
        <Footer />
      </div>
    </>
  );
}
