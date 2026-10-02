import { ArrowLeft, BadgeDollarSign, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SEO from "../components/SEO";

export default function AdvertisingPolicy() {
  return (
    <>
      <SEO
        title="विज्ञापन नीति | श्रीमद्भगवद्गीता"
        description="श्रीमद्भगवद्गीता वेबसाइट पर विज्ञापनों, तृतीय-पक्ष विज्ञापन सेवाओं, विज्ञापन तकनीकों और उपयोगकर्ता की सहमति से संबंधित नीति पढ़ें।"
        canonical="/advertising-policy"
      />
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
                <BadgeDollarSign size={26} />
              </div>

              <div>
                <p className="text-sm text-amber-300">Advertising</p>

                <h1 className="text-3xl font-bold text-white sm:text-5xl">
                  Advertising Policy
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
            <Section
              icon={<ShieldCheck size={21} />}
              title="1. Advertising on This Website"
            >
              <p>
                This website may display advertisements through third-party
                advertising providers, including Google AdSense.
              </p>
            </Section>

            <Section title="2. Advertising and Editorial Content">
              <p>
                Advertisements are separate from our editorial and educational
                content. The presence of an advertisement does not mean that we
                endorse the advertised product or service.
              </p>
            </Section>

            <Section title="3. Personalized Advertising">
              <p>
                Depending on the visitor's location, consent choices, browser
                settings, and advertising configuration, advertisements may be
                personalized or non-personalized.
              </p>

              <p>
                Where applicable, consent will be requested through the site's
                consent-management mechanism.
              </p>
            </Section>

            <Section title="4. Advertising Technologies">
              <p>
                Advertising providers may use cookies, web beacons, IP
                addresses, local storage, or other identifiers for advertising
                delivery, measurement, fraud prevention, and related purposes.
              </p>
            </Section>

            <Section title="5. Advertisement Interaction">
              <p>
                Users should independently evaluate products and services
                advertised on the website before making any purchase or other
                decision.
              </p>
            </Section>

            <Section title="6. Changes">
              <p>
                Advertising partners and configurations may change over time as
                the website develops.
              </p>
            </Section>
          </div>
        </article>

        <Footer />
      </main>
    </>
  );
}

function Section({ icon, title, children }) {
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
