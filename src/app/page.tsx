"use client";

import React, { useEffect, useState } from 'react';
import Header from '@/components/layout/Header';
import Hero from '@/components/sections/Hero';
import MockupSection from '@/components/sections/MockupSection';
import FeatureCards from '@/components/sections/FeatureCards';
import HowItWorks from '@/components/sections/HowItWorks';
import WhyChoose from '@/components/sections/WhyChoose';
import Pricing from '@/components/sections/Pricing';
import Specialties from '@/components/sections/Specialties';

import Testimonials from '@/components/sections/Testimonials';
import FAQ from '@/components/sections/FAQ';
import CTASection from '@/components/sections/CTASection';
import BottomCTA from '@/components/sections/BottomCTA';
import Footer from '@/components/layout/Footer';

export default function Page() {
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
    <div className="app-container" key={navigationRefreshKey}>
      <Header />
      <main>
        <Hero />
        <FeatureCards />
        <MockupSection />
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
  );
}
