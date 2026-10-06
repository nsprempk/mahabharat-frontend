import { useEffect, useRef } from "react";

/*
|--------------------------------------------------------------------------
| Google AdSense Publisher
|--------------------------------------------------------------------------
*/

const ADSENSE_CLIENT =
  import.meta.env.VITE_ADSENSE_CLIENT || "ca-pub-9240988934767169";

/*
|--------------------------------------------------------------------------
| Reusable AdSense Unit
|--------------------------------------------------------------------------
|
| Supported formats used by your current AdSense setup:
|
| fluid
| in-article
| auto/display
| autorelaxed / multiplex
|
|--------------------------------------------------------------------------
*/

export default function AdUnit({
  slot,
  format = "auto",
  layout = null,
  layoutKey = null,
  fullWidthResponsive = true,
  className = "",
  label = "विज्ञापन",
}) {
  const adRef = useRef(null);

  useEffect(() => {
    const adElement = adRef.current;

    if (!adElement) {
      return;
    }

    /*
    |--------------------------------------------------------------------------
    | Prevent initializing the same ad element twice
    |--------------------------------------------------------------------------
    */

    if (adElement.dataset.adsInitialized === "true") {
      return;
    }

    try {
      /*
      |--------------------------------------------------------------------------
      | Google AdSense queue
      |--------------------------------------------------------------------------
      */

      window.adsbygoogle = window.adsbygoogle || [];

      window.adsbygoogle.push({});

      adElement.dataset.adsInitialized = "true";
    } catch (error) {
      console.error("AdSense initialization error:", error);
    }
  }, [slot, format, layout, layoutKey]);

  /*
  |--------------------------------------------------------------------------
  | No slot = no advertisement
  |--------------------------------------------------------------------------
  */

  if (!slot) {
    return null;
  }

  return (
    <section className={`my-8 w-full ${className}`} aria-label={label}>
      {/* Small ad label */}
      <p className="mb-2 text-center text-[10px] font-medium uppercase tracking-[0.18em] text-gray-400">
        {label}
      </p>

      {/* Ad container */}
      <div className="flex w-full justify-center overflow-hidden">
        <ins
          ref={adRef}
          className="adsbygoogle"
          style={{
            display: "block",
            width: "100%",
          }}
          data-ad-client={ADSENSE_CLIENT}
          data-ad-slot={slot}
          data-ad-format={format}
          data-full-width-responsive={fullWidthResponsive ? "true" : "false"}
          {...(layout
            ? {
                "data-ad-layout": layout,
              }
            : {})}
          {...(layoutKey
            ? {
                "data-ad-layout-key": layoutKey,
              }
            : {})}
        />
      </div>
    </section>
  );
}

/*
|--------------------------------------------------------------------------
| Ready-made ad presets
|--------------------------------------------------------------------------
*/

/*
 * Fluid ad
 * Your current slot:
 * 8772959159
 */

export function FluidAd({ className = "" }) {
  return (
    <AdUnit
      slot="8772959159"
      format="fluid"
      layoutKey="-gw-3+1f-3d+2z"
      className={className}
    />
  );
}

/*
 * In-article ad
 * Your current slot:
 * 2666715800
 */

export function InArticleAd({ className = "" }) {
  return (
    <AdUnit
      slot="2666715800"
      format="fluid"
      layout="in-article"
      className={className}
    />
  );
}

/*
 * Display ad
 * Your current slot:
 * 6166232257
 */

export function DisplayAd({ className = "" }) {
  return (
    <AdUnit
      slot="6166232257"
      format="auto"
      fullWidthResponsive={true}
      className={className}
    />
  );
}

/*
 * Multiplex / auto-relaxed
 * Your current slot:
 * 6166977110
 */

export function MultiplexAd({ className = "" }) {
  return (
    <AdUnit slot="6166977110" format="autorelaxed" className={className} />
  );
}
