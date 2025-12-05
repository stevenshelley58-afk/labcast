"use client";

import Script from "next/script";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, Suspense } from "react";

interface FacebookPixel {
  (action: "init", pixelId: string): void;
  (action: "track", eventName: string, params?: Record<string, unknown>): void;
  (
    action: "trackCustom",
    eventName: string,
    params?: Record<string, unknown>
  ): void;
  callMethod?: (...args: unknown[]) => void;
  queue: unknown[];
  loaded: boolean;
  version: string;
  push: (...args: unknown[]) => void;
}

declare global {
  interface Window {
    fbq: FacebookPixel;
    _fbq: FacebookPixel;
  }
}

const FB_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;

/**
 * Tracks a Meta Pixel event.
 * Use for standard events like 'Lead', 'Contact', 'ViewContent', etc.
 *
 * @example
 * // Track a lead conversion
 * trackEvent('Lead', { content_name: 'Contact Form' });
 *
 * // Track page view (handled automatically, but can be called manually)
 * trackEvent('PageView');
 */
export function trackEvent(
  eventName: string,
  params?: Record<string, string | number | boolean>
): void {
  if (typeof window !== "undefined" && window.fbq && FB_PIXEL_ID) {
    if (params) {
      window.fbq("track", eventName, params);
    } else {
      window.fbq("track", eventName);
    }
  }
}

/**
 * Tracks a custom Meta Pixel event.
 * Use for non-standard events specific to your business.
 *
 * @example
 * trackCustomEvent('ScheduleCall');
 * trackCustomEvent('DownloadBrochure', { brochure_type: 'pricing' });
 */
export function trackCustomEvent(
  eventName: string,
  params?: Record<string, string | number | boolean>
): void {
  if (typeof window !== "undefined" && window.fbq && FB_PIXEL_ID) {
    if (params) {
      window.fbq("trackCustom", eventName, params);
    } else {
      window.fbq("trackCustom", eventName);
    }
  }
}

function PageViewTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (FB_PIXEL_ID) {
      trackEvent("PageView");
    }
  }, [pathname, searchParams]);

  return null;
}

/**
 * Meta Pixel integration component.
 * Add to root layout to enable tracking across all pages.
 * Automatically tracks PageView on route changes.
 *
 * Required env var: NEXT_PUBLIC_META_PIXEL_ID
 *
 * @example
 * // In app/layout.tsx
 * <body>
 *   <MetaPixel />
 *   {children}
 * </body>
 */
export function MetaPixel() {
  if (!FB_PIXEL_ID) {
    return null;
  }

  return (
    <>
      <Script
        id="meta-pixel"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${FB_PIXEL_ID}');
          `,
        }}
      />
      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          src={`https://www.facebook.com/tr?id=${FB_PIXEL_ID}&ev=PageView&noscript=1`}
          alt=""
        />
      </noscript>
      <Suspense fallback={null}>
        <PageViewTracker />
      </Suspense>
    </>
  );
}

