import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Footer from "../components/Footer";

import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  ChevronRight,
  Volume2,
} from "lucide-react";

import { motion } from "framer-motion";

import Navbar from "../components/Navbar";
import SEO from "../components/SEO";
import API from "../services/api";

export default function Chapter() {
  const { chapterNumber } = useParams();

  const [chapter, setChapter] = useState(null);
  const [verses, setVerses] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!chapterNumber) {
      setError("अध्याय नंबर उपलब्ध नहीं है।");
      setLoading(false);
      return;
    }

    loadChapter();
  }, [chapterNumber]);

  const loadChapter = async () => {
    try {
      setLoading(true);
      setError("");

      console.log("✅ SINGLE CHAPTER:", chapterNumber);

      const [chapterResponse, versesResponse] = await Promise.all([
        API.get(`/chapters/${chapterNumber}`),
        API.get(`/verses/chapter/${chapterNumber}`),
      ]);

      const chapterData = chapterResponse.data;

      const versesData = versesResponse.data;

      console.log("✅ CHAPTER RESPONSE:", chapterData);

      console.log("✅ VERSES RESPONSE:", versesData);

      if (!chapterData?.success) {
        throw new Error(chapterData?.message || "Chapter not found");
      }

      if (!versesData?.success) {
        throw new Error(versesData?.message || "Verses could not be loaded");
      }

      setChapter(chapterData.data);

      // IMPORTANT:
      // Backend returns { verses: [...] }
      setVerses(Array.isArray(versesData.verses) ? versesData.verses : []);
    } catch (err) {
      console.error("❌ Chapter loading error:", err);

      setError(
        err.response?.data?.message || err.message || "अध्याय लोड नहीं हो सका।",
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-[#faf7f0]">
        <Navbar />

        <section className="flex min-h-[70vh] items-center justify-center pt-24">
          <div className="text-center">
            <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-amber-200 border-t-amber-600" />

            <p className="mt-5 text-gray-500">अध्याय लोड हो रहा है...</p>
          </div>
        </section>
      </main>
    );
  }

  if (error || !chapter) {
    return (
      <>
        <SEO
          title={`अध्याय ${chapter.number} — ${chapter.title} | श्रीमद्भगवद्गीता`}
          description={
            chapter.description ||
            `भगवद्गीता के अध्याय ${chapter.number} के सभी श्लोक संस्कृत पाठ, लिप्यंतरण और हिंदी अर्थ के साथ पढ़ें।`
          }
          canonical={`/gita/adhyay/${chapter.number}`}
          type="article"
        />
        <main className="min-h-screen bg-[#faf7f0]">
          <Navbar />

          <section className="flex min-h-[70vh] items-center justify-center px-5 pt-24">
            <div className="max-w-lg text-center">
              <BookOpen size={50} className="mx-auto text-amber-500" />

              <h1 className="mt-6 text-2xl font-bold">अध्याय उपलब्ध नहीं है</h1>

              <p className="mt-3 text-gray-500">{error}</p>

              <Link
                to="/gita"
                className="mt-7 inline-flex items-center gap-2 rounded-xl bg-amber-600 px-5 py-3 font-semibold text-white"
              >
                <ArrowLeft size={18} />
                सभी अध्याय
              </Link>
            </div>
          </section>
        </main>
      </>
    );
  }

  return (
    <>
      <SEO
        title={`अध्याय ${chapter.number} — ${chapter.title} | श्रीमद्भगवद्गीता`}
        description={
          chapter.description ||
          `भगवद्गीता के अध्याय ${chapter.number} के सभी श्लोक संस्कृत पाठ, लिप्यंतरण और हिंदी अर्थ के साथ पढ़ें।`
        }
        canonical={`/gita/adhyay/${chapter.number}`}
        type="article"
      />
      <main className="min-h-screen bg-[#faf7f0]">
        <Navbar />

        {/* HERO */}
        <section className="relative overflow-hidden bg-[#111827] px-5 pb-20 pt-32">
          <div className="absolute -right-40 -top-40 h-96 w-96 rounded-full border border-amber-400/10" />

          <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full border border-amber-400/10" />

          <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-orange-500/5 blur-3xl" />

          <div className="relative mx-auto max-w-6xl">
            <Link
              to="/gita"
              className="inline-flex items-center gap-2 text-sm font-medium text-white/60 transition hover:text-white"
            >
              <ArrowLeft size={17} />
              सभी अध्याय
            </Link>

            <div className="mt-10 max-w-3xl">
              <div className="flex items-center gap-4">
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-500 text-xl font-bold text-white shadow-lg">
                  {chapter.number}
                </span>

                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-300">
                    अध्याय {chapter.number}
                  </p>

                  <p className="mt-1 text-sm text-white/40">
                    {chapter.englishTitle}
                  </p>
                </div>
              </div>

              <p className="mt-4 text-xs font-medium uppercase tracking-[0.2em] text-amber-300/70">
                PAGE: SINGLE CHAPTER
              </p>

              <h1 className="mt-8 text-4xl font-bold leading-tight text-white sm:text-6xl">
                {chapter.title}
              </h1>

              <p className="mt-6 max-w-2xl text-lg leading-8 text-white/60">
                {chapter.description}
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/70">
                  {chapter.verseCount} श्लोक
                </div>

                <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/70">
                  {verses.length} उपलब्ध
                </div>

                <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/70">
                  भगवद्गीता
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* VERSES */}
        <section className="mx-auto max-w-6xl px-5 py-14">
          <div className="mb-10 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-600">
                अध्याय के श्लोक
              </p>

              <h2 className="mt-2 text-3xl font-bold text-gray-900">
                श्लोक संग्रह
              </h2>
            </div>

            <p className="text-sm text-gray-500">
              {verses.length} श्लोक उपलब्ध
            </p>
          </div>

          {verses.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-amber-900/20 bg-white p-12 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-100 text-amber-600">
                <BookOpen size={30} />
              </div>

              <h3 className="mt-6 text-xl font-bold text-gray-900">
                इस अध्याय के श्लोक उपलब्ध नहीं हैं
              </h3>

              <p className="mx-auto mt-3 max-w-md leading-7 text-gray-500">
                MongoDB में इस अध्याय के verse records नहीं मिले।
              </p>
            </div>
          ) : (
            <div className="grid gap-5">
              {verses.map((verse, index) => (
                <motion.div
                  key={verse._id || `${chapterNumber}-${verse.verseNumber}`}
                  initial={{
                    opacity: 0,
                    y: 15,
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
                    to={`/gita/adhyay/${chapterNumber}/shlok/${verse.verseNumber}`}
                    className="group block"
                  >
                    <article className="relative overflow-hidden rounded-3xl border border-gray-100 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-amber-200 hover:shadow-xl sm:p-8">
                      <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-amber-50 opacity-0 transition group-hover:opacity-100" />

                      <div className="relative flex gap-5">
                        <div className="shrink-0">
                          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-100 font-bold text-amber-700 transition group-hover:bg-amber-600 group-hover:text-white">
                            {verse.verseNumber}
                          </div>
                        </div>

                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center justify-between gap-3">
                            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-gray-400">
                              श्लोक {verse.verseNumber}
                            </p>

                            <div className="flex items-center gap-3">
                              {verse.audioSanskritUrl && (
                                <Volume2 size={17} className="text-amber-600" />
                              )}

                              <ChevronRight
                                size={20}
                                className="text-gray-300 transition group-hover:translate-x-1 group-hover:text-amber-600"
                              />
                            </div>
                          </div>

                          <p className="mt-4 font-serif text-xl leading-[1.9] text-gray-900 sm:text-2xl">
                            {verse.sanskrit}
                          </p>

                          {verse.transliteration && (
                            <p className="mt-3 text-sm italic leading-7 text-gray-400">
                              {verse.transliteration}
                            </p>
                          )}

                          <div className="mt-5 border-t border-gray-100 pt-5">
                            <p className="line-clamp-3 leading-7 text-gray-600">
                              {verse.hindiMeaning}
                            </p>
                          </div>

                          {verse.tags?.length > 0 && (
                            <div className="mt-4 flex flex-wrap gap-2">
                              {verse.tags.slice(0, 4).map((tag) => (
                                <span
                                  key={tag}
                                  className="rounded-full bg-gray-50 px-3 py-1 text-xs text-gray-500"
                                >
                                  #{tag}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </article>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </section>

        {/* BOTTOM */}
        <section className="border-t border-gray-100 bg-white">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-8">
            <Link
              to="/gita"
              className="inline-flex items-center gap-2 font-semibold text-gray-600 transition hover:text-amber-600"
            >
              <ArrowLeft size={18} />
              सभी अध्याय
            </Link>

            {verses.length > 0 && (
              <Link
                to={`/gita/adhyay/${chapterNumber}/shlok/${verses[0].verseNumber}`}
                className="inline-flex items-center gap-2 rounded-xl bg-amber-600 px-5 py-3 font-semibold text-white transition hover:bg-amber-700"
              >
                पहला श्लोक
                <ArrowRight size={18} />
              </Link>
            )}
          </div>
        </section>
        <Footer />
      </main>
    </>
  );
}
