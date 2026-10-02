import { Link } from "react-router-dom";
import { Menu, X, BookOpen, Search } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="absolute top-0 left-0 right-0 z-50">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <Link to="/" className="flex items-center gap-3 text-white">
            <div className="flex h-11 w-11 items-center justify-center rounded-full border border-amber-300/40 bg-amber-500/10 backdrop-blur">
              <span className="text-xl text-amber-300">ॐ</span>
            </div>

            <div>
              <div className="text-lg font-bold tracking-wide">महाभारत</div>

              <div className="text-[10px] tracking-[0.25em] text-amber-200/80">
                ज्ञान • धर्म • कर्म
              </div>
            </div>
          </Link>

          <div className="hidden items-center gap-8 md:flex">
            <Link
              to="/"
              className="text-sm text-white/80 transition hover:text-amber-300"
            >
              होम
            </Link>

            <Link
              to="/gita"
              className="text-sm text-white/80 transition hover:text-amber-300"
            >
              भगवद्गीता
            </Link>

            <Link
              to="/search"
              className="flex items-center gap-2 text-sm text-white/80 transition hover:text-amber-300"
            >
              <Search size={17} />
              खोजें
            </Link>

            <Link
              to="/favorites"
              className="text-sm text-white/80 transition hover:text-amber-300"
            >
              पसंदीदा
            </Link>

            <Link
              to="/gita"
              className="rounded-full border border-amber-300/40 bg-amber-400/10 px-5 py-2.5 text-sm font-medium text-amber-200 backdrop-blur transition hover:bg-amber-400 hover:text-black"
            >
              पढ़ना शुरू करें
            </Link>
          </div>

          <button
            onClick={() => setOpen(!open)}
            className="rounded-lg border border-white/10 bg-white/5 p-2 text-white md:hidden"
          >
            {open ? <X size={23} /> : <Menu size={23} />}
          </button>
        </div>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="rounded-2xl border border-white/10 bg-black/80 p-5 backdrop-blur-xl md:hidden"
            >
              <div className="flex flex-col gap-4">
                <Link
                  onClick={() => setOpen(false)}
                  to="/"
                  className="text-white"
                >
                  होम
                </Link>

                <Link
                  onClick={() => setOpen(false)}
                  to="/gita"
                  className="text-white"
                >
                  भगवद्गीता
                </Link>

                <Link
                  onClick={() => setOpen(false)}
                  to="/search"
                  className="text-white"
                >
                  खोजें
                </Link>

                <Link
                  onClick={() => setOpen(false)}
                  to="/favorites"
                  className="text-white"
                >
                  पसंदीदा
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}
