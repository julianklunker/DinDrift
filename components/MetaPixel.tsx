import Script from "next/script"

// Meta (Facebook) Pixel base code.
// Renders nothing unless NEXT_PUBLIC_FB_PIXEL_ID is set, so it is safe to ship
// before the Pixel exists — add the env var in Vercel once Events Manager gives
// you the ID, redeploy, and tracking goes live.
export default function MetaPixel() {
  // Pixel IDs are public (they appear in page source), so the real ID is the
  // default; NEXT_PUBLIC_FB_PIXEL_ID can override it per-environment if needed.
  const pixelId = process.env.NEXT_PUBLIC_FB_PIXEL_ID || "1327683732481417"
  if (!pixelId) return null

  return (
    <>
      <Script id="meta-pixel" strategy="lazyOnload">
        {`
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window,document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '${pixelId}');
          fbq('track', 'PageView');
        `}
      </Script>
      <noscript>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          alt=""
          src={`https://www.facebook.com/tr?id=${pixelId}&ev=PageView&noscript=1`}
        />
      </noscript>
    </>
  )
}
