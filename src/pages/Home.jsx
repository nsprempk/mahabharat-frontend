import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Footer from "../components/Footer";
import SEO from "../components/SEO";

import { InArticleAd, MultiplexAd } from "../components/AdUnit";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#faf7f0]">
      <SEO
        title="श्रीमद्भगवद्गीता | 18 अध्याय और 700 श्लोक"
        description="श्रीमद्भगवद्गीता के 18 अध्याय और 700 श्लोक संस्कृत पाठ, लिप्यंतरण और हिंदी अर्थ के साथ पढ़ें।"
        canonical="/"
      />

      <Navbar />

      <Hero />

      {/* INTRODUCTION */}
      <section className="px-5 py-24">
        <div className="mx-auto max-w-7xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-600">
            ज्ञान की यात्रा
          </p>

          <h2 className="mt-4 text-3xl font-bold text-gray-900 sm:text-4xl">
            भगवद्गीता का ज्ञान पढ़ें
          </h2>

          <p className="mx-auto mt-5 max-w-2xl leading-8 text-gray-600">
            श्रीमद्भगवद्गीता के अध्यायों और श्लोकों को संस्कृत, हिंदी अर्थ,
            चित्र और ऑडियो के साथ पढ़ें।
          </p>
        </div>
      </section>

      {/* AD 1 */}
      <div className="mx-auto max-w-5xl px-5">
        <InArticleAd />
      </div>

      {/* EXPLORE */}
      <section className="px-5 pb-24">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-3xl border border-amber-900/10 bg-white p-8 text-center shadow-sm sm:p-10">
            <p className="text-sm font-semibold tracking-[0.2em] text-amber-600">
              श्रीमद्भगवद्गीता
            </p>

            <h2 className="mt-3 text-3xl font-bold text-gray-900">
              18 अध्यायों की यात्रा
            </h2>

            <p className="mx-auto mt-4 max-w-2xl leading-8 text-gray-500">
              प्रत्येक अध्याय में उपलब्ध श्लोकों को पढ़ें और उनके हिंदी अर्थ को
              समझें।
            </p>
          </div>
        </div>
      </section>

      {/* AD 2 */}
      <div className="mx-auto max-w-5xl px-5 pb-16">
        <MultiplexAd />
      </div>

      <Footer />
    </main>
  );
}
