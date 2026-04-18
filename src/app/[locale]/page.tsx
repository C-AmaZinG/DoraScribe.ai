import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Hero from "@/components/sections/Hero";
import FeatureCards from "@/components/sections/FeatureCards";
import HowItWorks from "@/components/sections/HowItWorks";
import WhyChoose from "@/components/sections/WhyChoose";
import Pricing from "@/components/sections/Pricing";
import Specialties from "@/components/sections/Specialties";
import Testimonials from "@/components/sections/Testimonials";
import BottomCTA from "@/components/sections/BottomCTA";
import FAQ from "@/components/sections/FAQ";
import Footer from "@/components/layout/Footer";
import { locales, buildAlternates } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const { canonical, languages } = buildAlternates("/");
  return {
    alternates: { canonical, languages },
    openGraph: { locale },
  };
}

export default function Page() {
  return (
    <div className="app-container">
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
  );
}
