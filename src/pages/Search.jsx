import { useEffect, useState } from "react";
import { ArrowRight, BookOpen, Search as SearchIcon, X } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import Footer from "../components/Footer";

import Navbar from "../components/Navbar";
import API from "../services/api";

export default function Search() {
  const [searchParams, setSearchParams] = useSearchParams();

  const queryFromUrl = searchParams.get("q") || "";

  const [query, setQuery] = useState(queryFromUrl);

  const [results, setResults] = useState([]);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  useEffect(() => {
    setQuery(queryFromUrl);

    if (!queryFromUrl.trim()) {
      setResults([]);
      setError("");
      return;
    }

    performSearch(queryFromUrl);
  }, [queryFromUrl]);

  const performSearch = async (searchQuery) => {
    try {
      setLoading(true);
      setError("");

      const response = await API.get(
        `/search?q=${encodeURIComponent(searchQuery.trim())}`,
      );

      console.log("✅ SEARCH RESPONSE:", response.data);

      if (!response.data?.success) {
        throw new Error(response.data?.message || "Search failed");
      }

      setResults(
        Array.isArray(response.data.verses) ? response.data.verses : [],
      );
    } catch (err) {
      console.error("Search error:", err);

      setError(
        err.response?.data?.message ||
          err.message ||
          "श्लोक खोजने में समस्या हुई।",
      );

      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const value = query.trim();

    if (!value) {
      setSearchParams({});
      setResults([]);
      return;
    }

    setSearchParams({
      q: value,
    });
  };

  const clearSearch = () => {
    setQuery("");
    setResults([]);
    setError("");
    setSearchParams({});
  };

  return (
    <main className="min-h-screen bg-[#faf7f0]">
      <Navbar />

      {/* HEADER */}
      <section className="relative overflow-hidden bg-[#111827] px-5 pb-20 pt-32">
        <div className="absolute -right-40 -top-40 h-96 w-96 rounded-full border border-amber-400/10" />

        <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-orange-500/5 blur-3xl" />

        <div className="relative mx-auto max-w-5xl">
          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.6,
            }}
          >
            <div className="flex items-center gap-2 text-amber-300">
              <SearchIcon size={18} />

              <span className="text-sm font-medium">श्लोक खोजें</span>
            </div>

            <h1 className="mt-5 text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
              भगवद्गीता में खोजें
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-8 text-white/60 sm:text-lg">
              संस्कृत श्लोक, लिप्यंतरण या हिंदी अर्थ के आधार पर कोई भी श्लोक
              खोजें।
            </p>

            {/* SEARCH */}
            <form onSubmit={handleSubmit} className="mt-8 max-w-3xl">
              <div className="flex items-center rounded-2xl border border-white/10 bg-white p-2 shadow-2xl">
                <SearchIcon size={21} className="ml-3 shrink-0 text-gray-400" />

                <input
                  type="text"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="जैसे: धर्म, कृष्ण, कर्म..."
                  className="min-w-0 flex-1 bg-transparent px-4 py-3 text-base text-gray-900 outline-none placeholder:text-gray-400"
                />

                {query && (
                  <button
                    type="button"
                    onClick={clearSearch}
                    className="mr-2 rounded-lg p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
                    title="खोज साफ करें"
                  >
                    <X size={18} />
                  </button>
                )}

                <button
                  type="submit"
                  className="rounded-xl bg-amber-600 px-5 py-3 font-semibold text-white transition hover:bg-amber-700"
                >
                  खोजें
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </section>

      {/* RESULTS */}
      <section className="mx-auto max-w-5xl px-5 py-14">
        {!queryFromUrl.trim() && (
          <div className="rounded-3xl border border-dashed border-amber-900/15 bg-white p-12 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-100 text-amber-600">
              <SearchIcon size={30} />
            </div>

            <h2 className="mt-6 text-2xl font-bold text-gray-900">
              श्लोक खोजें
            </h2>

            <p className="mx-auto mt-3 max-w-lg leading-7 text-gray-500">
              ऊपर दिए गए खोज बॉक्स में कोई शब्द लिखें और भगवद्गीता के संबंधित
              श्लोक खोजें।
            </p>
          </div>
        )}

        {loading && (
          <div className="py-16 text-center">
            <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-amber-200 border-t-amber-600" />

            <p className="mt-5 text-gray-500">श्लोक खोजे जा रहे हैं...</p>
          </div>
        )}

        {!loading && error && (
          <div className="rounded-3xl border border-red-200 bg-red-50 p-10 text-center">
            <h2 className="text-xl font-bold text-red-700">
              खोज में समस्या हुई
            </h2>

            <p className="mt-3 text-red-600">{error}</p>
          </div>
        )}

        {!loading && !error && queryFromUrl.trim() && results.length === 0 && (
          <div className="rounded-3xl border border-dashed border-amber-900/15 bg-white p-12 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-100 text-gray-500">
              <SearchIcon size={30} />
            </div>

            <h2 className="mt-6 text-2xl font-bold text-gray-900">
              कोई श्लोक नहीं मिला
            </h2>

            <p className="mt-3 leading-7 text-gray-500">
              किसी दूसरे शब्द से खोज करके देखें।
            </p>
          </div>
        )}

        {!loading && !error && results.length > 0 && (
          <>
            <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm font-semibold tracking-[0.15em] text-amber-600">
                  खोज परिणाम
                </p>

                <h2 className="mt-2 text-3xl font-bold text-gray-900">
                  संबंधित श्लोक
                </h2>
              </div>

              <p className="text-sm text-gray-500">{results.length} परिणाम</p>
            </div>

            <div className="grid gap-5">
              {results.map((verse, index) => (
                <motion.div
                  key={
                    verse._id || `${verse.chapterNumber}-${verse.verseNumber}`
                  }
                  initial={{
                    opacity: 0,
                    y: 15,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    duration: 0.3,
                    delay: Math.min(index * 0.04, 0.4),
                  }}
                >
                  <Link
                    to={`/gita/adhyay/${verse.chapterNumber}/shlok/${verse.verseNumber}`}
                    className="group block"
                  >
                    <article className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-amber-200 hover:shadow-xl sm:p-8">
                      <div className="flex items-start gap-5">
                        <div className="shrink-0">
                          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-100 font-bold text-amber-700 transition group-hover:bg-amber-600 group-hover:text-white">
                            {verse.verseNumber}
                          </div>
                        </div>

                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center justify-between gap-3">
                            <div>
                              <p className="text-xs font-semibold tracking-[0.15em] text-amber-600">
                                अध्याय {verse.chapterNumber}
                              </p>

                              <p className="mt-1 text-xs text-gray-400">
                                श्लोक {verse.verseNumber}
                              </p>
                            </div>

                            <ChevronIcon />
                          </div>

                          <p className="mt-5 font-serif text-xl leading-[1.9] text-gray-900 sm:text-2xl">
                            {verse.sanskrit}
                          </p>

                          {verse.transliteration && (
                            <p className="mt-4 line-clamp-2 text-sm italic leading-7 text-gray-500">
                              {verse.transliteration}
                            </p>
                          )}

                          {verse.hindiMeaning && (
                            <div className="mt-5 border-t border-gray-100 pt-5">
                              <p className="line-clamp-3 leading-7 text-gray-600">
                                {verse.hindiMeaning}
                              </p>
                            </div>
                          )}
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
  );
}

function ChevronIcon() {
  return (
    <ArrowRight
      size={20}
      className="shrink-0 text-gray-300 transition group-hover:translate-x-1 group-hover:text-amber-600"
    />
  );
}
