import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { AppProviders } from "@/components/providers/AppProviders";

export const metadata: Metadata = {
  title: "Dorascribe | AI Clinical Notes Assistant",
  description: "Ambient AI Medical Scribe",
  openGraph: {
    title: "Dorascribe | AI Clinical Notes Assistant",
    description: "Ambient AI Medical Scribe",
    url: "https://dora-scribe-ai.vercel.app",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.png" type="image/png" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400&display=swap"
          rel="stylesheet"
        />
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
        <AppProviders>
          <div id="root">{children}</div>
        </AppProviders>
      </body>
    </html>
  );
}
