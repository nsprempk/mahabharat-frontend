import { ArrowLeft, Cookie, Settings2 } from "lucide-react";
import { Link } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function CookiePolicy() {
  return (
    <main className="min-h-screen bg-[#faf7f0]">
      <Navbar />

      <section className="bg-[#111827] px-5 pb-16 pt-32">
        <div className="mx-auto max-w-5xl">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-white"
          >
            <ArrowLeft size={17} />
            मुख्य पृष्ठ
          </Link>

          <div className="mt-10 flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-400 text-black">
              <Cookie size={26} />
            </div>

            <div>
              <p className="text-sm text-amber-300">Cookies</p>

              <h1 className="text-3xl font-bold text-white sm:text-5xl">
                Cookie Policy
              </h1>
            </div>
          </div>

          <p className="mt-5 text-sm text-white/40">
            Last updated: October 2, 2026
          </p>
        </div>
      </section>

      <article className="mx-auto max-w-4xl px-5 py-14">
        <div className="rounded-3xl border border-gray-100 bg-white p-7 shadow-sm sm:p-10">
          <Section title="1. What Are Cookies?">
            <p>
              Cookies are small files stored by a website in your browser or
              device. Similar technologies may include local storage, pixels,
              web beacons, and other identifiers.
            </p>
          </Section>

          <Section title="2. How We Use Cookies">
            <p>Cookies or similar technologies may be used for:</p>

            <ul>
              <li>Essential website functionality.</li>
              <li>Security and abuse prevention.</li>
              <li>Remembering user preferences.</li>
              <li>Analytics and performance measurement.</li>
              <li>Advertising and ad measurement.</li>
            </ul>
          </Section>

          <Section title="3. Google Advertising Cookies">
            <p>
              When Google advertising services are used, Google and related
              advertising technology providers may use cookies or similar
              technologies in connection with advertising.
            </p>

            <p>
              Google explains that AdSense may send a cookie to a browser when a
              page contains Google ads or relevant ad tags.
            </p>

            <a
              href="https://support.google.com/adsense/answer/7549925"
              target="_blank"
              rel="noreferrer"
              className="font-semibold text-amber-700 hover:text-amber-800"
            >
              Learn how Google AdSense uses cookies
            </a>
          </Section>

          <Section title="4. Managing Cookies">
            <div className="flex items-start gap-4 rounded-2xl bg-amber-50 p-5">
              <Settings2 size={24} className="mt-1 shrink-0 text-amber-600" />

              <p>
                You can manage cookies through your browser settings. Blocking
                some cookies may affect website functionality.
              </p>
            </div>
          </Section>

          <Section title="5. Consent">
            <p>
              Where applicable law requires consent before certain cookies or
              similar technologies are used, we will request consent through an
              appropriate consent mechanism.
            </p>

            <p>
              For eligible users in the EEA, UK, and Switzerland, Google
              provides consent-management options through Privacy &amp;
              messaging and certified CMP integrations.
            </p>
          </Section>

          <Section title="6. Updates">
            <p>
              We may update this Cookie Policy when our technology, advertising
              partners, or legal requirements change.
            </p>
          </Section>
        </div>
      </article>

      <Footer />
    </main>
  );
}

function Section({ title, children }) {
  return (
    <section className="border-b border-gray-100 py-8 first:pt-0 last:border-b-0">
      <h2 className="text-xl font-bold text-gray-900">{title}</h2>

      <div className="mt-4 space-y-4 leading-8 text-gray-600">{children}</div>
    </section>
  );
}
