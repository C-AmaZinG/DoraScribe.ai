"use client";

import React, { useEffect, useState } from 'react';
import Header from '@/components/layout/Header';
import Hero from '@/components/sections/Hero';
import MockupSection from '@/components/sections/MockupSection';
import Sustainability from '@/components/sections/Sustainability';
import StepTwoSection from '@/components/sections/StepTwoSection';
import StepThreeSection from '@/components/sections/StepThreeSection';
import DiscoverAmbientAI from '@/components/sections/DiscoverAmbientAI';
import OffTheChartsFeatures from '@/components/sections/OffTheChartsFeatures';
import EaseOfUseFeatures from '@/components/sections/EaseOfUseFeatures';
import Pricing from '@/components/sections/Pricing';
import Specialties from '@/components/sections/Specialties';
import DutyOfCare from '@/components/sections/DutyOfCare';
import Testimonials from '@/components/sections/Testimonials';
import FAQ from '@/components/sections/FAQ';
import BlogSection from '@/components/sections/BlogSection';
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
        <MockupSection />
        <Sustainability />
        <StepTwoSection />
        <StepThreeSection />
        <DiscoverAmbientAI />
        <OffTheChartsFeatures />
        <EaseOfUseFeatures />
        <Specialties />
        <Pricing />
        <DutyOfCare />
        <Testimonials />
        <BottomCTA />
        <FAQ />
        <BlogSection />
      </main>
      <Footer />
    </div>
  );
}
