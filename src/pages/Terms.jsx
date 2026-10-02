import { ArrowLeft, BookOpen, FileText } from "lucide-react";
import { Link } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SEO from "../components/SEO";

export default function Terms() {
  return (
    <>
      <SEO
        title="उपयोग की शर्तें | श्रीमद्भगवद्गीता"
        description="श्रीमद्भगवद्गीता वेबसाइट के उपयोग की शर्तें, सामग्री, स्वीकार्य उपयोग, बाहरी लिंक और वेबसाइट से संबंधित नियम पढ़ें।"
        canonical="/terms"
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
                <FileText size={26} />
              </div>

              <div>
                <p className="text-sm text-amber-300">Legal</p>

                <h1 className="text-3xl font-bold text-white sm:text-5xl">
                  Terms of Use
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
            <Section title="1. Acceptance">
              <p>
                By accessing or using this website, you agree to comply with
                these Terms of Use. Please do not use the website if you do not
                agree with these terms.
              </p>
            </Section>

            <Section title="2. Website Content">
              <p>
                The website provides educational and informational material
                relating to the Bhagavad Gita and related spiritual and cultural
                topics.
              </p>

              <p>
                Content is provided for general informational and educational
                purposes and should not be treated as professional, legal,
                financial, medical, or other specialized advice.
              </p>
            </Section>

            <Section title="3. Acceptable Use">
              <ul>
                <li>Do not use the website for unlawful purposes.</li>
                <li>
                  Do not attempt to interfere with website security or
                  availability.
                </li>
                <li>
                  Do not introduce malicious code, automated abuse, or harmful
                  traffic.
                </li>
                <li>Do not misuse website content or services.</li>
              </ul>
            </Section>

            <Section title="4. Intellectual Property">
              <p>
                Website design, branding, original graphics, software, and
                original editorial material may be protected by applicable
                intellectual-property laws.
              </p>

              <p>
                Third-party content remains subject to the rights and licenses
                of its respective owners.
              </p>
            </Section>

            <Section title="5. External Links">
              <p>
                The website may link to third-party websites. We do not control
                those websites and are not responsible for their content,
                policies, availability, or practices.
              </p>
            </Section>

            <Section title="6. Advertising">
              <p>
                The website may display advertisements from third-party
                advertising providers, including Google AdSense.
              </p>

              <p>
                Advertisements may be selected, delivered, or measured using
                information and technologies described in our Privacy Policy and
                Cookie Policy.
              </p>
            </Section>

            <Section title="7. Availability">
              <p>
                We may modify, suspend, or discontinue any part of the website
                without prior notice.
              </p>
            </Section>

            <Section title="8. Disclaimer of Warranties">
              <p>
                The website is provided on an “as available” and “as is” basis
                to the extent permitted by applicable law. We do not guarantee
                that the website will always be uninterrupted, error-free, or
                completely secure.
              </p>
            </Section>

            <Section title="9. Limitation of Liability">
              <p>
                To the extent permitted by applicable law, we are not
                responsible for indirect, incidental, special, or consequential
                losses arising from the use of the website.
              </p>
            </Section>

            <Section title="10. Changes">
              <p>
                These terms may be updated from time to time. Continued use of
                the website after changes are posted constitutes acceptance of
                the updated terms to the extent permitted by law.
              </p>
            </Section>

            <Section title="11. Contact">
              <p>
                Questions concerning these terms can be submitted through the
                Contact Us page.
              </p>
            </Section>
          </div>
        </article>

        <Footer />
      </main>
    </>
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
