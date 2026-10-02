import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Copy,
  Heart,
  Share2,
  Volume2,
} from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import Footer from "../components/Footer";

import Navbar from "../components/Navbar";
import SEO from "../components/SEO";
import API from "../services/api";

/*
|--------------------------------------------------------------------------
| Transliteration formatting
|--------------------------------------------------------------------------
*/

function formatTransliteration(text = "") {
  const words = text.trim().split(/\s+/);

  if (!words.length || !text.trim()) {
    return [];
  }

  const lines = [];
  let currentLine = [];
  let currentLength = 0;

  words.forEach((word) => {
    const nextLength =
      currentLength + word.length + (currentLine.length ? 1 : 0);

    if (currentLine.length >= 4 || nextLength > 36) {
      lines.push(currentLine.join(" "));

      currentLine = [word];
      currentLength = word.length;
    } else {
      currentLine.push(word);
      currentLength = nextLength;
    }
  });

  if (currentLine.length) {
    lines.push(currentLine.join(" "));
  }

  return lines;
}

/*
|--------------------------------------------------------------------------
| Reading history
|--------------------------------------------------------------------------
*/

const HISTORY_KEY = "gita-reading-history";

function saveReadingHistory({ chapterNumber, verseNumber, sanskrit }) {
  try {
    const oldHistory = JSON.parse(localStorage.getItem(HISTORY_KEY) || "[]");

    const newEntry = {
      chapterNumber: Number(chapterNumber),

      verseNumber: Number(verseNumber),

      sanskrit: sanskrit || "",

      updatedAt: new Date().toISOString(),
    };

    const filtered = oldHistory.filter(
      (item) =>
        !(
          Number(item.chapterNumber) === Number(chapterNumber) &&
          Number(item.verseNumber) === Number(verseNumber)
        ),
    );

    filtered.unshift(newEntry);

    localStorage.setItem(HISTORY_KEY, JSON.stringify(filtered.slice(0, 20)));
  } catch (error) {
    console.warn("Reading history could not be saved:", error);
  }
}

export default function Verse() {
  const { chapterNumber, verseNumber } = useParams();

  const navigate = useNavigate();

  const [verse, setVerse] = useState(null);

  const [previousVerse, setPreviousVerse] = useState(null);

  const [nextVerse, setNextVerse] = useState(null);

  const [chapterVerses, setChapterVerses] = useState([]);

  const [chapters, setChapters] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [liked, setLiked] = useState(false);

  const [chapterProgress, setChapterProgress] = useState(0);

  const [chapterVerseCount, setChapterVerseCount] = useState(0);

  const [copied, setCopied] = useState(false);

  const transliterationLines = useMemo(
    () => formatTransliteration(verse?.transliteration || ""),
    [verse?.transliteration],
  );

  /*
  |--------------------------------------------------------------------------
  | Load verse + navigation data
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    if (!chapterNumber || !verseNumber) {
      setError("श्लोक की जानकारी उपलब्ध नहीं है।");
      setLoading(false);
      return;
    }

    loadVerse();
  }, [chapterNumber, verseNumber]);

  const loadVerse = async () => {
    try {
      setLoading(true);
      setError("");
      setCopied(false);

      const [verseResponse, chapterResponse, chaptersResponse] =
        await Promise.all([
          API.get(`/verses/chapter/${chapterNumber}/verse/${verseNumber}`),

          API.get(`/verses/chapter/${chapterNumber}`),

          API.get("/chapters"),
        ]);

      const verseResult = verseResponse.data;

      const chapterResult = chapterResponse.data;

      const chaptersResult = chaptersResponse.data;

      if (!verseResult?.success) {
        throw new Error(verseResult?.message || "श्लोक उपलब्ध नहीं है।");
      }

      if (!chapterResult?.success) {
        throw new Error(
          chapterResult?.message || "अध्याय के श्लोक उपलब्ध नहीं हैं।",
        );
      }

      /*
      |--------------------------------------------------------------------------
      | Current verse
      |--------------------------------------------------------------------------
      */

      const currentVerse = verseResult.verse;

      if (!currentVerse) {
        throw new Error("श्लोक का डेटा प्राप्त नहीं हुआ।");
      }

      setVerse(currentVerse);

      setPreviousVerse(verseResult.previousVerse || null);

      setNextVerse(verseResult.nextVerse || null);

      /*
      |--------------------------------------------------------------------------
      | Chapter verses
      |--------------------------------------------------------------------------
      */

      const allVerses = Array.isArray(chapterResult.verses)
        ? chapterResult.verses
        : [];

      setChapterVerses(allVerses);

      setChapterVerseCount(verseResult.verseCount || allVerses.length);

      setChapterProgress(verseResult.progress || 0);

      /*
      |--------------------------------------------------------------------------
      | Chapters
      |--------------------------------------------------------------------------
      */

      const chapterList = chaptersResult?.success
        ? chaptersResult.data || chaptersResult.chapters || []
        : [];

      setChapters(Array.isArray(chapterList) ? chapterList : []);

      /*
      |--------------------------------------------------------------------------
      | Save history
      |--------------------------------------------------------------------------
      */

      saveReadingHistory({
        chapterNumber,
        verseNumber,
        sanskrit: currentVerse.sanskrit,
      });

      /*
      |--------------------------------------------------------------------------
      | Favorite
      |--------------------------------------------------------------------------
      */

      const favoriteKey = `gita-favorite-${chapterNumber}-${verseNumber}`;

      setLiked(localStorage.getItem(favoriteKey) === "true");
    } catch (err) {
      console.error("Verse loading error:", err);

      setError(
        err.response?.data?.message || err.message || "श्लोक लोड नहीं हो सका।",
      );
    } finally {
      setLoading(false);
    }
  };

  /*
  |--------------------------------------------------------------------------
  | Favorite
  |--------------------------------------------------------------------------
  */

  const toggleFavorite = () => {
    const favoriteKey = `gita-favorite-${chapterNumber}-${verseNumber}`;

    const newValue = !liked;

    setLiked(newValue);

    if (newValue) {
      localStorage.setItem(favoriteKey, "true");
    } else {
      localStorage.removeItem(favoriteKey);
    }
  };

  /*
  |--------------------------------------------------------------------------
  | Copy
  |--------------------------------------------------------------------------
  */

  const copyVerse = async () => {
    if (!verse) {
      return;
    }

    const text = [
      "भगवद्गीता",
      `अध्याय ${chapterNumber} • श्लोक ${verseNumber}`,
      "",
      verse.sanskrit,
      "",
      "हिंदी अर्थ",
      verse.hindiMeaning,
    ].join("\n");

    try {
      await navigator.clipboard.writeText(text);

      setCopied(true);

      window.setTimeout(() => {
        setCopied(false);
      }, 1800);
    } catch (error) {
      console.error("Copy error:", error);
    }
  };

  /*
  |--------------------------------------------------------------------------
  | Share
  |--------------------------------------------------------------------------
  */

  const shareVerse = async () => {
    if (!verse) {
      return;
    }

    const url = window.location.href;

    try {
      if (navigator.share) {
        await navigator.share({
          title: `भगवद्गीता • अध्याय ${chapterNumber} • श्लोक ${verseNumber}`,

          text: verse.sanskrit,

          url,
        });
      } else {
        await navigator.clipboard.writeText(url);

        alert("लिंक कॉपी हो गया।");
      }
    } catch {
      // Sharing was cancelled.
    }
  };

  /*
  |--------------------------------------------------------------------------
  | Open selected verse
  |--------------------------------------------------------------------------
  */

  const openVerse = (selectedVerseNumber) => {
    const number = Number(selectedVerseNumber);

    if (!Number.isInteger(number) || number < 1) {
      return;
    }

    navigate(`/gita/adhyay/${chapterNumber}/shlok/${number}`);
  };

  /*
  |--------------------------------------------------------------------------
  | Previous verse
  |--------------------------------------------------------------------------
  */

  const goPrevious = () => {
    if (previousVerse) {
      navigate(
        `/gita/adhyay/${chapterNumber}/shlok/${previousVerse.verseNumber}`,
      );

      return;
    }

    /*
     * First verse of current chapter.
     * Open previous chapter's last verse.
     */

    const currentChapter = Number(chapterNumber);

    if (currentChapter > 1) {
      const previousChapter = chapters.find(
        (chapter) => Number(chapter.number) === currentChapter - 1,
      );

      if (previousChapter) {
        navigate(
          `/gita/adhyay/${currentChapter - 1}/shlok/${previousChapter.verseCount}`,
        );
      }
    }
  };

  /*
  |--------------------------------------------------------------------------
  | Next verse
  |--------------------------------------------------------------------------
  */

  const goNext = () => {
    if (nextVerse) {
      navigate(`/gita/adhyay/${chapterNumber}/shlok/${nextVerse.verseNumber}`);

      return;
    }

    /*
     * Last verse of current chapter.
     * Open next chapter's first verse.
     */

    const currentChapter = Number(chapterNumber);

    if (currentChapter < 18) {
      navigate(`/gita/adhyay/${currentChapter + 1}/shlok/1`);
    }
  };

  /*
  |--------------------------------------------------------------------------
  | Chapter navigation
  |--------------------------------------------------------------------------
  */

  const goPreviousChapter = () => {
    const currentChapter = Number(chapterNumber);

    if (currentChapter <= 1) {
      return;
    }

    const previousChapter = chapters.find(
      (chapter) => Number(chapter.number) === currentChapter - 1,
    );

    if (previousChapter) {
      navigate(
        `/gita/adhyay/${currentChapter - 1}/shlok/${previousChapter.verseCount}`,
      );
    }
  };

  const goNextChapter = () => {
    const currentChapter = Number(chapterNumber);

    if (currentChapter >= 18) {
      return;
    }

    navigate(`/gita/adhyay/${currentChapter + 1}/shlok/1`);
  };

  /*
  |--------------------------------------------------------------------------
  | Loading
  |--------------------------------------------------------------------------
  */

  if (loading) {
    return (
      <>
        <SEO
          title={`भगवद्गीता अध्याय ${chapterNumber} श्लोक ${verseNumber} | श्रीमद्भगवद्गीता`}
          description={
            verse.hindiMeaning
              ? `भगवद्गीता अध्याय ${chapterNumber}, श्लोक ${verseNumber} का संस्कृत पाठ, लिप्यंतरण और हिंदी अर्थ पढ़ें। ${verse.hindiMeaning}`
              : `भगवद्गीता अध्याय ${chapterNumber}, श्लोक ${verseNumber} का संस्कृत पाठ, लिप्यंतरण और हिंदी अर्थ पढ़ें।`
          }
          canonical={`/gita/adhyay/${chapterNumber}/shlok/${verseNumber}`}
          type="article"
        />
        <main className="min-h-screen bg-[#faf7f0]">
          <Navbar />

          <section className="flex min-h-[70vh] items-center justify-center px-5 pt-24">
            <div className="text-center">
              <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-amber-200 border-t-amber-600" />

              <p className="mt-5 text-gray-500">श्लोक लोड हो रहा है...</p>
            </div>
          </section>
        </main>
      </>
    );
  }

  /*
  |--------------------------------------------------------------------------
  | Error
  |--------------------------------------------------------------------------
  */

  if (error || !verse) {
    return (
      <main className="min-h-screen bg-[#faf7f0]">
        <Navbar />

        <section className="flex min-h-[70vh] items-center justify-center px-5 pt-24">
          <div className="max-w-lg text-center">
            <BookOpen size={52} className="mx-auto text-amber-500" />

            <h1 className="mt-6 text-2xl font-bold text-gray-900">
              श्लोक उपलब्ध नहीं है
            </h1>

            <p className="mt-3 leading-7 text-gray-500">{error}</p>

            <Link
              to={`/gita/adhyay/${chapterNumber}`}
              className="mt-7 inline-flex items-center gap-2 rounded-xl bg-amber-600 px-5 py-3 font-semibold text-white transition hover:bg-amber-700"
            >
              <ArrowLeft size={18} />
              अध्याय पर वापस जाएँ
            </Link>
          </div>
        </section>
      </main>
    );
  }

  /*
  |--------------------------------------------------------------------------
  | Is this first / last chapter?
  |--------------------------------------------------------------------------
  */

  const isFirstVerse = !previousVerse;

  const isLastVerse = !nextVerse;

  const isFirstChapter = Number(chapterNumber) === 1;

  const isLastChapter = Number(chapterNumber) === 18;

  return (
    <main className="min-h-screen bg-[#faf7f0]">
      <Navbar />

      {/* HEADER */}
      <section className="relative overflow-hidden bg-[#111827] px-5 pb-14 pt-32">
        <div className="absolute -right-32 -top-32 h-80 w-80 rounded-full bg-amber-500/10 blur-3xl" />

        <div className="absolute -bottom-40 -left-20 h-80 w-80 rounded-full bg-orange-500/10 blur-3xl" />

        <div className="relative mx-auto max-w-5xl">
          <Link
            to={`/gita/adhyay/${chapterNumber}`}
            className="inline-flex items-center gap-2 text-sm font-medium text-white/60 transition hover:text-white"
          >
            <ArrowLeft size={17} />
            अध्याय पर वापस जाएँ
          </Link>

          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            className="mt-8"
          >
            <p className="text-sm font-semibold tracking-[0.2em] text-amber-300">
              श्रीमद्भगवद्गीता
            </p>

            <h1 className="mt-4 text-3xl font-bold text-white sm:text-5xl">
              अध्याय {chapterNumber}
            </h1>

            <p className="mt-3 text-lg text-white/60">श्लोक {verseNumber}</p>

            {/* Progress */}
            <div className="mt-7 max-w-xl">
              <div className="mb-2 flex items-center justify-between text-sm text-white/50">
                <span>अध्याय की प्रगति</span>

                <span>
                  {verseNumber} / {chapterVerseCount}
                </span>
              </div>

              <div className="h-2 overflow-hidden rounded-full bg-white/10">
                <motion.div
                  initial={{
                    width: 0,
                  }}
                  animate={{
                    width: `${chapterProgress}%`,
                  }}
                  transition={{
                    duration: 0.6,
                  }}
                  className="h-full rounded-full bg-amber-400"
                />
              </div>

              <p className="mt-2 text-xs text-white/40">
                {chapterProgress}% पूरा
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* READER */}
      <section className="mx-auto max-w-5xl px-5 py-12">
        <motion.article
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.5,
          }}
          className="overflow-hidden rounded-[2rem] border border-amber-900/10 bg-white shadow-xl"
        >
          {/* IMAGE PLACEHOLDER */}
          <div className="relative flex aspect-[16/7] items-center justify-center overflow-hidden bg-gradient-to-br from-amber-100 via-orange-50 to-yellow-100">
            <div className="absolute h-64 w-64 rounded-full border border-amber-400/20" />

            <div className="absolute h-48 w-48 rounded-full border border-amber-400/20" />

            <div className="absolute h-32 w-32 rounded-full border border-amber-400/20" />

            <div className="relative font-serif text-7xl text-amber-500/40">
              ॐ
            </div>
          </div>

          <div className="p-6 sm:p-10">
            {/* TOP BAR */}
            <div className="flex flex-wrap items-center justify-between gap-4">
              <span className="rounded-full bg-amber-100 px-4 py-2 text-sm font-semibold text-amber-700">
                अध्याय {chapterNumber} • श्लोक {verseNumber}
              </span>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={copyVerse}
                  className="rounded-xl border border-gray-200 p-3 text-gray-500 transition hover:bg-gray-50 hover:text-amber-600"
                  title="श्लोक कॉपी करें"
                >
                  <Copy size={18} />
                </button>

                <button
                  type="button"
                  onClick={shareVerse}
                  className="rounded-xl border border-gray-200 p-3 text-gray-500 transition hover:bg-gray-50 hover:text-amber-600"
                  title="श्लोक साझा करें"
                >
                  <Share2 size={18} />
                </button>

                <button
                  type="button"
                  onClick={toggleFavorite}
                  className={`rounded-xl border p-3 transition ${
                    liked
                      ? "border-red-200 bg-red-50 text-red-500"
                      : "border-gray-200 text-gray-500 hover:bg-gray-50 hover:text-red-500"
                  }`}
                  title="पसंदीदा में जोड़ें"
                >
                  <Heart size={18} fill={liked ? "currentColor" : "none"} />
                </button>
              </div>
            </div>

            {copied && (
              <div className="mt-4 rounded-xl bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
                श्लोक कॉपी हो गया।
              </div>
            )}

            {/* SHLOKA */}
            <div className="mt-10">
              <div className="mb-4 flex items-center gap-3">
                <div className="h-px w-8 bg-amber-400" />

                <p className="text-xs font-bold tracking-[0.2em] text-amber-600">
                  संस्कृत श्लोक
                </p>

                <div className="h-px flex-1 bg-amber-100" />
              </div>

              <div className="rounded-3xl bg-[#fffaf0] px-5 py-10 sm:px-10 sm:py-12">
                <p className="text-center font-serif text-2xl leading-[2.1] text-gray-900 sm:text-3xl">
                  {verse.sanskrit}
                </p>
              </div>
            </div>

            {/* TRANSLITERATION */}
            {transliterationLines.length > 0 && (
              <div className="mt-10">
                <div className="mb-4 flex items-center gap-3">
                  <div className="h-px w-8 bg-amber-400" />

                  <p className="text-xs font-bold tracking-[0.2em] text-amber-600">
                    संस्कृत का लिप्यंतरण
                  </p>

                  <div className="h-px flex-1 bg-amber-100" />
                </div>

                <div className="relative overflow-hidden rounded-3xl border border-amber-900/10 bg-gradient-to-br from-[#fffaf0] via-white to-amber-50/70 px-5 py-8 shadow-sm sm:px-10 sm:py-10">
                  <div className="absolute right-5 top-1 font-serif text-6xl leading-none text-amber-500/10">
                    ॐ
                  </div>

                  <div className="relative space-y-2.5 text-center">
                    {transliterationLines.map((line, index) => (
                      <p
                        key={`${line}-${index}`}
                        className="font-sans text-base font-medium leading-8 tracking-wide text-gray-700 sm:text-lg sm:leading-9"
                      >
                        {line}
                      </p>
                    ))}
                  </div>
                </div>

                <p className="mt-3 text-center text-xs text-gray-400">
                  संस्कृत श्लोक का रोमन लिपि में उच्चारण रूप
                </p>
              </div>
            )}

            {/* AUDIO PLACEHOLDER */}
            <div className="mt-10 rounded-3xl border border-amber-900/10 bg-amber-50 p-5 sm:p-6">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-600 text-white">
                  <Volume2 size={21} />
                </div>

                <div>
                  <p className="font-semibold text-gray-900">संस्कृत ऑडियो</p>

                  <p className="text-sm text-gray-500">
                    ऑडियो बाद में जोड़ा जाएगा।
                  </p>
                </div>
              </div>
            </div>

            {/* HINDI MEANING */}
            <div className="mt-10">
              <div className="mb-4 flex items-center gap-3">
                <div className="h-px w-8 bg-amber-400" />

                <p className="text-xs font-bold tracking-[0.2em] text-amber-600">
                  हिंदी अर्थ
                </p>

                <div className="h-px flex-1 bg-amber-100" />
              </div>

              <div className="rounded-3xl border border-gray-100 bg-gray-50 p-6 sm:p-8">
                <p className="text-lg leading-9 text-gray-700">
                  {verse.hindiMeaning}
                </p>
              </div>
            </div>
          </div>
        </motion.article>

        {/* SHLOKA SELECTOR */}
        <div className="mt-8 rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold text-amber-600">
                श्लोक चुनें
              </p>

              <p className="mt-1 text-sm text-gray-500">
                सीधे किसी भी श्लोक पर जाएँ।
              </p>
            </div>

            <select
              value={verseNumber}
              onChange={(event) => openVerse(event.target.value)}
              className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 font-medium text-gray-700 outline-none transition focus:border-amber-400 sm:w-72"
            >
              {chapterVerses.map((item) => (
                <option key={item.verseNumber} value={item.verseNumber}>
                  श्लोक {item.verseNumber}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* PREVIOUS / NEXT SHLOKA */}
        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <button
            type="button"
            onClick={goPrevious}
            disabled={isFirstVerse && isFirstChapter}
            className="group rounded-2xl border border-gray-200 bg-white p-5 text-left transition hover:border-amber-300 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-40"
          >
            <div className="flex items-center gap-3 text-gray-400">
              <ArrowLeft
                size={18}
                className="transition group-hover:-translate-x-1"
              />

              <span className="text-sm">पिछला</span>
            </div>

            <p className="mt-2 font-semibold text-gray-900">
              {previousVerse
                ? `श्लोक ${previousVerse.verseNumber}`
                : "पिछला अध्याय"}
            </p>
          </button>

          <button
            type="button"
            onClick={goNext}
            disabled={isLastVerse && isLastChapter}
            className="group rounded-2xl border border-gray-200 bg-white p-5 text-right transition hover:border-amber-300 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-40"
          >
            <div className="flex items-center justify-end gap-3 text-gray-400">
              <span className="text-sm">अगला</span>

              <ArrowRight
                size={18}
                className="transition group-hover:translate-x-1"
              />
            </div>

            <p className="mt-2 font-semibold text-gray-900">
              {nextVerse ? `श्लोक ${nextVerse.verseNumber}` : "अगला अध्याय"}
            </p>
          </button>
        </div>

        {/* CHAPTER NAVIGATION */}
        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <button
            type="button"
            onClick={goPreviousChapter}
            disabled={isFirstChapter}
            className="rounded-2xl border border-gray-200 bg-white p-5 text-left transition hover:border-amber-300 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-40"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-gray-400">
              पिछला अध्याय
            </p>

            <p className="mt-2 font-semibold text-gray-900">
              {Number(chapterNumber) > 1
                ? `अध्याय ${Number(chapterNumber) - 1}`
                : "पहला अध्याय"}
            </p>
          </button>

          <button
            type="button"
            onClick={goNextChapter}
            disabled={isLastChapter}
            className="rounded-2xl border border-gray-200 bg-white p-5 text-right transition hover:border-amber-300 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-40"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-gray-400">
              अगला अध्याय
            </p>

            <p className="mt-2 font-semibold text-gray-900">
              {Number(chapterNumber) < 18
                ? `अध्याय ${Number(chapterNumber) + 1}`
                : "अंतिम अध्याय"}
            </p>
          </button>
        </div>
      </section>
      <Footer />
    </main>
  );
}
