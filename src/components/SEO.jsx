import { Helmet } from "react-helmet-async";

const SITE_URL = "https://bhagavadgita.site";
const SITE_NAME = "श्रीमद्भगवद्गीता";

export default function SEO({
  title = SITE_NAME,
  description = "श्रीमद्भगवद्गीता के 18 अध्याय और 700 श्लोक संस्कृत पाठ, लिप्यंतरण और हिंदी अर्थ के साथ पढ़ें।",
  canonical,
  image = `${SITE_URL}/og-image.jpg`,
  noindex = false,
  type = "website",
}) {
  const canonicalUrl = canonical
    ? canonical.startsWith("http")
      ? canonical
      : `${SITE_URL}${canonical}`
    : SITE_URL;

  return (
    <Helmet>
      <html lang="hi" />

      <title>{title}</title>

      <meta name="description" content={description} />

      <meta
        name="robots"
        content={
          noindex
            ? "noindex,follow"
            : "index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1"
        }
      />

      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph */}
      <meta property="og:type" content={type} />

      <meta property="og:title" content={title} />

      <meta property="og:description" content={description} />

      <meta property="og:url" content={canonicalUrl} />

      <meta property="og:site_name" content={SITE_NAME} />

      <meta property="og:locale" content="hi_IN" />

      <meta property="og:image" content={image} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />

      <meta name="twitter:title" content={title} />

      <meta name="twitter:description" content={description} />

      <meta name="twitter:image" content={image} />
    </Helmet>
  );
}
