import type { Metadata } from "next";
import { headers } from "next/headers";
import Script from "next/script";
import { Playfair_Display } from "next/font/google";
import "./globals.css";
import { AppProviders } from "@/components/providers/AppProviders";
import { LocaleProvider } from "@/lib/locale-context";
import { TranslationsProvider } from "@/lib/translations/translations-context";
import { translateUiStrings } from "@/lib/translations/translate-ui";
import LoadingBar from "@/components/ui/LoadingBar";
import { config } from "@/lib/config";
import type { Locale } from "@/lib/i18n";

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  metadataBase: new URL(config.siteUrl),
  title: "Dorascribe | AI Clinical Notes Assistant",
  description: "Ambient AI Medical Scribe",
  openGraph: {
    title: "Dorascribe | AI Clinical Notes Assistant",
    description: "Ambient AI Medical Scribe",
    url: config.siteUrl,
    siteName: "Dorascribe",
    images: [
      {
        url: "/og-image.png",
        width: 2588,
        height: 1620,
        alt: "Dorascribe – Ambient AI Medical Scribe",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dorascribe | AI Clinical Notes Assistant",
    description: "Ambient AI Medical Scribe",
    images: ["/og-image.png"],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersList = await headers();
  const locale = (headersList.get("x-locale") || "en") as Locale;
  const translations = await translateUiStrings(locale);

  return (
    <html lang={locale} suppressHydrationWarning className={playfairDisplay.variable}>
      <head>
        <link rel="icon" href="/favicon.png" type="image/png" />
        <Script id="hotjar-tracking" strategy="afterInteractive">
          {`
            (function(h,o,t,j,a,r){
                h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
                h._hjSettings={hjid:6691991,hjsv:6};
                a=o.getElementsByTagName('head')[0];
                r=o.createElement('script');r.async=1;
                r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
                a.appendChild(r);
            })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
          `}
        </Script>
      </head>
      <body suppressHydrationWarning>
        <LocaleProvider locale={locale}>
          <TranslationsProvider translations={translations}>
            <LoadingBar />
            <AppProviders>
              <div id="root">{children}</div>
            </AppProviders>
          </TranslationsProvider>
        </LocaleProvider>
      </body>
    </html>
  );
}
