import {
  ArrowRight,
  BookOpen,
  Heart,
  ScrollText,
  Sparkles,
  Users,
} from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SEO from "../components/SEO";

export default function About() {
  return (
    <>
      <SEO
        title="हमारे बारे में | श्रीमद्भगवद्गीता"
        description="श्रीमद्भगवद्गीता वेबसाइट के उद्देश्य, सामग्री और गीता के अध्यायों तथा श्लोकों को सरल रूप में प्रस्तुत करने के बारे में जानें।"
        canonical="/about"
      />
      <main className="min-h-screen bg-[#faf7f0]">
        <Navbar />

        {/* HERO */}
        <section className="relative overflow-hidden bg-[#111827] px-5 pb-24 pt-32">
          <div className="absolute -right-40 -top-40 h-96 w-96 rounded-full border border-amber-400/10" />

          <div className="absolute -right-20 top-20 h-72 w-72 rounded-full bg-amber-500/5 blur-3xl" />

          <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-orange-500/5 blur-3xl" />

          <div className="relative mx-auto max-w-5xl">
            <motion.div
              initial={{
                opacity: 0,
                y: 25,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.7,
              }}
            >
              <div className="flex items-center gap-2 text-amber-300">
                <Sparkles size={18} />

                <span className="text-sm font-medium">हमारे बारे में</span>
              </div>

              <h1 className="mt-5 max-w-4xl text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
                भगवद्गीता के ज्ञान को सरल रूप में पढ़ें
              </h1>

              <p className="mt-6 max-w-3xl text-base leading-8 text-white/60 sm:text-lg">
                यह वेबसाइट श्रीमद्भगवद्गीता के अध्यायों और श्लोकों को एक सुंदर,
                सरल और व्यवस्थित रूप में प्रस्तुत करने का प्रयास है।
              </p>
            </motion.div>
          </div>
        </section>

        {/* INTRODUCTION */}
        <section className="mx-auto max-w-6xl px-5 py-16">
          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
            <motion.article
              initial={{
                opacity: 0,
                y: 20,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
              }}
              className="rounded-3xl border border-gray-100 bg-white p-7 shadow-sm sm:p-9"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-100 text-amber-600">
                <BookOpen size={26} />
              </div>

              <h2 className="mt-7 text-3xl font-bold text-gray-900">
                इस वेबसाइट का उद्देश्य
              </h2>

              <p className="mt-5 leading-8 text-gray-600">
                हमारा उद्देश्य भगवद्गीता के श्लोकों को इस प्रकार प्रस्तुत करना
                है कि पाठक अध्याय चुनकर आसानी से प्रत्येक श्लोक पढ़ सके, संस्कृत
                पाठ देख सके, उसका लिप्यंतरण पढ़ सके और हिंदी अर्थ समझ सके।
              </p>

              <p className="mt-5 leading-8 text-gray-600">
                इस वेबसाइट का इंटरफ़ेस आधुनिक रखा गया है, लेकिन इसकी सामग्री को
                पढ़ते समय सरलता, स्पष्टता और शांत अनुभव को प्राथमिकता दी गई है।
              </p>
            </motion.article>

            <motion.article
              initial={{
                opacity: 0,
                y: 20,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                delay: 0.1,
              }}
              className="rounded-3xl bg-[#111827] p-7 text-white shadow-xl sm:p-9"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-400 text-black">
                <ScrollText size={26} />
              </div>

              <h2 className="mt-7 text-3xl font-bold">भगवद्गीता</h2>

              <p className="mt-5 leading-8 text-white/60">
                अध्यायों और श्लोकों के माध्यम से अर्जुन और श्रीकृष्ण के संवाद को
                क्रमबद्ध रूप में पढ़ें।
              </p>

              <div className="mt-8 grid grid-cols-2 gap-3">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-2xl font-bold text-amber-300">18</p>

                  <p className="mt-1 text-sm text-white/50">अध्याय</p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-2xl font-bold text-amber-300">700</p>

                  <p className="mt-1 text-sm text-white/50">श्लोक</p>
                </div>
              </div>
            </motion.article>
          </div>
        </section>

        {/* FEATURES */}
        <section className="bg-white px-5 py-16">
          <div className="mx-auto max-w-6xl">
            <div className="text-center">
              <p className="text-sm font-semibold tracking-[0.2em] text-amber-600">
                विशेषताएँ
              </p>

              <h2 className="mt-3 text-3xl font-bold text-gray-900 sm:text-4xl">
                पढ़ने का सरल अनुभव
              </h2>

              <p className="mx-auto mt-4 max-w-2xl leading-8 text-gray-500">
                आवश्यक जानकारी को एक ही स्थान पर व्यवस्थित रूप से उपलब्ध कराने
                का प्रयास।
              </p>
            </div>

            <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <FeatureCard
                icon={<BookOpen size={22} />}
                title="अध्यायवार पाठ"
                description="सभी अध्यायों को क्रम से चुनकर श्लोक पढ़ें।"
              />

              <FeatureCard
                icon={<ScrollText size={22} />}
                title="संस्कृत और लिप्यंतरण"
                description="मूल संस्कृत पाठ के साथ रोमन लिप्यंतरण पढ़ें।"
              />

              <FeatureCard
                icon={<Heart size={22} />}
                title="पसंदीदा श्लोक"
                description="महत्वपूर्ण श्लोकों को सहेजकर बाद में फिर पढ़ें।"
              />

              <FeatureCard
                icon={<Users size={22} />}
                title="सरल प्रस्तुति"
                description="पाठ को स्पष्ट और सुविधाजनक ढंग से पढ़ने के लिए बनाया गया अनुभव।"
              />
            </div>
          </div>
        </section>

        {/* PRINCIPLE */}
        <section className="px-5 py-16">
          <div className="mx-auto max-w-5xl">
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.98,
              }}
              whileInView={{
                opacity: 1,
                scale: 1,
              }}
              viewport={{
                once: true,
              }}
              className="overflow-hidden rounded-[2rem] bg-gradient-to-br from-amber-50 via-white to-orange-50 p-8 text-center shadow-sm sm:p-12"
            >
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-100 font-serif text-3xl text-amber-600">
                ॐ
              </div>

              <p className="mt-7 font-serif text-2xl leading-10 text-gray-900 sm:text-3xl">
                ॥ धर्मो रक्षति रक्षितः ॥
              </p>

              <p className="mx-auto mt-4 max-w-xl leading-8 text-gray-600">
                धर्म की रक्षा करने वाले की धर्म रक्षा करता है।
              </p>
            </motion.div>
          </div>
        </section>

        {/* CTA */}
        <section className="px-5 pb-16">
          <div className="mx-auto max-w-5xl rounded-3xl bg-[#111827] p-8 text-center shadow-xl sm:p-12">
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              गीता का पाठ शुरू करें
            </h2>

            <p className="mx-auto mt-4 max-w-2xl leading-8 text-white/60">
              किसी भी अध्याय को चुनें और श्लोकों की यात्रा शुरू करें।
            </p>

            <Link
              to="/gita"
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-amber-400 px-6 py-3.5 font-semibold text-black transition hover:bg-amber-300"
            >
              अध्याय देखें
              <ArrowRight size={18} />
            </Link>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="rounded-3xl border border-gray-100 bg-[#faf7f0] p-6 transition hover:-translate-y-1 hover:border-amber-200 hover:shadow-lg">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-100 text-amber-600">
        {icon}
      </div>

      <h3 className="mt-5 text-xl font-bold text-gray-900">{title}</h3>

      <p className="mt-3 text-sm leading-7 text-gray-600">{description}</p>
    </div>
  );
}
