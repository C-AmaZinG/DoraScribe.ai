import type { Metadata } from "next";
import Header from "@/components/layout/Header";
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
  const { canonical, languages } = buildAlternates("/privacy-policy");
  return {
    title: "Privacy Policy | Dorascribe",
    description: "Learn about how Dorascribe protects your data and privacy.",
    alternates: { canonical, languages },
    openGraph: { locale },
  };
}

export default function PrivacyPolicyPage() {
  return (
    <div className="app-container">
      <Header />
      <main className="legal-main">
        <div className="legal-container">
          <h1 className="legal-title">Privacy Policy</h1>
          <p className="legal-updated">Last Updated: June 15, 2025</p>
          
          <section className="legal-section">
            <h2>1. INTRODUCTION</h2>
            <p>
              At Dorascribe Inc. (&ldquo;Dorascribe,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;), protecting your data is a top priority. We are committed to safeguarding the privacy of our customers and online visitors. This Privacy Policy (&ldquo;Policy&rdquo;) outlines our practices for the collection, use, disclosure, and management of information from users who access our website (the &ldquo;Website&rdquo;) and/or use our speech-to-text transcription application (the &ldquo;App&rdquo;) (together, the &ldquo;Platforms&rdquo;).
            </p>
            <p>
              Dorascribe Inc. is incorporated under the laws of Ontario, Canada, with its registered office at: 4145 North Service Road, 2nd Floor, Burlington, Ontario, L7L 6A3, Canada.
            </p>
            <p>
              &ldquo;Personal Information&rdquo; refers to data that identifies an individual, including any sensitive information you provide or generate while using the Platforms. By accessing or using the Platforms, you consent to our collection, processing, use, and storage of your Personal Information as described in this Policy.
            </p>
            <p>
              We may update this Policy from time to time to reflect changes in our practices, technologies, legal requirements, or other factors. When we make material changes, we will revise the &ldquo;Last Updated&rdquo; date at the top of this page and, where appropriate, notify you through the Platforms or other means. We encourage you to review this Policy periodically to stay informed about how we are protecting your information.
            </p>
            <p>
              If you do not agree with this Policy, please refrain from using our Services. You may stop using the Services at any time and exercise your rights as outlined in this Policy.
            </p>
          </section>

          <section className="legal-section">
            <h2>2. INFORMATION WE COLLECT</h2>
            <p>We collect information in the following ways:</p>
            <ol>
              <li><strong>Information You Provide Directly:</strong> This includes data such as account registration details, contact information, demographic information, practice-related data, voice recordings, and any other communication you send us.</li>
              <li><strong>Information About Others You Provide:</strong> If you share Personal Information about others, you must ensure you have their permission to do so.</li>
              <li><strong>Information from Third Parties:</strong> We may receive information from third-party integrations such as Google Calendar, Zoom, or payment processors like Stripe.</li>
              <li><strong>Automatically Collected Information:</strong> We collect technical information including log data, device details, IP addresses, timestamps, and data from cookies and similar tracking technologies.</li>
            </ol>
          </section>

          <section className="legal-section">
            <h2>3. USE OF YOUR INFORMATION</h2>
            <p>We use Personal Information, in accordance with applicable laws, to:</p>
            <ul>
              <li>Set up accounts and deliver our Services</li>
              <li>Communicate with and support users</li>
              <li>Analyze and enhance our Services</li>
              <li>Prevent fraud and comply with legal obligations</li>
            </ul>
            <p>We may anonymize Personal Information for internal improvement and may share anonymized data with trusted partners.</p>
          </section>

          <section className="legal-section">
            <h2>4. SHARING OF INFORMATION</h2>
            <p>We share Personal Information only when necessary to operate our business, improve the Services, or meet legal requirements. This may include sharing with:</p>
            <ul>
              <li>Cloud hosting and AI service providers</li>
              <li>Analytics and advertising partners</li>
              <li>Integrated third-party platforms (e.g., Google Calendar, Apple iCal)</li>
              <li>Payment processing services</li>
              <li>Law enforcement or regulatory authorities as required by law</li>
            </ul>
          </section>

          <section className="legal-section">
            <h2>5. YOUR PRIVACY RIGHTS</h2>
            <p>You have the right to:</p>
            <ul>
              <li>Access, correct, or delete your Personal Information</li>
              <li>Restrict or object to how we process your data</li>
              <li>Request data portability</li>
              <li>Withdraw your consent at any time</li>
            </ul>
          </section>

          <section className="legal-section">
            <h2>6. CHILDREN&rsquo;S PRIVACY</h2>
            <p>Our Services are not directed to children under the age of 13. If we become aware that such information has been collected, we will take steps to delete it. Please contact us immediately if you believe this has occurred.</p>
          </section>

          <section className="legal-section">
            <h2>7. COOKIES AND SIMILAR TECHNOLOGIES</h2>
            <p>We use cookies and similar tools to improve your experience and analyze service usage. You may manage cookie preferences through your browser settings.</p>
          </section>

          <section className="legal-section">
            <h2>8. SECURITY</h2>
            <p>We implement appropriate security measures to protect your Personal Information. However, no system is entirely immune to risks, and we cannot guarantee absolute security.</p>
          </section>

          <section className="legal-section">
            <h2>9. YOUR CHOICES</h2>
            <p>You may update or correct your Personal Information, delete your account, or opt out of promotional emails at any time by contacting us or using the opt-out links provided.</p>
          </section>

          <section className="legal-section">
            <h2>10. INTERNATIONAL DATA TRANSFERS</h2>
            <p>We may transfer Personal Information to countries where we or our service providers operate, including Canada, the United States, and Nigeria. Such transfers comply with applicable data protection laws.</p>
          </section>

          <section className="legal-section">
            <h2>11. DATA RETENTION</h2>
            <p>We retain Personal Information only for as long as necessary to fulfill business purposes and comply with legal requirements.</p>
          </section>

          <section className="legal-section">
            <h2>12. LEGAL FRAMEWORKS</h2>
            <p>We adhere to the following privacy and data protection laws, where applicable:</p>
            <ul>
              <li>Health Insurance Portability and Accountability Act (HIPAA)</li>
              <li>California Consumer Privacy Act (CCPA) and California Privacy Rights Act (CPRA)</li>
              <li>Personal Information Protection and Electronic Documents Act (PIPEDA)</li>
              <li>Nigeria&rsquo;s National Health Act of 2014</li>
            </ul>
          </section>

          <section className="legal-section">
            <h2>13. CONTACT US</h2>
            <p>If you have questions or wish to exercise your rights, you can reach us at:</p>
            <p>
              <strong>Email:</strong> help@dorascribe.com<br />
              <strong>Mail:</strong> 4145 North Service Road, 2nd Floor, Burlington, Ontario, L7L 6A3, Canada
            </p>
          </section>
        </div>
      </main>
      <Footer />
      <style dangerouslySetInnerHTML={{ __html: `
        .app-container {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          background: #ffffff;
        }
        .legal-main {
          padding-top: 160px;
          padding-bottom: 100px;
          flex: 1;
        }
        .legal-container {
          max-width: 800px;
          margin: 0 auto;
          padding: 0 24px;
          font-family: 'DM Sans', sans-serif;
          color: #334155;
          line-height: 1.6;
        }
        .legal-title {
          font-family: var(--font-heading), "Playfair Display", serif;
          font-size: clamp(2.5rem, 5vw, 4rem);
          color: #0f172a;
          margin-bottom: 16px;
          font-weight: 400;
        }
        .legal-updated {
          font-size: 0.9rem;
          color: #64748b;
          margin-bottom: 48px;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        .legal-section {
          padding: 0;
          margin-bottom: 30px;
        }
        .legal-section h2 {
          font-family: var(--font-heading), "Playfair Display", serif;
          font-size: 1.35rem !important;
          color: #0f172a;
          margin-top: 0 !important;
          margin-bottom: 10px;
          font-weight: 600 !important;
          letter-spacing: 0.02em;
          line-height: 1.3 !important;
        }
        .legal-section p {
          margin-bottom: 12px;
        }
        .legal-section p:last-child,
        .legal-section ul:last-child,
        .legal-section ol:last-child {
          margin-bottom: 0;
        }
        .legal-section ul, .legal-section ol {
          margin-bottom: 12px;
          padding-left: 20px;
        }
        .legal-section li {
          margin-bottom: 4px;
        }
        .legal-section strong {
          color: #0f172a;
        }
      `}} />
    </div>
  );
}
