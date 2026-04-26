import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BookingWidget from "@/components/sections/BookingWidget";
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
  const { canonical, languages } = buildAlternates("/book-a-demo");
  return {
    title: "Book a Demo | Dorascribe",
    description: "Schedule a 30-minute demo with our team to see how Dorascribe can streamline your clinical documentation.",
    alternates: { canonical, languages },
    openGraph: { locale },
  };
}

export default function BookADemoPage() {
  return (
    <div className="app-container">
      <Header />
      <main style={{ paddingTop: '160px', paddingBottom: '80px', flex: 1, background: '#ffffff' }}>
        <BookingWidget />
      </main>
      <Footer />
      <style dangerouslySetInnerHTML={{ __html: `
        .app-container {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
        }
      `}} />
    </div>
  );
}
