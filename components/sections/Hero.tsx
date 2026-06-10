"use client"

import { useEffect, useState } from "react"
import { LayoutGroup, motion } from "motion/react"
import { useLanguage } from "@/lib/LanguageContext"
import { TextRotate } from "@/components/ui/text-rotate"
import { GlassPanel } from "@/components/ui/glass-panel"
import CalendlyButton from "@/components/booking/CalendlyButton"

// Background b-roll. List one combined loop (recommended) OR several clips to
// auto-cycle. Files live in /public/hero-video/ (see that folder's README).
// The video only plays on desktop — mobile gets the static poster instead:
// an autoplaying video wrecks mobile Speed Index and costs visitors ~335 KB
// of data for a decorative background.
const HERO_VIDEOS = [{ desktop: "/hero-video/HeroVid.mp4" }]
const HERO_POSTER = "/hero-video/poster.jpg"

export default function Hero() {
  const { t } = useLanguage()
  const [idx, setIdx] = useState(0)
  const [reducedMotion, setReducedMotion] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  // Video mounts only after hydration: SSR can't know the viewport, and the
  // poster <img> below paints from the first server-rendered frame either way.
  const [mounted, setMounted] = useState(false)
  // The word rotation starts after a few idle seconds: its per-letter spring
  // animations are heavy on throttled mobile CPUs and would otherwise run
  // during initial load.
  const [rotateActive, setRotateActive] = useState(false)
  const multi = HERO_VIDEOS.length > 1
  const videoSrc = HERO_VIDEOS[idx].desktop
  const showVideo = mounted && !reducedMotion && !isMobile

  useEffect(() => {
    setMounted(true)
    const rotateTimer = setTimeout(() => setRotateActive(true), 5000)
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    setReducedMotion(mq.matches)
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches)
    mq.addEventListener("change", handler)

    const mqMobile = window.matchMedia("(max-width: 768px)")
    setIsMobile(mqMobile.matches)
    const mobileHandler = (e: MediaQueryListEvent) => setIsMobile(e.matches)
    mqMobile.addEventListener("change", mobileHandler)

    return () => {
      clearTimeout(rotateTimer)
      mq.removeEventListener("change", handler)
      mqMobile.removeEventListener("change", mobileHandler)
    }
  }, [])

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section className="w-full h-screen overflow-hidden flex flex-col items-center justify-center relative">
      {/* Background layer: poster paints with the first frame; the video
          replaces it on desktop once hydrated. */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-gradient-to-br from-blue-50 to-white">
        {!showVideo && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={HERO_POSTER}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
            style={{ filter: "brightness(0.55)" }}
            aria-hidden="true"
          />
        )}
        {showVideo && (
          <video
            key={videoSrc}
            className="absolute inset-0 w-full h-full object-cover"
            style={{ filter: "brightness(0.55)" }}
            autoPlay
            muted
            loop={!multi}
            playsInline
            preload="metadata"
            poster={HERO_POSTER}
            aria-hidden="true"
            onEnded={() => {
              if (multi) setIdx((i) => (i + 1) % HERO_VIDEOS.length)
            }}
          >
            <source src={videoSrc} type="video/mp4" />
          </video>
        )}
        {/* Legibility overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/25" />
      </div>

      {/* Center content (inside frosted glass so text stays legible over the video) */}
      <GlassPanel className="z-50 px-6 py-8 sm:px-10 sm:py-10 md:px-14 md:py-12 pointer-events-auto">
        <div className="flex flex-col justify-center items-center w-[250px] sm:w-[300px] md:w-[500px] lg:w-[700px]">
          {/* No entrance animation on the headline/subtext: they must paint
              with the first server-rendered frame so the hero text is the LCP
              element (an opacity-0 initial state hides them until hydration). */}
          <h1 className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl text-center w-full justify-center items-center flex-col flex whitespace-pre leading-tight font-semibold tracking-tight space-y-1 md:space-y-4">
            <span>{t.hero.prefix} </span>
            <LayoutGroup>
              <motion.span layout className="flex whitespace-pre">
                <TextRotate
                  texts={t.hero.rotatingTexts as unknown as string[]}
                  mainClassName="overflow-hidden text-[#0015ff] py-0 pb-2 md:pb-4 rounded-xl"
                  staggerDuration={0.03}
                  staggerFrom="last"
                  rotationInterval={3000}
                  auto={rotateActive}
                  initial={false}
                  transition={{ type: "spring", damping: 30, stiffness: 400 }}
                />
              </motion.span>
            </LayoutGroup>
          </h1>

          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-center text-muted-foreground pt-4 sm:pt-6 md:pt-8 max-w-md">
            {t.hero.subtext}
          </p>

          <motion.div
            className="flex flex-row flex-wrap justify-center gap-3 sm:gap-4 items-center mt-8 sm:mt-10 md:mt-12"
            animate={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.2, ease: "easeOut", delay: 0.7 }}
          >
            <motion.button
              onClick={() => scrollTo("solutions")}
              className="text-sm sm:text-base md:text-lg font-semibold tracking-tight text-background bg-foreground px-4 py-2 sm:px-5 sm:py-2.5 md:px-6 md:py-3 rounded-full shadow-2xl min-h-[44px]"
              whileHover={{
                scale: 1.05,
                transition: { type: "spring", damping: 30, stiffness: 400 },
              }}
            >
              {t.hero.btnSolutions}
            </motion.button>

            <motion.button
              onClick={() => scrollTo("contact")}
              className="text-sm sm:text-base md:text-lg font-semibold tracking-tight text-white bg-[#0015ff] px-4 py-2 sm:px-5 sm:py-2.5 md:px-6 md:py-3 rounded-full shadow-2xl min-h-[44px]"
              whileHover={{
                scale: 1.05,
                transition: { type: "spring", damping: 30, stiffness: 400 },
              }}
            >
              {t.hero.btnContact}
            </motion.button>

            <CalendlyButton className="text-sm sm:text-base md:text-lg font-semibold tracking-tight text-[#0015ff] bg-white px-4 py-2 sm:px-5 sm:py-2.5 md:px-6 md:py-3 rounded-full shadow-2xl min-h-[44px]" />
          </motion.div>
        </div>
      </GlassPanel>
    </section>
  )
}
