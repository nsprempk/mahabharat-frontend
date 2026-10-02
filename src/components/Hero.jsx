import { motion } from "framer-motion";
import { ArrowDown, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";

import heroImage from "../assets/krishna-hero.png";
import AudioPlayer from "./AudioPlayer";

export default function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-black">
      {/* Background */}
      <motion.div
        initial={{ scale: 1.08 }}
        animate={{ scale: 1 }}
        transition={{
          duration: 2.5,
          ease: "easeOut",
        }}
        className="absolute inset-0"
      >
        <img
          src={heroImage}
          alt="श्री कृष्ण और महाभारत"
          className="h-full w-full object-cover"
        />
      </motion.div>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/55" />

      {/* Cinematic gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/55 to-black/20" />

      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40" />

      {/* Golden glow */}
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.15, 0.28, 0.15],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute left-[55%] top-[30%] h-80 w-80 rounded-full bg-amber-400 blur-[120px]"
      />

      {/* Content */}
      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl items-center px-5 pb-20 pt-28 lg:px-8">
        <div className="max-w-3xl">
          {/* Small heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="mb-6 flex items-center gap-3"
          >
            <span className="h-px w-12 bg-amber-400" />

            <span className="text-xs font-medium uppercase tracking-[0.35em] text-amber-300">
              श्रीमद्भगवद्गीता
            </span>
          </motion.div>

          {/* Main Sanskrit */}
          <motion.h1
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 1 }}
            className="font-serif text-4xl leading-[1.5] text-white sm:text-5xl lg:text-6xl"
          >
            यदा यदा हि धर्मस्य
            <br />
            <span className="text-amber-300">ग्लानिर्भवति भारत ।</span>
          </motion.h1>

          {/* Full shloka */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="mt-6 max-w-2xl text-base leading-8 text-white/70 sm:text-lg"
          >
            अभ्युत्थानमधर्मस्य तदात्मानं सृजाम्यहम् ।
            <br />
            परित्राणाय साधूनां विनाशाय च दुष्कृताम् ॥
          </motion.p>

          {/* Chapter */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="mt-5 text-sm text-amber-200/80"
          >
            भगवद्गीता • अध्याय 4 • श्लोक 7–8
          </motion.div>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4 }}
            className="mt-9 flex flex-wrap gap-4"
          >
            <Link
              to="/gita"
              className="group flex items-center gap-3 rounded-full bg-amber-400 px-6 py-3.5 font-semibold text-black transition hover:bg-amber-300"
            >
              <BookOpen size={19} />
              पढ़ना शुरू करें
              <span className="transition group-hover:translate-x-1">→</span>
            </Link>

            <AudioPlayer />
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{
          duration: 2,
          repeat: Infinity,
        }}
        className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2 text-white/60"
      >
        <ArrowDown size={22} />
      </motion.div>
    </section>
  );
}
