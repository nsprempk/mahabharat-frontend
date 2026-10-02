import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Footer from "../components/Footer";
import SEO from "../components/SEO";

export default function Home() {
  return (
    <>
      <SEO
        title="श्रीमद्भगवद्गीता — भगवद्गीता के 18 अध्याय और 700 श्लोक"
        description="श्रीमद्भगवद्गीता के 18 अध्याय और 700 श्लोक संस्कृत पाठ, लिप्यंतरण और हिंदी अर्थ के साथ पढ़ें।"
        canonical="/"
      />
      <main className="min-h-screen bg-[#faf7f0]">
        <Navbar />
        <Hero />

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
        <Footer />
      </main>
    </>
  );
}
