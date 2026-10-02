import { useState } from "react";
import { ArrowLeft, Mail, MessageCircle, Send } from "lucide-react";
import { Link } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SEO from "../components/SEO";
import API from "../services/api";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [submitting, setSubmitting] = useState(false);

  const [success, setSuccess] = useState("");

  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (submitting) {
      return;
    }

    setSubmitting(true);
    setSuccess("");
    setError("");

    try {
      const response = await API.post("/contact", form);

      if (!response.data?.success) {
        throw new Error(
          response.data?.message || "संदेश भेजने में समस्या हुई।",
        );
      }

      setSuccess(
        response.data.message || "आपका संदेश सफलतापूर्वक भेज दिया गया।",
      );

      setForm({
        name: "",
        email: "",
        subject: "",
        message: "",
      });

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } catch (err) {
      console.error("Contact form error:", err);

      setError(
        err.response?.data?.message ||
          err.message ||
          "संदेश भेजने में समस्या हुई। कृपया बाद में पुनः प्रयास करें।",
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#faf7f0]">
      <SEO
        title="संपर्क करें | श्रीमद्भगवद्गीता"
        description="श्रीमद्भगवद्गीता वेबसाइट से संपर्क करें। सुझाव, सामग्री, तकनीकी समस्या और गोपनीयता संबंधी प्रश्नों के लिए संपर्क करें।"
        canonical="/contact"
      />

      <Navbar />

      {/* HERO */}
      <section className="bg-[#111827] px-5 pb-20 pt-32">
        <div className="mx-auto max-w-5xl">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-white/60 transition hover:text-white"
          >
            <ArrowLeft size={17} />
            मुख्य पृष्ठ
          </Link>

          <div className="mt-10 flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-400 text-black">
              <MessageCircle size={26} />
            </div>

            <div>
              <p className="text-sm text-amber-300">संपर्क</p>

              <h1 className="text-3xl font-bold text-white sm:text-5xl">
                हमसे संपर्क करें
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
          {/* INFO */}
          <div className="rounded-3xl bg-[#111827] p-7 text-white sm:p-9">
            <Mail size={28} className="text-amber-300" />

            <h2 className="mt-6 text-2xl font-bold">संपर्क जानकारी</h2>

            <p className="mt-4 leading-8 text-white/60">
              नीचे दिए गए फ़ॉर्म से अपना संदेश भेजें। आपका संदेश हमारी संपर्क
              ईमेल पर पहुँचेगा।
            </p>

            <div className="mt-7 rounded-2xl border border-white/10 bg-white/5 p-5">
              <div className="flex items-start gap-3">
                <Mail size={18} className="mt-1 shrink-0 text-amber-300" />

                <div>
                  <p className="text-xs text-white/40">ईमेल</p>

                  <p className="mt-1 break-all text-sm text-amber-300">
                    संपर्क फ़ॉर्म द्वारा संदेश भेजें
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-5 rounded-2xl border border-white/10 bg-white/5 p-5">
              <p className="text-sm leading-7 text-white/50">
                कृपया संदेश में अपना प्रश्न या समस्या स्पष्ट रूप से लिखें ताकि
                हम बेहतर सहायता कर सकें।
              </p>
            </div>
          </div>

          {/* FORM */}
          <div className="rounded-3xl border border-gray-100 bg-white p-7 shadow-sm sm:p-9">
            {success && (
              <div className="mb-6 rounded-2xl border border-green-200 bg-green-50 p-5">
                <p className="font-semibold text-green-700">
                  संदेश भेज दिया गया
                </p>

                <p className="mt-1 text-sm leading-7 text-green-600">
                  {success}
                </p>
              </div>
            )}

            {error && (
              <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 p-5">
                <p className="font-semibold text-red-700">
                  संदेश भेजा नहीं जा सका
                </p>

                <p className="mt-1 text-sm leading-7 text-red-600">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* NAME */}
              <div>
                <label
                  htmlFor="name"
                  className="text-sm font-semibold text-gray-700"
                >
                  नाम
                </label>

                <input
                  id="name"
                  name="name"
                  type="text"
                  value={form.name}
                  onChange={handleChange}
                  required
                  maxLength={100}
                  autoComplete="name"
                  className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
                  placeholder="अपना नाम लिखें"
                />
              </div>

              {/* EMAIL */}
              <div>
                <label
                  htmlFor="email"
                  className="text-sm font-semibold text-gray-700"
                >
                  ईमेल
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  maxLength={200}
                  autoComplete="email"
                  className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
                  placeholder="अपना ईमेल लिखें"
                />
              </div>

              {/* SUBJECT */}
              <div>
                <label
                  htmlFor="subject"
                  className="text-sm font-semibold text-gray-700"
                >
                  विषय
                </label>

                <input
                  id="subject"
                  name="subject"
                  type="text"
                  value={form.subject}
                  onChange={handleChange}
                  required
                  maxLength={200}
                  className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
                  placeholder="संदेश का विषय"
                />
              </div>

              {/* MESSAGE */}
              <div>
                <label
                  htmlFor="message"
                  className="text-sm font-semibold text-gray-700"
                >
                  संदेश
                </label>

                <textarea
                  id="message"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  required
                  rows={7}
                  maxLength={5000}
                  className="mt-2 w-full resize-y rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
                  placeholder="अपना संदेश लिखें"
                />

                <p className="mt-2 text-right text-xs text-gray-400">
                  {form.message.length}/5000
                </p>
              </div>

              {/* SUBMIT */}
              <button
                type="submit"
                disabled={submitting}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-amber-600 px-6 py-3.5 font-semibold text-white transition hover:bg-amber-700 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
              >
                {submitting ? (
                  <>
                    <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    भेजा जा रहा है...
                  </>
                ) : (
                  <>
                    संदेश भेजें
                    <Send size={18} />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
