import type { Metadata } from "next";
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
        width: 1528,
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
      </head>
      <body suppressHydrationWarning>
        <AppProviders>
          <div id="root">{children}</div>
        </AppProviders>
      </body>
    </html>
  );
}
