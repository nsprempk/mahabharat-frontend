import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Chapters from "./pages/Chapters";
import Chapter from "./pages/Chapter";
import Verse from "./pages/Verse";
import Search from "./pages/Search";
import Favorites from "./pages/Favorites";
import About from "./pages/About";

import PrivacyPolicy from "./pages/PrivacyPolicy";
import CookiePolicy from "./pages/CookiePolicy";
import Terms from "./pages/Terms";
import Disclaimer from "./pages/Disclaimer";
import AdvertisingPolicy from "./pages/AdvertisingPolicy";
import Contact from "./pages/Contact";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Home */}
        <Route path="/" element={<Home />} />

        {/* All 18 Chapters */}
        <Route path="/gita" element={<Chapters />} />

        {/* Single Chapter */}
        <Route path="/gita/adhyay/:chapterNumber" element={<Chapter />} />

        {/* Single Shloka */}
        <Route
          path="/gita/adhyay/:chapterNumber/shlok/:verseNumber"
          element={<Verse />}
        />

        {/* Search */}
        <Route path="/search" element={<Search />} />

        {/* Favorites */}
        <Route path="/favorites" element={<Favorites />} />

        {/* About */}
        <Route path="/about" element={<About />} />

        <Route path="/privacy-policy" element={<PrivacyPolicy />} />

        <Route path="/cookie-policy" element={<CookiePolicy />} />

        <Route path="/terms" element={<Terms />} />

        <Route path="/disclaimer" element={<Disclaimer />} />

        <Route path="/advertising-policy" element={<AdvertisingPolicy />} />

        <Route path="/contact" element={<Contact />} />

        {/* Fallback */}
        <Route
          path="*"
          element={
            <div className="flex min-h-screen items-center justify-center bg-[#faf7f0]">
              <div className="text-center">
                <h1 className="text-4xl font-bold text-gray-900">404</h1>

                <p className="mt-3 text-gray-500">पेज नहीं मिला।</p>
              </div>
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
