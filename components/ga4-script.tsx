"use client"

import Script from "next/script"
import { useConsent } from "@/lib/consent-context"

const GA_ID = process.env.NEXT_PUBLIC_GA_ID

export function GA4Script() {
  const { consent } = useConsent()

  if (!GA_ID || consent !== "granted") return null

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('js', new Date());
          gtag('config', '${GA_ID}', { send_page_view: true });
          try {
            var utms = JSON.parse(sessionStorage.getItem('utm_params') || '{}');
            if (Object.keys(utms).length) gtag('set', 'user_properties', utms);
          } catch(e) {}
        `}
      </Script>
    </>
  )
}
