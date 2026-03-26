"use client";

import React, { useEffect, useState } from 'react';
import Header from '@/components/layout/Header';
import Hero from '@/components/sections/Hero';
import MockupSection from '@/components/sections/MockupSection';
import HowItWorks from '@/components/sections/HowItWorks';
import WidelyAdopted from '@/components/sections/WidelyAdopted';
import WhyChoose from '@/components/sections/WhyChoose';
import Sustainability from '@/components/sections/Sustainability';
import Pricing from '@/components/sections/Pricing';
import Specialties from '@/components/sections/Specialties';
import Testimonials from '@/components/sections/Testimonials';
import FAQ from '@/components/sections/FAQ';
import BlogSection from '@/components/sections/BlogSection';
import CTASection from '@/components/sections/CTASection';
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
        <HowItWorks />
        <MockupSection />
        <WidelyAdopted />
        <Sustainability />
        <Specialties />
        <Pricing />
        <Testimonials />
        <BlogSection />
        <FAQ />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
