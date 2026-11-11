const DEFAULT_PUBLISHER_ID = "ca-pub-9240988934767169";

export const ADSENSE_ENABLED = import.meta.env.VITE_ADS_ENABLED === "true";
export const ADSENSE_CLIENT =
  import.meta.env.VITE_ADSENSE_CLIENT || DEFAULT_PUBLISHER_ID;

/**
 * Load the AdSense library once, and only when explicitly enabled in the
 * production environment. Keep VITE_ADS_ENABLED=false during the suspension.
 */
export function loadAdSense() {
  if (!ADSENSE_ENABLED || typeof document === "undefined") return;

  if (!/^ca-pub-\d{16}$/.test(ADSENSE_CLIENT)) {
    console.error("AdSense was not loaded: VITE_ADSENSE_CLIENT is invalid.");
    return;
  }

  if (document.getElementById("google-adsense-loader")) return;

  const script = document.createElement("script");
  script.id = "google-adsense-loader";
  script.async = true;
  script.crossOrigin = "anonymous";
  script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`;
  script.addEventListener(
    "error",
    () => {
      console.error("The AdSense library could not be loaded.");
      script.remove();
    },
    { once: true },
  );

  document.head.appendChild(script);
}
