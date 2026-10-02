import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import Footer from "../components/Footer";

import Navbar from "../components/Navbar";
import API from "../services/api";
import SEO from "../components/SEO";

const HISTORY_KEY = "gita-reading-history";

function getLastReading() {
  try {
    const history = JSON.parse(localStorage.getItem(HISTORY_KEY) || "[]");

    if (!Array.isArray(history)) {
      return null;
    }

    return history[0] || null;
  } catch (error) {
    console.warn("Reading history could not be loaded:", error);

    return null;
  }
}

export default function Chapters() {
  const [chapters, setChapters] = useState([]);
  const [lastReading, setLastReading] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;

    const loadChapters = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await API.get("/chapters");

        console.log("✅ CHAPTERS API RESPONSE:", response.data);

        if (!response.data?.success) {
          throw new Error(
            response.data?.message || "Chapters could not be loaded",
          );
        }

        const chapterList = response.data.data || response.data.chapters || [];

        if (!Array.isArray(chapterList)) {
          throw new Error("Invalid chapters response from server");
        }

        if (mounted) {
          setChapters(chapterList);
          setLastReading(getLastReading());
        }
      } catch (err) {
        console.error("❌ Chapters loading error:", err);

        if (mounted) {
          setError(
            err.response?.data?.message ||
              err.message ||
              "अध्याय लोड नहीं हो सके।",
          );
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    loadChapters();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <>
      <SEO
        title="भगवद्गीता के 18 अध्याय | श्रीमद्भगवद्गीता"
        description="भगवद्गीता के सभी 18 अध्याय पढ़ें और प्रत्येक अध्याय के श्लोक, संस्कृत पाठ, लिप्यंतरण और हिंदी अर्थ तक पहुँचें।"
        canonical="/gita"
      />
      <main className="min-h-screen bg-[#faf7f0]">
        <Navbar />

        {/* =====================================================
          HEADER
      ===================================================== */}
        <section className="relative overflow-hidden bg-[#111827] px-5 pb-20 pt-32">
          {/* Decorative circles */}
          <div className="absolute -right-40 -top-40 h-96 w-96 rounded-full border border-amber-400/10" />

          <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full border border-amber-400/10" />

          <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-orange-500/5 blur-3xl" />

          <div className="relative mx-auto max-w-7xl">
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

                <span className="text-sm font-medium">श्रीमद्भगवद्गीता</span>
              </div>

              <h1 className="mt-5 text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
                भगवद्गीता के 18 अध्याय
              </h1>

              <p className="mt-5 max-w-2xl text-base leading-8 text-white/60 sm:text-lg">
                श्रीकृष्ण द्वारा अर्जुन को दिए गए दिव्य ज्ञान को अध्यायवार
                पढ़ें।
              </p>
            </motion.div>
          </div>
        </section>

        {/* =====================================================
          CONTENT
      ===================================================== */}
        <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
          {/* LOADING */}
          {loading && (
            <div className="py-20 text-center">
              <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-amber-200 border-t-amber-600" />

              <p className="mt-5 text-gray-500">अध्याय लोड हो रहे हैं...</p>
            </div>
          )}

          {/* ERROR */}
          {!loading && error && (
            <div className="rounded-3xl border border-red-200 bg-red-50 p-10 text-center">
              <BookOpen size={42} className="mx-auto text-red-400" />

              <h2 className="mt-5 text-xl font-bold text-red-700">
                अध्याय लोड नहीं हो सके
              </h2>

              <p className="mt-3 text-red-600">{error}</p>

              <button
                type="button"
                onClick={() => window.location.reload()}
                className="mt-6 rounded-xl bg-red-600 px-5 py-3 font-semibold text-white transition hover:bg-red-700"
              >
                पुनः प्रयास करें
              </button>
            </div>
          )}

          {/* EMPTY */}
          {!loading && !error && chapters.length === 0 && (
            <div className="rounded-3xl border border-dashed border-amber-900/20 bg-white p-12 text-center">
              <BookOpen size={42} className="mx-auto text-amber-500" />

              <h2 className="mt-5 text-2xl font-bold text-gray-900">
                कोई अध्याय नहीं मिला
              </h2>

              <p className="mt-3 text-gray-500">
                MongoDB में chapter records उपलब्ध नहीं हैं।
              </p>
            </div>
          )}

          {/* DATA */}
          {!loading && !error && chapters.length > 0 && (
            <>
              {/* =================================================
                  CONTINUE READING
              ================================================= */}
              {lastReading && (
                <motion.div
                  initial={{
                    opacity: 0,
                    y: 15,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    duration: 0.5,
                  }}
                  className="mb-10 overflow-hidden rounded-3xl border border-amber-200 bg-gradient-to-r from-amber-50 via-white to-orange-50 p-6 shadow-sm sm:p-7"
                >
                  <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-amber-500" />

                        <p className="text-xs font-bold tracking-[0.18em] text-amber-600">
                          पढ़ना जारी रखें
                        </p>
                      </div>

                      <h3 className="mt-3 text-xl font-bold text-gray-900 sm:text-2xl">
                        अध्याय {lastReading.chapterNumber} • श्लोक{" "}
                        {lastReading.verseNumber}
                      </h3>

                      {lastReading.sanskrit && (
                        <p className="mt-3 line-clamp-2 max-w-3xl font-serif text-base leading-8 text-gray-600 sm:text-lg">
                          {lastReading.sanskrit}
                        </p>
                      )}
                    </div>

                    <Link
                      to={`/gita/adhyay/${lastReading.chapterNumber}/shlok/${lastReading.verseNumber}`}
                      className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-amber-600 px-5 py-3.5 font-semibold text-white transition hover:bg-amber-700 hover:shadow-lg"
                    >
                      पढ़ना जारी रखें
                      <ArrowRight
                        size={18}
                        className="transition group-hover:translate-x-1"
                      />
                    </Link>
                  </div>
                </motion.div>
              )}

              {/* =================================================
                  SECTION TITLE
              ================================================= */}
              <div className="mb-10">
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-amber-600">
                  Adhyay
                </p>

                <h2 className="mt-2 text-3xl font-bold text-gray-900 sm:text-4xl">
                  ज्ञान की यात्रा शुरू करें
                </h2>

                <p className="mt-3 max-w-2xl text-gray-500">
                  किसी भी अध्याय को चुनकर उसके श्लोक पढ़ें।
                </p>
              </div>

              {/* =================================================
                  CHAPTER GRID
              ================================================= */}
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {chapters.map((chapter, index) => (
                  <motion.div
                    key={chapter._id || `chapter-${chapter.number}`}
                    initial={{
                      opacity: 0,
                      y: 20,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      duration: 0.35,
                      delay: Math.min(index * 0.04, 0.5),
                    }}
                  >
                    <Link
                      to={`/gita/adhyay/${chapter.number}`}
                      className="group block h-full"
                    >
                      <article className="relative h-full overflow-hidden rounded-3xl border border-gray-100 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-2 hover:border-amber-200 hover:shadow-xl">
                        {/* Hover glow */}
                        <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-amber-50 opacity-0 blur-2xl transition duration-300 group-hover:opacity-100" />

                        {/* Small bottom glow */}
                        <div className="absolute -bottom-20 -left-20 h-40 w-40 rounded-full bg-orange-50 opacity-0 blur-3xl transition duration-300 group-hover:opacity-100" />

                        <div className="relative">
                          {/* Top */}
                          <div className="flex items-start justify-between">
                            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-100 text-lg font-bold text-amber-700 transition duration-300 group-hover:bg-amber-600 group-hover:text-white">
                              {String(chapter.number).padStart(2, "0")}
                            </div>

                            <BookOpen
                              size={22}
                              className="text-amber-500/50 transition group-hover:text-amber-600"
                            />
                          </div>

                          {/* Title */}
                          <h3 className="mt-7 text-2xl font-bold text-gray-900">
                            {chapter.title}
                          </h3>

                          {/* English chapter title
                                is only the chapter name,
                                not a meaning. */}
                          {chapter.englishTitle && (
                            <p className="mt-2 text-sm text-gray-400">
                              {chapter.englishTitle}
                            </p>
                          )}

                          {/* Chapter description */}
                          {chapter.description && (
                            <p className="mt-5 line-clamp-3 leading-7 text-gray-600">
                              {chapter.description}
                            </p>
                          )}

                          {/* Footer */}
                          <div className="mt-7 flex items-center justify-between border-t border-gray-100 pt-5">
                            <span className="text-sm text-gray-500">
                              {chapter.verseCount} श्लोक
                            </span>

                            <span className="flex items-center gap-2 text-sm font-semibold text-amber-700">
                              पढ़ें
                              <ArrowRight
                                size={17}
                                className="transition group-hover:translate-x-1"
                              />
                            </span>
                          </div>
                        </div>
                      </article>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </>
          )}
        </section>
        <Footer />
      </main>
    </>
  );
}
