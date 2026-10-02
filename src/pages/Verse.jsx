import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Copy,
  Heart,
  Share2,
} from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SEO from "../components/SEO";
import API from "../services/api";

const HISTORY_KEY = "gita-reading-history";

function saveReadingHistory({ chapterNumber, verseNumber, sanskrit }) {
  try {
    const history = JSON.parse(localStorage.getItem(HISTORY_KEY) || "[]");

    const entry = {
      chapterNumber: Number(chapterNumber),
      verseNumber: Number(verseNumber),
      sanskrit: sanskrit || "",
      updatedAt: new Date().toISOString(),
    };

    const filtered = Array.isArray(history)
      ? history.filter(
          (item) =>
            !(
              Number(item.chapterNumber) === Number(chapterNumber) &&
              Number(item.verseNumber) === Number(verseNumber)
            ),
        )
      : [];

    filtered.unshift(entry);

    localStorage.setItem(HISTORY_KEY, JSON.stringify(filtered.slice(0, 20)));
  } catch (error) {
    console.warn("Reading history error:", error);
  }
}

function formatTransliteration(text = "") {
  if (!text.trim()) {
    return [];
  }

  const words = text.trim().split(/\s+/);

  const lines = [];
  let line = [];
  let length = 0;

  for (const word of words) {
    const extra = line.length > 0 ? word.length + 1 : word.length;

    if (line.length >= 4 || length + extra > 42) {
      lines.push(line.join(" "));
      line = [word];
      length = word.length;
    } else {
      line.push(word);
      length += extra;
    }
  }

  if (line.length > 0) {
    lines.push(line.join(" "));
  }

  return lines;
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

  const [copied, setCopied] = useState(false);

  const [chapterVerseCount, setChapterVerseCount] = useState(0);

  const [chapterProgress, setChapterProgress] = useState(0);

  /*
  |--------------------------------------------------------------------------
  | Load verse
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    let active = true;

    const loadVerse = async () => {
      try {
        setLoading(true);
        setError("");

        const [verseResponse, versesResponse, chaptersResponse] =
          await Promise.all([
            API.get(`/verses/chapter/${chapterNumber}/verse/${verseNumber}`),

            API.get(`/verses/chapter/${chapterNumber}`),

            API.get("/chapters"),
          ]);

        if (!active) {
          return;
        }

        const verseData = verseResponse.data;

        const versesData = versesResponse.data;

        const chaptersData = chaptersResponse.data;

        /*
        |--------------------------------------------------------------------------
        | Validate single verse
        |--------------------------------------------------------------------------
        */

        if (!verseData?.success) {
          throw new Error(verseData?.message || "श्लोक उपलब्ध नहीं है।");
        }

        if (!verseData?.verse) {
          throw new Error("श्लोक का डेटा उपलब्ध नहीं है।");
        }

        /*
        |--------------------------------------------------------------------------
        | Current verse
        |--------------------------------------------------------------------------
        */

        setVerse(verseData.verse);

        /*
        |--------------------------------------------------------------------------
        | Previous / next
        |--------------------------------------------------------------------------
        */

        setPreviousVerse(verseData.previousVerse || null);

        setNextVerse(verseData.nextVerse || null);

        /*
        |--------------------------------------------------------------------------
        | Chapter verses
        |--------------------------------------------------------------------------
        */

        const verseList = Array.isArray(versesData?.verses)
          ? versesData.verses
          : Array.isArray(versesData?.data)
            ? versesData.data
            : [];

        setChapterVerses(verseList);

        const count = Number(verseData.verseCount) || verseList.length || 0;

        setChapterVerseCount(count);

        setChapterProgress(
          Number(verseData.progress) ||
            (count > 0 ? Math.round((Number(verseNumber) / count) * 100) : 0),
        );

        /*
        |--------------------------------------------------------------------------
        | Chapters
        |--------------------------------------------------------------------------
        */

        const chapterList = Array.isArray(chaptersData?.data)
          ? chaptersData.data
          : Array.isArray(chaptersData?.chapters)
            ? chaptersData.chapters
            : [];

        setChapters(chapterList);

        /*
        |--------------------------------------------------------------------------
        | Reading history
        |--------------------------------------------------------------------------
        */

        saveReadingHistory({
          chapterNumber,
          verseNumber,
          sanskrit: verseData.verse.sanskrit,
        });

        /*
        |--------------------------------------------------------------------------
        | Favorite
        |--------------------------------------------------------------------------
        */

        const favoriteKey = `gita-favorite-${chapterNumber}-${verseNumber}`;

        setLiked(localStorage.getItem(favoriteKey) === "true");
      } catch (err) {
        if (!active) {
          return;
        }

        console.error("Verse loading error:", err);

        setError(
          err.response?.data?.message ||
            err.message ||
            "श्लोक लोड नहीं हो सका।",
        );
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    if (chapterNumber && verseNumber) {
      loadVerse();
    } else {
      setError("श्लोक का URL सही नहीं है।");

      setLoading(false);
    }

    return () => {
      active = false;
    };
  }, [chapterNumber, verseNumber]);

  /*
  |--------------------------------------------------------------------------
  | Transliteration
  |--------------------------------------------------------------------------
  */

  const transliterationLines = useMemo(
    () => formatTransliteration(verse?.transliteration || ""),
    [verse?.transliteration],
  );

  /*
  |--------------------------------------------------------------------------
  | Favorite
  |--------------------------------------------------------------------------
  */

  const toggleFavorite = () => {
    const key = `gita-favorite-${chapterNumber}-${verseNumber}`;

    const newValue = !liked;

    setLiked(newValue);

    if (newValue) {
      localStorage.setItem(key, "true");
    } else {
      localStorage.removeItem(key);
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
      "श्रीमद्भगवद्गीता",
      `अध्याय ${chapterNumber} • श्लोक ${verseNumber}`,
      "",
      verse.sanskrit || "",
      "",
      "हिंदी अर्थ",
      verse.hindiMeaning || "",
    ].join("\n");

    try {
      await navigator.clipboard.writeText(text);

      setCopied(true);

      window.setTimeout(() => {
        setCopied(false);
      }, 1800);
    } catch (err) {
      console.error("Copy failed:", err);
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

    const text = [
      "श्रीमद्भगवद्गीता",
      `अध्याय ${chapterNumber} • श्लोक ${verseNumber}`,
      "",
      verse.sanskrit || "",
    ].join("\n");

    try {
      if (navigator.share) {
        await navigator.share({
          title: `भगवद्गीता • अध्याय ${chapterNumber} • श्लोक ${verseNumber}`,
          text,
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);

        alert("लिंक कॉपी हो गया।");
      }
    } catch (err) {
      // User may have cancelled sharing.
      console.log("Share cancelled.");
    }
  };

  /*
  |--------------------------------------------------------------------------
  | Open verse
  |--------------------------------------------------------------------------
  */

  const openVerse = (number) => {
    const selected = Number(number);

    if (!Number.isInteger(selected) || selected < 1) {
      return;
    }

    navigate(`/gita/adhyay/${chapterNumber}/shlok/${selected}`);
  };

  /*
  |--------------------------------------------------------------------------
  | Previous
  |--------------------------------------------------------------------------
  */

  const goPrevious = () => {
    if (previousVerse) {
      navigate(
        `/gita/adhyay/${chapterNumber}/shlok/${previousVerse.verseNumber}`,
      );

      return;
    }

    const current = Number(chapterNumber);

    if (current <= 1) {
      return;
    }

    const previousChapter = chapters.find(
      (item) => Number(item.number) === current - 1,
    );

    const previousCount = Number(previousChapter?.verseCount) || 1;

    navigate(`/gita/adhyay/${current - 1}/shlok/${previousCount}`);
  };

  /*
  |--------------------------------------------------------------------------
  | Next
  |--------------------------------------------------------------------------
  */

  const goNext = () => {
    if (nextVerse) {
      navigate(`/gita/adhyay/${chapterNumber}/shlok/${nextVerse.verseNumber}`);

      return;
    }

    const current = Number(chapterNumber);

    if (current >= 18) {
      return;
    }

    navigate(`/gita/adhyay/${current + 1}/shlok/1`);
  };

  /*
  |--------------------------------------------------------------------------
  | Previous chapter
  |--------------------------------------------------------------------------
  */

  const goPreviousChapter = () => {
    const current = Number(chapterNumber);

    if (current <= 1) {
      return;
    }

    const previousChapter = chapters.find(
      (item) => Number(item.number) === current - 1,
    );

    if (!previousChapter) {
      return;
    }

    const count = Number(previousChapter.verseCount) || 1;

    navigate(`/gita/adhyay/${current - 1}/shlok/${count}`);
  };

  /*
  |--------------------------------------------------------------------------
  | Next chapter
  |--------------------------------------------------------------------------
  */

  const goNextChapter = () => {
    const current = Number(chapterNumber);

    if (current >= 18) {
      return;
    }

    navigate(`/gita/adhyay/${current + 1}/shlok/1`);
  };

  /*
  |--------------------------------------------------------------------------
  | Loading
  |--------------------------------------------------------------------------
  */

  if (loading) {
    return (
      <main className="min-h-screen bg-[#faf7f0]">
        <Navbar />

        <section className="flex min-h-[70vh] items-center justify-center px-5 pt-24">
          <div className="text-center">
            <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-amber-200 border-t-amber-600" />

            <p className="mt-5 text-gray-500">श्लोक लोड हो रहा है...</p>
          </div>
        </section>

        <Footer />
      </main>
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

            <p className="mt-3 leading-7 text-gray-500">
              {error || "श्लोक का डेटा उपलब्ध नहीं है।"}
            </p>

            <Link
              to={`/gita/adhyay/${chapterNumber}`}
              className="mt-7 inline-flex items-center gap-2 rounded-xl bg-amber-600 px-5 py-3 font-semibold text-white transition hover:bg-amber-700"
            >
              <ArrowLeft size={18} />
              अध्याय पर वापस जाएँ
            </Link>
          </div>
        </section>

        <Footer />
      </main>
    );
  }

  const currentChapter = Number(chapterNumber);

  const currentVerseNumber = Number(verseNumber);

  const isFirstVerse = !previousVerse;

  const isLastVerse = !nextVerse;

  const isFirstChapter = currentChapter === 1;

  const isLastChapter = currentChapter === 18;

  return (
    <main className="min-h-screen bg-[#faf7f0]">
      <SEO
        title={`भगवद्गीता अध्याय ${currentChapter} श्लोक ${currentVerseNumber} | श्रीमद्भगवद्गीता`}
        description={
          verse.hindiMeaning
            ? `भगवद्गीता अध्याय ${currentChapter}, श्लोक ${currentVerseNumber} का संस्कृत पाठ, लिप्यंतरण और हिंदी अर्थ पढ़ें। ${verse.hindiMeaning}`
            : `भगवद्गीता अध्याय ${currentChapter}, श्लोक ${currentVerseNumber} का संस्कृत पाठ, लिप्यंतरण और हिंदी अर्थ पढ़ें।`
        }
        canonical={`/gita/adhyay/${currentChapter}/shlok/${currentVerseNumber}`}
        type="article"
      />

      <Navbar />

      {/* HEADER */}
      <section className="relative overflow-hidden bg-[#111827] px-5 pb-14 pt-32">
        <div className="absolute -right-40 -top-40 h-96 w-96 rounded-full bg-amber-500/10 blur-3xl" />

        <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-orange-500/10 blur-3xl" />

        <div className="relative mx-auto max-w-5xl">
          <Link
            to={`/gita/adhyay/${currentChapter}`}
            className="inline-flex items-center gap-2 text-sm text-white/60 transition hover:text-white"
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
              अध्याय {currentChapter}
            </h1>

            <p className="mt-3 text-lg text-white/60">
              श्लोक {currentVerseNumber}
            </p>

            {/* PROGRESS */}
            <div className="mt-7 max-w-xl">
              <div className="mb-2 flex items-center justify-between text-sm text-white/50">
                <span>अध्याय की प्रगति</span>

                <span>
                  {currentVerseNumber} / {chapterVerseCount}
                </span>
              </div>

              <div className="h-2 overflow-hidden rounded-full bg-white/10">
                <motion.div
                  initial={{
                    width: 0,
                  }}
                  animate={{
                    width: `${Math.max(0, Math.min(100, chapterProgress))}%`,
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

      {/* CONTENT */}
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
          <div className="p-6 sm:p-10">
            {/* TOP ACTIONS */}
            <div className="flex flex-wrap items-center justify-between gap-4">
              <span className="rounded-full bg-amber-100 px-4 py-2 text-sm font-semibold text-amber-700">
                अध्याय {currentChapter} • श्लोक {currentVerseNumber}
              </span>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={copyVerse}
                  title="श्लोक कॉपी करें"
                  className="rounded-xl border border-gray-200 p-3 text-gray-500 transition hover:bg-gray-50 hover:text-amber-600"
                >
                  <Copy size={18} />
                </button>

                <button
                  type="button"
                  onClick={shareVerse}
                  title="श्लोक साझा करें"
                  className="rounded-xl border border-gray-200 p-3 text-gray-500 transition hover:bg-gray-50 hover:text-amber-600"
                >
                  <Share2 size={18} />
                </button>

                <button
                  type="button"
                  onClick={toggleFavorite}
                  title="पसंदीदा"
                  className={`rounded-xl border p-3 transition ${
                    liked
                      ? "border-red-200 bg-red-50 text-red-500"
                      : "border-gray-200 text-gray-500 hover:bg-gray-50 hover:text-red-500"
                  }`}
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

            {/* SANSKRIT */}
            <div className="mt-10">
              <div className="mb-4 flex items-center gap-3">
                <div className="h-px w-8 bg-amber-400" />

                <p className="text-xs font-bold tracking-[0.2em] text-amber-600">
                  संस्कृत श्लोक
                </p>

                <div className="h-px flex-1 bg-amber-100" />
              </div>

              <div className="rounded-3xl bg-[#fffaf0] px-5 py-10 sm:px-10 sm:py-12">
                <p className="whitespace-pre-line text-center font-serif text-2xl leading-[2.1] text-gray-900 sm:text-3xl">
                  {verse.sanskrit || "संस्कृत पाठ उपलब्ध नहीं है।"}
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

                <div className="rounded-3xl border border-amber-900/10 bg-gradient-to-br from-[#fffaf0] via-white to-amber-50/70 px-5 py-8 shadow-sm sm:px-10 sm:py-10">
                  <div className="space-y-2 text-center">
                    {transliterationLines.map((line, index) => (
                      <p
                        key={`${line}-${index}`}
                        className="text-base font-medium leading-8 tracking-wide text-gray-700 sm:text-lg"
                      >
                        {line}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            )}

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
                  {verse.hindiMeaning ||
                    "इस श्लोक का हिंदी अर्थ उपलब्ध नहीं है।"}
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
              value={currentVerseNumber}
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

        {/* PREVIOUS / NEXT */}
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
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
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
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
              {currentChapter > 1
                ? `अध्याय ${currentChapter - 1}`
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
              {currentChapter < 18
                ? `अध्याय ${currentChapter + 1}`
                : "अंतिम अध्याय"}
            </p>
          </button>
        </div>
      </section>

      <Footer />
    </main>
  );
}
