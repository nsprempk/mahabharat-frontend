import { AlertTriangle, ArrowLeft, Info } from "lucide-react";
import { Link } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Disclaimer() {
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
              <AlertTriangle size={26} />
            </div>

            <div>
              <p className="text-sm text-amber-300">Information</p>

              <h1 className="text-3xl font-bold text-white sm:text-5xl">
                Disclaimer
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
          <div className="rounded-3xl bg-amber-50 p-6">
            <div className="flex items-start gap-4">
              <Info size={24} className="mt-1 shrink-0 text-amber-600" />

              <p className="leading-8 text-gray-700">
                This website is intended for educational and informational
                purposes. Users should independently verify information that is
                important to them.
              </p>
            </div>
          </div>

          <Section title="1. Religious and Educational Content">
            <p>
              The material presented on this website is intended to help
              visitors read and study the Bhagavad Gita and related subjects.
            </p>

            <p>
              Interpretations and explanatory material may vary between
              traditions, editions, translators, and scholars.
            </p>
          </Section>

          <Section title="2. Accuracy">
            <p>
              We make reasonable efforts to present content carefully, but we do
              not guarantee that every piece of content is complete, current, or
              free from errors.
            </p>
          </Section>

          <Section title="3. Third-Party Content">
            <p>
              Some website components or materials may originate from
              third-party sources. Such material remains subject to applicable
              rights, attribution requirements, and source terms.
            </p>
          </Section>

          <Section title="4. Advertisements">
            <p>
              Advertisements displayed on this website may be provided by
              third-party advertising services. We do not endorse every product,
              service, or claim shown in an advertisement.
            </p>
          </Section>

          <Section title="5. External Websites">
            <p>
              Links to external websites are provided for convenience. We are
              not responsible for the content, security, availability, or
              privacy practices of third-party websites.
            </p>
          </Section>

          <Section title="6. No Professional Advice">
            <p>
              Nothing on this website should be interpreted as professional
              legal, medical, financial, psychological, or other specialized
              advice.
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
