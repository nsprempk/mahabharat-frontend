import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Cookie,
  Database,
  Eye,
  Lock,
  ShieldCheck,
} from "lucide-react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function PrivacyPolicy() {
  const lastUpdated = "October 2, 2026";

  return (
    <main className="min-h-screen bg-[#faf7f0]">
      <Navbar />

      <section className="bg-[#111827] px-5 pb-16 pt-32">
        <div className="mx-auto max-w-5xl">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-white/60 transition hover:text-white"
          >
            <ArrowLeft size={17} />
            मुख्य पृष्ठ
          </Link>

          <div className="mt-10 flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-400 text-black">
              <ShieldCheck size={26} />
            </div>

            <div>
              <p className="text-sm text-amber-300">Privacy</p>

              <h1 className="text-3xl font-bold text-white sm:text-5xl">
                Privacy Policy
              </h1>
            </div>
          </div>

          <p className="mt-5 text-sm text-white/40">
            Last updated: {lastUpdated}
          </p>
        </div>
      </section>

      <article className="mx-auto max-w-4xl px-5 py-14">
        <div className="rounded-3xl border border-gray-100 bg-white p-7 shadow-sm sm:p-10">
          <PolicySection icon={<Eye size={21} />} title="1. Introduction">
            <p>
              This Privacy Policy explains how this website collects, uses,
              stores, and protects information when you visit or use our
              services.
            </p>

            <p>
              By using the website, you acknowledge the practices described in
              this policy.
            </p>
          </PolicySection>

          <PolicySection
            icon={<Database size={21} />}
            title="2. Information We May Collect"
          >
            <p>
              Depending on how you use the website, we may receive information
              such as:
            </p>

            <ul>
              <li>
                Information you voluntarily provide through a contact form or
                other communication.
              </li>
              <li>
                Technical information such as browser type, device type,
                approximate location, referring pages, and general usage
                information.
              </li>
              <li>
                Information stored locally in your browser, such as reading
                progress, favorites, or preferences.
              </li>
            </ul>
          </PolicySection>

          <PolicySection
            icon={<Cookie size={21} />}
            title="3. Cookies and Similar Technologies"
          >
            <p>
              This website may use cookies, local storage, web beacons, pixels,
              or similar technologies for website functionality, analytics,
              security, and advertising.
            </p>

            <p>
              Google and other advertising or technology partners may place and
              read cookies or use similar technologies when advertisements are
              displayed.
            </p>
          </PolicySection>

          <PolicySection title="4. Google AdSense and Advertising">
            <p>
              We may use Google AdSense or other advertising services to display
              advertisements.
            </p>

            <p>
              Advertising technology providers may collect or receive
              information through cookies, web beacons, IP addresses, or other
              identifiers as permitted by applicable policies and law.
            </p>

            <p>
              Google may use information to provide, measure, and personalize
              advertising depending on applicable consent and settings.
            </p>

            <p>
              Learn more about how Google uses data when you use partner sites
              and services:
            </p>

            <a
              href="https://policies.google.com/technologies/partner-sites"
              target="_blank"
              rel="noreferrer"
              className="font-semibold text-amber-700 hover:text-amber-800"
            >
              How Google uses information from sites or apps that use its
              services
            </a>
          </PolicySection>

          <PolicySection title="5. Analytics">
            <p>
              We may use analytics tools to understand how visitors use the
              website, improve performance, identify errors, and improve the
              user experience.
            </p>

            <p>
              Analytics information may include page views, browser information,
              device information, approximate location, and interaction data.
            </p>
          </PolicySection>

          <PolicySection title="6. How We Use Information">
            <ul>
              <li>To operate and maintain the website.</li>
              <li>To provide requested features and services.</li>
              <li>To improve content, performance, and usability.</li>
              <li>To understand website usage and troubleshoot problems.</li>
              <li>To display and measure advertisements where applicable.</li>
              <li>
                To protect the website against abuse, fraud, and security
                threats.
              </li>
            </ul>
          </PolicySection>

          <PolicySection title="7. Data Sharing">
            <p>
              We do not sell personal information merely because you visit this
              website.
            </p>

            <p>
              Information may be processed by service providers that help us
              operate the website, including hosting, analytics, advertising,
              security, or communication providers.
            </p>

            <p>
              Information may also be disclosed where required by law,
              regulation, legal process, or to protect rights and safety.
            </p>
          </PolicySection>

          <PolicySection icon={<Lock size={21} />} title="8. Data Security">
            <p>
              We use reasonable technical and organizational measures intended
              to protect information against unauthorized access, alteration,
              disclosure, or destruction.
            </p>

            <p>
              No internet transmission or storage system can be guaranteed to be
              completely secure.
            </p>
          </PolicySection>

          <PolicySection title="9. Your Choices">
            <p>
              You may control cookies and local storage through your browser
              settings. Depending on your location, you may also have additional
              privacy rights concerning access, deletion, correction, objection,
              or consent choices.
            </p>
          </PolicySection>

          <PolicySection title="10. Children's Privacy">
            <p>
              This website is not intended to knowingly collect personal
              information from children in violation of applicable law.
            </p>
          </PolicySection>

          <PolicySection title="11. Changes to This Policy">
            <p>
              We may update this Privacy Policy from time to time. Changes will
              be posted on this page with an updated revision date.
            </p>
          </PolicySection>

          <PolicySection title="12. Contact">
            <p>
              For privacy questions or requests, please use the contact
              information provided on our Contact Us page.
            </p>
          </PolicySection>
        </div>
      </article>

      <Footer />
    </main>
  );
}

function PolicySection({ icon, title, children }) {
  return (
    <section className="border-b border-gray-100 py-8 first:pt-0 last:border-b-0">
      <div className="flex items-center gap-3">
        {icon && (
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-100 text-amber-600">
            {icon}
          </div>
        )}

        <h2 className="text-xl font-bold text-gray-900">{title}</h2>
      </div>

      <div className="mt-4 space-y-4 leading-8 text-gray-600">{children}</div>
    </section>
  );
}
