import { useEffect, useState } from "react";
import { ArrowRight, BookOpen, Heart, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import API from "../services/api";
import SEO from "../components/SEO";

const FAVORITE_PREFIX = "gita-favorite-";

function getFavoriteKeys() {
  const favorites = [];

  for (let index = 0; index < localStorage.length; index++) {
    const key = localStorage.key(index);

    if (!key?.startsWith(FAVORITE_PREFIX)) {
      continue;
    }

    const parts = key.replace(FAVORITE_PREFIX, "").split("-");

    const chapterNumber = Number(parts[0]);
    const verseNumber = Number(parts[1]);

    if (
      Number.isInteger(chapterNumber) &&
      chapterNumber >= 1 &&
      chapterNumber <= 18 &&
      Number.isInteger(verseNumber) &&
      verseNumber >= 1
    ) {
      favorites.push({
        key,
        chapterNumber,
        verseNumber,
      });
    }
  }

  return favorites.sort(
    (a, b) =>
      a.chapterNumber - b.chapterNumber || a.verseNumber - b.verseNumber,
  );
}

export default function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    try {
      setLoading(true);
      setError("");

      const favoriteKeys = getFavoriteKeys();

      if (favoriteKeys.length === 0) {
        setFavorites([]);
        return;
      }

      const results = await Promise.allSettled(
        favoriteKeys.map(async (item) => {
          const response = await API.get(
            `/verses/chapter/${item.chapterNumber}/verse/${item.verseNumber}`,
          );

          const data = response.data;

          if (!data?.success || !data?.verse) {
            throw new Error(`श्लोक ${item.verseNumber} उपलब्ध नहीं है।`);
          }

          return {
            ...item,
            verse: data.verse,
          };
        }),
      );

      const loadedFavorites = results
        .filter((result) => result.status === "fulfilled")
        .map((result) => result.value);

      setFavorites(loadedFavorites);
    } catch (err) {
      console.error("Favorites loading error:", err);

      setError(
        err.response?.data?.message ||
          err.message ||
          "पसंदीदा श्लोक लोड नहीं हो सके।",
      );
    } finally {
      setLoading(false);
    }
  };

  const removeFavorite = (item) => {
    localStorage.removeItem(item.key);

    setFavorites((current) =>
      current.filter((favorite) => favorite.key !== item.key),
    );
  };

  const clearAllFavorites = () => {
    const favoriteKeys = getFavoriteKeys();

    favoriteKeys.forEach((item) => {
      localStorage.removeItem(item.key);
    });

    setFavorites([]);
  };

  return (
    <>
      <SEO
        title="पसंदीदा श्लोक | श्रीमद्भगवद्गीता"
        description="अपने सहेजे गए भगवद्गीता श्लोक पढ़ें।"
        canonical="/favorites"
        noindex
      />
      <main className="min-h-screen bg-[#faf7f0]">
        <Navbar />

        {/* HEADER */}
        <section className="relative overflow-hidden bg-[#111827] px-5 pb-20 pt-32">
          <div className="absolute -right-40 -top-40 h-96 w-96 rounded-full border border-amber-400/10" />

          <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full border border-amber-400/10" />

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
                <Heart size={18} fill="currentColor" />

                <span className="text-sm font-medium">पसंदीदा श्लोक</span>
              </div>

              <h1 className="mt-5 text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
                मेरे पसंदीदा श्लोक
              </h1>

              <p className="mt-5 max-w-2xl text-base leading-8 text-white/60 sm:text-lg">
                आपके द्वारा सहेजे गए भगवद्गीता के श्लोक यहाँ एक ही स्थान पर
                मिलेंगे।
              </p>
            </motion.div>
          </div>
        </section>

        {/* CONTENT */}
        <section className="mx-auto max-w-5xl px-5 py-14">
          {/* LOADING */}
          {loading && (
            <div className="py-20 text-center">
              <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-amber-200 border-t-amber-600" />

              <p className="mt-5 text-gray-500">
                पसंदीदा श्लोक लोड हो रहे हैं...
              </p>
            </div>
          )}

          {/* ERROR */}
          {!loading && error && (
            <div className="rounded-3xl border border-red-200 bg-red-50 p-10 text-center">
              <BookOpen size={42} className="mx-auto text-red-400" />

              <h2 className="mt-5 text-xl font-bold text-red-700">
                श्लोक लोड नहीं हो सके
              </h2>

              <p className="mt-3 leading-7 text-red-600">{error}</p>

              <button
                type="button"
                onClick={loadFavorites}
                className="mt-6 rounded-xl bg-red-600 px-5 py-3 font-semibold text-white transition hover:bg-red-700"
              >
                पुनः प्रयास करें
              </button>
            </div>
          )}

          {/* EMPTY */}
          {!loading && !error && favorites.length === 0 && (
            <div className="rounded-3xl border border-dashed border-amber-900/15 bg-white p-12 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50 text-red-400">
                <Heart size={30} />
              </div>

              <h2 className="mt-6 text-2xl font-bold text-gray-900">
                अभी कोई पसंदीदा श्लोक नहीं है
              </h2>

              <p className="mx-auto mt-3 max-w-lg leading-7 text-gray-500">
                किसी भी श्लोक को पढ़ते समय हृदय वाले बटन पर क्लिक करके उसे यहाँ
                सहेजें।
              </p>

              <Link
                to="/gita"
                className="mt-7 inline-flex items-center gap-2 rounded-xl bg-amber-600 px-5 py-3 font-semibold text-white transition hover:bg-amber-700"
              >
                <BookOpen size={18} />
                अध्याय देखें
              </Link>
            </div>
          )}

          {/* RESULTS */}
          {!loading && !error && favorites.length > 0 && (
            <>
              <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-sm font-semibold tracking-[0.15em] text-amber-600">
                    सहेजे गए श्लोक
                  </p>

                  <h2 className="mt-2 text-3xl font-bold text-gray-900">
                    आपका संग्रह
                  </h2>

                  <p className="mt-2 text-gray-500">
                    कुल {favorites.length} पसंदीदा श्लोक
                  </p>
                </div>

                <button
                  type="button"
                  onClick={clearAllFavorites}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-red-200 bg-white px-4 py-3 text-sm font-semibold text-red-500 transition hover:bg-red-50"
                >
                  <Trash2 size={17} />
                  सभी हटाएँ
                </button>
              </div>

              <div className="grid gap-5">
                {favorites.map((item, index) => (
                  <motion.article
                    key={item.key}
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
                    className="overflow-hidden rounded-3xl border border-gray-100 bg-white p-6 shadow-sm transition hover:border-amber-200 hover:shadow-lg sm:p-8"
                  >
                    <div className="flex flex-col gap-6">
                      {/* TOP */}
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-100 font-bold text-amber-700">
                            {item.verse.verseNumber}
                          </div>

                          <div>
                            <p className="text-xs font-semibold tracking-[0.15em] text-amber-600">
                              अध्याय {item.chapterNumber}
                            </p>

                            <p className="mt-1 text-sm text-gray-400">
                              श्लोक {item.verseNumber}
                            </p>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => removeFavorite(item)}
                          title="पसंदीदा से हटाएँ"
                          className="rounded-xl border border-red-100 p-3 text-red-400 transition hover:bg-red-50 hover:text-red-600"
                        >
                          <Heart size={18} fill="currentColor" />
                        </button>
                      </div>

                      {/* SANSKRIT */}
                      <div className="rounded-3xl bg-[#fffaf0] p-6 sm:p-8">
                        <p className="font-serif text-xl leading-[2] text-gray-900 sm:text-2xl">
                          {item.verse.sanskrit}
                        </p>
                      </div>

                      {/* TRANSLITERATION */}
                      {item.verse.transliteration && (
                        <div>
                          <p className="mb-2 text-xs font-bold tracking-[0.2em] text-amber-600">
                            संस्कृत का लिप्यंतरण
                          </p>

                          <p className="text-sm italic leading-7 text-gray-500">
                            {item.verse.transliteration}
                          </p>
                        </div>
                      )}

                      {/* HINDI */}
                      {item.verse.hindiMeaning && (
                        <div className="rounded-2xl bg-gray-50 p-5">
                          <p className="text-sm font-semibold text-amber-600">
                            हिंदी अर्थ
                          </p>

                          <p className="mt-2 leading-8 text-gray-700">
                            {item.verse.hindiMeaning}
                          </p>
                        </div>
                      )}

                      {/* ACTIONS */}
                      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-gray-100 pt-5">
                        <button
                          type="button"
                          onClick={() => removeFavorite(item)}
                          className="inline-flex items-center gap-2 text-sm font-semibold text-red-500 transition hover:text-red-700"
                        >
                          <Trash2 size={16} />
                          हटाएँ
                        </button>

                        <Link
                          to={`/gita/adhyay/${item.chapterNumber}/shlok/${item.verseNumber}`}
                          className="inline-flex items-center gap-2 rounded-xl bg-amber-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-amber-700"
                        >
                          पूरा श्लोक पढ़ें
                          <ArrowRight size={17} />
                        </Link>
                      </div>
                    </div>
                  </motion.article>
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
