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
  const { canonical, languages } = buildAlternates("/terms-and-conditions");
  return {
    title: "Terms and Conditions | Dorascribe",
    description: "Read the terms of service and conditions for using Dorascribe.",
    alternates: { canonical, languages },
    openGraph: { locale },
  };
}

export default function TermsAndConditionsPage() {
  return (
    <div className="app-container">
      <Header />
      <main className="legal-main">
        <div className="legal-container">
          <h1 className="legal-title">Terms and Conditions</h1>
          <p className="legal-updated">Last Updated: June 15, 2025</p>
          
          <section className="legal-section">
            <h2>1. INTRODUCTION</h2>
            <p>
              Welcome to Dorascribe Inc. (&ldquo;Dorascribe,&rdquo; &ldquo;Company,&rdquo; &ldquo;we,&rdquo; or &ldquo;us&rdquo;). These Terms of Service (&ldquo;Terms&rdquo;) govern your access to and use of all websites, products, services, and applications provided by Dorascribe, including but not limited to the Dorascribe App (collectively, the &ldquo;Services&rdquo;). Services delivered under a separate Master Service Agreement are governed by that agreement rather than these online Terms.
            </p>
            <p>
              By accessing or using our Services, you agree to be bound by these Terms, along with our Acceptable Use Policy and Privacy Policy, both of which are incorporated herein by reference. &ldquo;Client&rdquo; refers to you or the organization you represent. You affirm that you are of legal age and have the authority to enter into this agreement on behalf of yourself or your entity.
            </p>
            <p>
              Dorascribe Inc. is incorporated under the laws of Ontario, Canada, with its registered office at: 4145 North Service Road, 2nd Floor, Burlington, Ontario, L7L 6A3, Canada.
            </p>
            <p>
              We are committed to improving and evolving our Services. As such, we may update these Terms periodically to reflect changes in our offerings, policies, or legal obligations. When updates are made, we will revise the &ldquo;Last Updated&rdquo; date at the top of this document and, where appropriate, provide notice via our website, email, or other reasonable channels. Your continued use of the Services after any changes constitutes your acceptance of the updated Terms.
            </p>
            <p>
              For any questions or concerns regarding these Terms, please contact us at <a href="mailto:help@dorascribe.com">help@dorascribe.com</a>.
            </p>
          </section>

          <section className="legal-section">
            <h2>2. SERVICE REGISTRATION</h2>
            <p>
              You agree to provide accurate, complete, and up-to-date information (&ldquo;Registration Data&rdquo;) when creating and maintaining a Dorascribe account. You are responsible for maintaining the confidentiality of your login credentials and for all activities that occur under your account. You must notify us immediately of any unauthorized use or security breach. We reserve the right to suspend or terminate accounts that contain false, outdated, or incomplete information.
            </p>
          </section>

          <section className="legal-section">
            <h2>3. USE OF THE DORASCRIBE APPLICATION</h2>
            <ul>
              <li><strong>(a) Medical Use Only:</strong> The Dorascribe App is intended solely for use by licensed medical professionals to accurately record and transcribe medical consultations. Personal, consumer, or non-medical usage is strictly prohibited.</li>
              <li><strong>(b) Security:</strong> You are responsible for maintaining the confidentiality and security of sensitive and patient-related data accessed through the App.</li>
              <li><strong>(c) Compliance:</strong> Your use of the Services must fully comply with Dorascribe&rsquo;s Acceptable Use Policy.</li>
              <li><strong>(d) Availability:</strong> We will make subscribed Services available, subject to your continued compliance with these Terms.</li>
              <li><strong>(e) Application Updates:</strong> The App may be updated periodically, and we may require you to use the latest version to maintain access and functionality.</li>
            </ul>
          </section>

          <section className="legal-section">
            <h2>4. PAYMENT TERMS</h2>
            <p>
              Some or all of the Services may be subject to paid fees. All fees are non-refundable unless otherwise specified in writing. You agree to maintain valid and current payment methods at all times. Any billing disputes must be submitted in writing to <a href="mailto:help@dorascribe.com">help@dorascribe.com</a> within thirty (30) days of the charge date.
            </p>
          </section>

          <section className="legal-section">
            <h2>5. ACCOUNT OWNERSHIP</h2>
            <p>
              The account owner is the individual or legal entity who registered for the Services. In the event of a dispute regarding account ownership, you agree to resolve the issue independently. We reserve the right to suspend or terminate access to disputed accounts until a resolution is reached.
            </p>
          </section>

          <section className="legal-section">
            <h2>6. STORAGE OF USER INFORMATION</h2>
            <p>
              As a convenience, we may store communications, voice recordings, emails, messages, and other content. However, Dorascribe is not obligated to retain any data and may delete it at our sole discretion.
            </p>
          </section>

          <section className="legal-section">
            <h2>7. THIRD-PARTY SERVICES</h2>
            <p>
              The Services may integrate or link to third-party services, applications, or data sources, which may change without notice. Dorascribe is not responsible for the availability, accuracy, or reliability of third-party components or content.
            </p>
          </section>

          <section className="legal-section">
            <h2>8. REPRESENTATIONS AND WARRANTIES</h2>
            <p>
              Each party represents that it has the legal authority to enter into these Terms and agrees to comply with applicable laws. Dorascribe warrants that its Services will be provided in accordance with generally accepted industry standards. The Client warrants that their use of the Services and the data they submit comply with all applicable laws and regulations.
            </p>
          </section>

          <section className="legal-section">
            <h2>9. DISCLAIMER</h2>
            <p>
              Unless expressly stated, the Services are provided &ldquo;as is&rdquo; and &ldquo;as available,&rdquo; without warranties of any kind, whether express or implied. This includes, but is not limited to, implied warranties of merchantability, fitness for a particular purpose, non-infringement, and data security.
            </p>
          </section>

          <section className="legal-section">
            <h2>10. CLIENT RESPONSIBILITIES</h2>
            <p>
              Clients are responsible for ensuring that all authorized users of the Services adhere to these Terms and applicable laws, especially regarding the handling and submission of Client Data.
            </p>
          </section>

          <section className="legal-section">
            <h2>11. ACCEPTABLE USE</h2>
            <p>
              Clients agree to use the Services only as permitted and not to misuse, reverse engineer, sublicense, or improperly distribute the Application. Violations of acceptable use may result in immediate suspension or termination of Services.
            </p>
          </section>

          <section className="legal-section">
            <h2>12. CONFIDENTIALITY</h2>
            <p>
              Clients must maintain the confidentiality of all proprietary and sensitive information disclosed by Dorascribe and must use reasonable measures to prevent unauthorized disclosure.
            </p>
          </section>

          <section className="legal-section">
            <h2>13. INTELLECTUAL PROPERTY</h2>
            <p>
              Dorascribe retains all intellectual property rights related to the Services. Clients are granted a limited, non-exclusive, non-transferable license to use the Services for their internal operations only.
            </p>
          </section>

          <section className="legal-section">
            <h2>14. SUGGESTIONS</h2>
            <p>
              Any feedback, ideas, or suggestions provided to Dorascribe regarding the Services may be used without restriction and shall become the sole property of Dorascribe without any obligation to compensate or credit the provider.
            </p>
          </section>

          <section className="legal-section">
            <h2>15. TERM AND TERMINATION</h2>
            <p>
              These Terms remain in effect until terminated by either party. You may terminate your use of the Services at any time. Dorascribe may terminate access if you breach these Terms. Upon termination, your data will be handled in accordance with our Privacy Policy.
            </p>
          </section>

          <section className="legal-section">
            <h2>16. SURVIVAL</h2>
            <p>
              Sections related to payment obligations, confidentiality, intellectual property, indemnification, disclaimers, and limitations of liability shall survive termination of the Terms.
            </p>
          </section>

          <section className="legal-section">
            <h2>17. LIMITATION OF LIABILITY</h2>
            <p>
              Neither party shall be liable for any indirect, incidental, or consequential damages arising out of or in connection with these Terms. Dorascribe&rsquo;s total cumulative liability shall not exceed the total amount of fees paid by the Client during the twelve (12) months prior to the event giving rise to the claim.
            </p>
          </section>

          <section className="legal-section">
            <h2>18. INDEMNIFICATION</h2>
            <p>
              Clients agree to indemnify and hold harmless Dorascribe, its affiliates, and employees from and against any claims, damages, or liabilities resulting from the misuse of the Services or violation of these Terms.
            </p>
          </section>

          <section className="legal-section">
            <h2>19. MISCELLANEOUS</h2>
            <p>
              Before initiating legal action, both parties agree to make reasonable efforts to resolve any disputes informally. These Terms shall be governed by the laws of the Province of Ontario, Canada. Any legal proceedings shall be subject to the exclusive jurisdiction of the courts located in Ontario.
            </p>
          </section>

          <section className="legal-section">
            <h2>20. CONTACT INFORMATION</h2>
            <p>All legal notices must be sent to:</p>
            <p>
              <strong>Dorascribe Inc.</strong><br />
              4145 North Service Road, 2nd Floor<br />
              Burlington, Ontario, L7L 6A3, Canada
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
        .legal-section a {
          color: #3d8183;
          text-decoration: underline;
        }
      `}} />
    </div>
  );
}
