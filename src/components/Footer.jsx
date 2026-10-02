import {
  ArrowUp,
  BookOpen,
  Heart,
  Search,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="relative overflow-hidden bg-[#111827] text-white">
      {/* Decorative glow */}
      <div className="absolute -left-32 top-20 h-72 w-72 rounded-full bg-amber-500/10 blur-3xl" />

      <div className="absolute -right-32 bottom-0 h-80 w-80 rounded-full bg-orange-500/10 blur-3xl" />

      {/* Top divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-amber-400/40 to-transparent" />

      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        {/* =====================================================
            MAIN FOOTER
        ===================================================== */}
        <div className="grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-4">
          {/* ===================================================
              BRAND
          =================================================== */}
          <div className="lg:col-span-1">
            <Link to="/" className="group inline-flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-400 text-xl font-bold text-black shadow-lg shadow-amber-400/10 transition group-hover:scale-105">
                ॐ
              </div>

              <div>
                <h2 className="text-xl font-bold">श्रीमद्भगवद्गीता</h2>

                <p className="text-xs tracking-[0.15em] text-amber-300">
                  सनातन ज्ञान • शाश्वत संदेश
                </p>
              </div>
            </Link>

            <p className="mt-6 max-w-xl text-sm leading-8 text-white/60">
              भगवद्गीता के अध्यायों और श्लोकों को सरल, सुंदर और व्यवस्थित रूप
              में पढ़ने का एक प्रयास। संस्कृत श्लोक, लिप्यंतरण और हिंदी अर्थ के
              माध्यम से गीता के ज्ञान को सभी तक पहुँचाने का उद्देश्य।
            </p>

            <div className="mt-6 flex items-center gap-2 text-sm text-white/50">
              <Sparkles size={16} className="text-amber-400" />
              ज्ञान की यात्रा यहीं से शुरू करें।
            </div>
          </div>

          {/* ===================================================
              QUICK LINKS
          =================================================== */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-amber-300">
              त्वरित लिंक
            </h3>

            <div className="mt-5 space-y-3">
              <FooterLink to="/" label="मुख्य पृष्ठ" />

              <FooterLink to="/gita" label="सभी अध्याय" />

              <FooterLink to="/search" label="श्लोक खोजें" />

              <FooterLink to="/favorites" label="पसंदीदा श्लोक" />

              <FooterLink to="/about" label="हमारे बारे में" />

              <FooterLink to="/contact" label="संपर्क करें" />
            </div>
          </div>

          {/* ===================================================
              GITA
          =================================================== */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-amber-300">
              भगवद्गीता
            </h3>

            <div className="mt-5 space-y-3">
              <Link
                to="/gita/adhyay/1"
                className="block text-sm text-white/60 transition hover:text-amber-300"
              >
                अर्जुन विषाद योग
              </Link>

              <Link
                to="/gita/adhyay/2"
                className="block text-sm text-white/60 transition hover:text-amber-300"
              >
                सांख्य योग
              </Link>

              <Link
                to="/gita/adhyay/4"
                className="block text-sm text-white/60 transition hover:text-amber-300"
              >
                ज्ञान कर्म संन्यास योग
              </Link>

              <Link
                to="/gita/adhyay/12"
                className="block text-sm text-white/60 transition hover:text-amber-300"
              >
                भक्ति योग
              </Link>

              <Link
                to="/gita/adhyay/18"
                className="block text-sm text-white/60 transition hover:text-amber-300"
              >
                मोक्ष संन्यास योग
              </Link>
            </div>
          </div>

          {/* ===================================================
              LEGAL / POLICY
          =================================================== */}
          <div>
            <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-[0.2em] text-amber-300">
              <ShieldCheck size={16} />
              नीतियाँ
            </h3>

            <div className="mt-5 space-y-3">
              <FooterLink to="/privacy-policy" label="गोपनीयता नीति" />

              <FooterLink to="/cookie-policy" label="कुकी नीति" />

              <FooterLink to="/terms" label="उपयोग की शर्तें" />

              <FooterLink to="/disclaimer" label="अस्वीकरण" />

              <FooterLink to="/advertising-policy" label="विज्ञापन नीति" />
            </div>
          </div>
        </div>

        {/* =====================================================
            SANSKRIT QUOTE
        ===================================================== */}
        <div className="border-t border-white/10 py-10 text-center">
          <motion.div
            initial={{
              opacity: 0,
              y: 10,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.8,
            }}
          >
            <div className="mx-auto flex items-center justify-center gap-4">
              <div className="h-px w-16 bg-amber-400/30" />

              <BookOpen size={18} className="text-amber-400" />

              <div className="h-px w-16 bg-amber-400/30" />
            </div>

            <p className="mt-6 font-serif text-xl leading-10 text-amber-200 sm:text-2xl">
              ॥ धर्मो रक्षति रक्षितः ॥
            </p>

            <p className="mt-3 text-sm text-white/40">
              धर्म की रक्षा करने वाले की धर्म रक्षा करता है।
            </p>
          </motion.div>
        </div>

        {/* =====================================================
            BOTTOM BAR
        ===================================================== */}
        <div className="flex flex-col gap-6 border-t border-white/10 py-7 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-medium text-white/70">
              © {new Date().getFullYear()} श्रीमद्भगवद्गीता
            </p>

            <p className="mt-1 text-xs text-white/35">
              सनातन ज्ञान को आधुनिक रूप में प्रस्तुत करने का प्रयास।
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <Link
              to="/gita"
              className="flex items-center gap-2 text-sm text-white/50 transition hover:text-amber-300"
            >
              <BookOpen size={16} />
              पढ़ें
            </Link>

            <Link
              to="/search"
              className="flex items-center gap-2 text-sm text-white/50 transition hover:text-amber-300"
            >
              <Search size={16} />
              खोजें
            </Link>

            <Link
              to="/privacy-policy"
              className="text-sm text-white/40 transition hover:text-amber-300"
            >
              गोपनीयता
            </Link>

            <Link
              to="/contact"
              className="text-sm text-white/40 transition hover:text-amber-300"
            >
              संपर्क
            </Link>

            <button
              type="button"
              onClick={scrollToTop}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/50 transition hover:border-amber-400/40 hover:text-amber-300"
              title="ऊपर जाएँ"
              aria-label="ऊपर जाएँ"
            >
              <ArrowUp size={17} />
            </button>
          </div>
        </div>

        {/* =====================================================
            HEART
        ===================================================== */}
        <div className="pb-8 text-center text-xs text-white/25">
          <span className="inline-flex items-center gap-1">
            श्रद्धा और समर्पण के साथ
            <Heart size={12} className="text-amber-500" fill="currentColor" />
          </span>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({ to, label }) {
  return (
    <Link
      to={to}
      className="flex items-center gap-2 text-sm text-white/60 transition hover:text-amber-300"
    >
      <span className="h-1.5 w-1.5 rounded-full bg-amber-400/60" />

      {label}
    </Link>
  );
}
