import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, Sparkles } from "lucide-react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Footer from "../components/Footer";
import SEO from "../components/SEO";
import { InArticleAd } from "../components/AdUnit";

const studySteps = [
  {
    title: "पहले प्रसंग समझें",
    text: "किसी श्लोक को पढ़ने से पहले उसके अध्याय और संवाद की स्थिति को समझें। इससे यह स्पष्ट होता है कि श्रीकृष्ण किस प्रश्न या परिस्थिति के उत्तर में उपदेश दे रहे हैं।",
  },
  {
    title: "श्लोक और अर्थ साथ पढ़ें",
    text: "मूल संस्कृत पाठ के साथ हिंदी अर्थ पढ़ें। कठिन शब्दों को समझने के लिए शब्दार्थ और लिप्यंतरण उपलब्ध होने पर उनका सहारा लें।",
  },
  {
    title: "विचार करके जीवन से जोड़ें",
    text: "शिक्षा को अपने अनुभवों, कर्तव्यों और निर्णयों के संदर्भ में समझें। किसी एक पंक्ति को पूरे ग्रंथ का अर्थ मानने के बजाय व्यापक प्रसंग पर ध्यान दें।",
  },
];

const themes = [
  [
    "कर्म और कर्तव्य",
    "अपने दायित्व को समझना और परिणाम की चिंता से विचलित हुए बिना उचित प्रयास करना।",
  ],
  [
    "ज्ञान और विवेक",
    "स्थायी और अस्थायी के अंतर पर विचार करना तथा निर्णय में विवेक का उपयोग करना।",
  ],
  [
    "भक्ति और समर्पण",
    "श्रद्धा, विनम्रता और समर्पित भाव से जीवन के कार्यों को करना।",
  ],
  [
    "मन का संयम",
    "अभ्यास, धैर्य और आत्मनिरीक्षण के माध्यम से मन को संतुलित रखना।",
  ],
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#faf7f0]">
      <SEO
        title="श्रीमद्भगवद्गीता – 18 अध्याय, संस्कृत श्लोक और हिंदी अर्थ"
        description="श्रीमद्भगवद्गीता के 18 अध्यायों और श्लोकों का अध्ययन करें। संस्कृत पाठ, हिंदी अर्थ, प्रसंग और उपलब्ध व्याख्या के साथ गीता के संदेश को समझने का प्रयास करें।"
        canonical="/"
      />
      <Navbar />
      <Hero />

      <section className="px-5 py-20 sm:py-24">
        <div className="mx-auto max-w-5xl">
          <p className="text-center text-sm font-semibold tracking-[0.25em] text-amber-600">
            ग्रंथ का परिचय
          </p>
          <h2 className="mt-4 text-center text-3xl font-bold text-gray-900 sm:text-4xl">
            श्रीमद्भगवद्गीता क्या है?
          </h2>
          <div className="mx-auto mt-7 max-w-4xl space-y-5 text-base leading-8 text-gray-700">
            <p>
              श्रीमद्भगवद्गीता महाभारत के भीष्म पर्व का वह संवाद है जिसमें
              कुरुक्षेत्र की युद्धभूमि पर अर्जुन अपने कर्तव्य और उससे जुड़े
              नैतिक प्रश्नों को लेकर दुविधा में पड़ जाते हैं। वे अपने सामने
              उपस्थित परिस्थिति को देखकर शोक और मोह से व्याकुल होते हैं। तब
              भगवान श्रीकृष्ण उन्हें जीवन, आत्मा, कर्म, ज्ञान, योग और भक्ति से
              जुड़े विषयों पर मार्गदर्शन देते हैं।
            </p>
            <p>
              गीता का संवाद केवल युद्ध की परिस्थिति तक सीमित नहीं है। इसमें
              मनुष्य के कर्तव्य, निर्णय, आत्मसंयम, आसक्ति, समभाव और आध्यात्मिक
              खोज जैसे व्यापक विषयों पर विचार मिलता है। अलग-अलग अध्याय इन विषयों
              को अलग दृष्टिकोण से प्रस्तुत करते हैं। इसलिए किसी श्लोक का अर्थ
              समझते समय उसके पहले और बाद के विचारों तथा पूरे अध्याय के प्रसंग को
              देखना उपयोगी है।
            </p>
            <p>
              इस वेबसाइट का उद्देश्य पाठकों को अध्याय और श्लोक क्रम से पढ़ने में
              सहायता देना है। जहाँ उपलब्ध है, वहाँ संस्कृत मूल पाठ के साथ हिंदी
              अर्थ, लिप्यंतरण, शब्दार्थ और अतिरिक्त व्याख्यात्मक सामग्री दी जाती
              है। अलग-अलग परंपराओं में कुछ पदों की व्याख्या भिन्न हो सकती है;
              इसलिए पाठक मूल श्लोक और उसके संदर्भ को ध्यान में रखकर अध्ययन करें।
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold tracking-[0.25em] text-amber-600">
              अध्ययन की विधि
            </p>
            <h2 className="mt-4 text-3xl font-bold text-gray-900 sm:text-4xl">
              भगवद्गीता को क्रम से कैसे पढ़ें?
            </h2>
            <p className="mt-5 leading-8 text-gray-600">
              अध्ययन को सरल और व्यवस्थित रखने के लिए अध्याय, श्लोक और उनके
              संदर्भ को साथ लेकर चलें। नीचे दिए गए चरण एक उपयोगी प्रारंभिक तरीका
              हैं।
            </p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {studySteps.map((step, index) => (
              <article
                key={step.title}
                className="rounded-3xl border border-amber-900/10 bg-[#fffdf8] p-7"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-100 font-bold text-amber-700">
                  {index + 1}
                </span>
                <h3 className="mt-5 text-xl font-bold text-gray-900">
                  {step.title}
                </h3>
                <p className="mt-3 leading-8 text-gray-600">{step.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold tracking-[0.25em] text-amber-600">
              मुख्य विषय
            </p>
            <h2 className="mt-4 text-3xl font-bold text-gray-900 sm:text-4xl">
              गीता के कुछ प्रमुख विचार
            </h2>
            <p className="mt-5 leading-8 text-gray-600">
              गीता में अनेक दार्शनिक और व्यावहारिक विषयों पर संवाद है। नीचे दिए
              गए विषय संक्षिप्त परिचय हैं, संपूर्ण ग्रंथ की व्याख्या नहीं।
            </p>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            {themes.map(([title, text]) => (
              <article
                key={title}
                className="rounded-3xl border border-amber-900/10 bg-white p-7"
              >
                <h3 className="text-xl font-bold text-gray-900">{title}</h3>
                <p className="mt-3 leading-8 text-gray-600">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#111827] px-5 py-20 text-white">
        <div className="mx-auto max-w-5xl">
          <div className="flex items-center gap-3 text-amber-300">
            <Sparkles size={19} />
            <span className="text-sm font-semibold tracking-[0.2em]">
              अध्ययन के लिए उपयोगी बातें
            </span>
          </div>
          <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
            पढ़ते समय इन बातों का ध्यान रखें
          </h2>
          <ul className="mt-7 space-y-4 text-base leading-8 text-white/75">
            <li>• श्लोक को उसके अध्याय और संवाद के संदर्भ में पढ़ें।</li>
            <li>• हिंदी अर्थ को मूल संस्कृत पाठ के साथ मिलाकर समझें।</li>
            <li>
              • किसी कठिन पद के लिए एक से अधिक विश्वसनीय भाष्य या अनुवाद देखना
              उपयोगी हो सकता है।
            </li>
            <li>
              • जीवन में उपयोग के विचारों को व्यक्तिगत चिंतन के रूप में लें, न
              कि हर परिस्थिति का एकमात्र उत्तर।
            </li>
          </ul>
          <p className="mt-7 text-sm leading-7 text-white/50">
            इस वेबसाइट पर उपलब्ध हिंदी सामग्री अध्ययन में सहायता के उद्देश्य से
            है। यह किसी प्रमाणित विद्वान, गुरु या परंपरागत भाष्य का विकल्प होने
            का दावा नहीं करती।
          </p>
        </div>
      </section>

      <section className="px-5 py-20">
        <div className="mx-auto max-w-5xl rounded-3xl border border-amber-900/10 bg-white p-8 text-center shadow-sm sm:p-12">
          <BookOpen className="mx-auto text-amber-600" size={34} />
          <h2 className="mt-5 text-3xl font-bold text-gray-900">
            18 अध्यायों का अध्ययन शुरू करें
          </h2>
          <p className="mx-auto mt-4 max-w-2xl leading-8 text-gray-600">
            अध्यायवार सूची से अपनी पढ़ाई शुरू करें। प्रत्येक उपलब्ध अध्याय में
            श्लोक क्रम से दिए गए हैं, ताकि आप अपनी गति से आगे बढ़ सकें।
          </p>
          <Link
            to="/gita"
            className="mt-7 inline-flex items-center gap-2 rounded-xl bg-amber-600 px-6 py-3.5 font-semibold text-white transition hover:bg-amber-700"
          >
            सभी अध्याय देखें <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      {/* The homepage now contains substantial editorial content before this ad. */}
      <div className="mx-auto max-w-5xl px-5 pb-10">
        <InArticleAd enabled />
      </div>

      <Footer />
    </main>
  );
}
