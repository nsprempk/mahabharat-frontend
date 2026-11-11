import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { ADSENSE_CLIENT, ADSENSE_ENABLED } from "../utils/adsense";

/**
 * Manual ad unit.
 * Ads are opt-in: callers must pass enabled={true} only after the
 * page's primary publisher content has loaded and been validated.
 * Auto Ads are controlled separately in the AdSense dashboard.
 */
export default function AdUnit({
  slot,
  enabled = false,
  format = "auto",
  layout = null,
  layoutKey = null,
  fullWidthResponsive = true,
  className = "",
  label = "विज्ञापन",
}) {
  const adRef = useRef(null);
  const { pathname } = useLocation();

  const isContentRoute =
    pathname === "/" ||
    /^\/gita\/adhyay\/\d+$/.test(pathname) ||
    /^\/gita\/adhyay\/\d+\/shlok\/\d+$/.test(pathname);

  const shouldRender = Boolean(
    ADSENSE_ENABLED && enabled && slot && isContentRoute,
  );

  useEffect(() => {
    const adElement = adRef.current;
    if (!shouldRender || !adElement) return;
    if (adElement.dataset.adsInitialized === "true") return;

    try {
      window.adsbygoogle = window.adsbygoogle || [];
      window.adsbygoogle.push({});
      adElement.dataset.adsInitialized = "true";
    } catch (error) {
      console.error("AdSense initialization error:", error);
    }
  }, [shouldRender, slot, format, layout, layoutKey]);

  if (!shouldRender) return null;

  return (
    <section className={`my-8 w-full ${className}`} aria-label={label}>
      <p className="mb-2 text-center text-[10px] font-medium uppercase tracking-[0.18em] text-gray-400">
        {label}
      </p>
      <div className="flex w-full justify-center overflow-hidden">
        <ins
          ref={adRef}
          className="adsbygoogle"
          style={{ display: "block", width: "100%" }}
          data-ad-client={ADSENSE_CLIENT}
          data-ad-slot={slot}
          data-ad-format={format}
          data-full-width-responsive={fullWidthResponsive ? "true" : "false"}
          {...(layout ? { "data-ad-layout": layout } : {})}
          {...(layoutKey ? { "data-ad-layout-key": layoutKey } : {})}
        />
      </div>
    </section>
  );
}

export function FluidAd({ enabled = false, className = "" }) {
  return (
    <AdUnit
      enabled={enabled}
      slot="8772959159"
      format="fluid"
      layoutKey="-gw-3+1f-3d+2z"
      className={className}
    />
  );
}

export function InArticleAd({ enabled = false, className = "" }) {
  return (
    <AdUnit
      enabled={enabled}
      slot="2666715800"
      format="fluid"
      layout="in-article"
      className={className}
    />
  );
}

export function DisplayAd({ enabled = false, className = "" }) {
  return (
    <AdUnit
      enabled={enabled}
      slot="6166232257"
      format="auto"
      fullWidthResponsive
      className={className}
    />
  );
}

export function MultiplexAd({ enabled = false, className = "" }) {
  return (
    <AdUnit
      enabled={enabled}
      slot="6166977110"
      format="autorelaxed"
      className={className}
    />
  );
}
