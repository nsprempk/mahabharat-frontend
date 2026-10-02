import { ArrowLeft, Mail, MessageCircle, Send } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SEO from "../components/SEO";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      <SEO
        title="संपर्क करें | श्रीमद्भगवद्गीता"
        description="श्रीमद्भगवद्गीता वेबसाइट से संपर्क करें। सुझाव, सामग्री, तकनीकी समस्या और गोपनीयता संबंधी प्रश्नों के लिए संपर्क जानकारी देखें।"
        canonical="/contact"
      />
      <main className="min-h-screen bg-[#faf7f0]">
        <Navbar />

        <section className="bg-[#111827] px-5 pb-20 pt-32">
          <div className="mx-auto max-w-5xl">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-white"
            >
              <ArrowLeft size={17} />
              मुख्य पृष्ठ
            </Link>

            <div className="mt-10 flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-400 text-black">
                <MessageCircle size={26} />
              </div>

              <div>
                <p className="text-sm text-amber-300">Contact</p>

                <h1 className="text-3xl font-bold text-white sm:text-5xl">
                  Contact Us
                </h1>
              </div>
            </div>

            <p className="mt-5 max-w-2xl leading-8 text-white/60">
              सुझाव, सामग्री संबंधी प्रश्न, तकनीकी समस्या या गोपनीयता से संबंधित
              अनुरोध के लिए हमसे संपर्क करें।
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-5xl px-5 py-14">
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
            <div className="rounded-3xl bg-[#111827] p-7 text-white sm:p-9">
              <Mail size={28} className="text-amber-300" />

              <h2 className="mt-6 text-2xl font-bold">संपर्क जानकारी</h2>

              <p className="mt-4 leading-8 text-white/60">
                नीचे दिए गए पते को अपने वास्तविक सहायता या संपर्क ईमेल से बदलें।
              </p>

              <a
                href="mailto:YOUR_EMAIL@example.com"
                className="mt-7 inline-flex items-center gap-3 break-all text-amber-300 hover:text-amber-200"
              >
                <Mail size={18} />
                contact@bhagavadgita.site
              </a>

              <div className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-5">
                <p className="text-sm leading-7 text-white/50">
                  गोपनीयता, विज्ञापन, सामग्री या वेबसाइट से जुड़ी समस्या के लिए
                  अपना प्रश्न स्पष्ट रूप से लिखें।
                </p>
              </div>
            </div>

            <div className="rounded-3xl border border-gray-100 bg-white p-7 shadow-sm sm:p-9">
              {submitted ? (
                <div className="py-12 text-center">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-green-100 text-green-600">
                    <Send size={28} />
                  </div>

                  <h2 className="mt-6 text-2xl font-bold text-gray-900">
                    संदेश तैयार है
                  </h2>

                  <p className="mt-3 leading-8 text-gray-500">
                    यह डेमो फ़ॉर्म अभी किसी सर्वर पर संदेश नहीं भेजता। उत्पादन
                    में इसे अपने backend या email service से जोड़ें।
                  </p>

                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="mt-7 rounded-xl bg-amber-600 px-5 py-3 font-semibold text-white"
                  >
                    नया संदेश
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="text-sm font-semibold text-gray-700">
                      नाम
                    </label>

                    <input
                      type="text"
                      required
                      className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-amber-400"
                      placeholder="अपना नाम लिखें"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-gray-700">
                      ईमेल
                    </label>

                    <input
                      type="email"
                      required
                      className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-amber-400"
                      placeholder="अपना ईमेल लिखें"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-gray-700">
                      विषय
                    </label>

                    <input
                      type="text"
                      required
                      className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-amber-400"
                      placeholder="संदेश का विषय"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-gray-700">
                      संदेश
                    </label>

                    <textarea
                      required
                      rows={6}
                      className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-amber-400"
                      placeholder="अपना संदेश लिखें"
                    />
                  </div>

                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 rounded-xl bg-amber-600 px-6 py-3.5 font-semibold text-white transition hover:bg-amber-700"
                  >
                    संदेश भेजें
                    <Send size={18} />
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}
