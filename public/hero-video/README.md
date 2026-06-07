# Hero background video

Drop your b-roll here. The hero (`components/sections/Hero.tsx`) plays it full-bleed
behind a frosted glass panel, dimmed for text legibility.

## Files this folder expects
- `HeroVid.mp4` — the desktop background loop (1280×720, ~1 MB).
- `HeroVid.mobile.mp4` — a lighter copy (720×406, ~330 KB) served on screens ≤ 768px.
- `poster.jpg` — a still first frame (shown before the video loads / on slow connections, and for reduce-motion users).

The uncompressed 1080p source is kept at `../../video-source/HeroVid.original.mp4` (gitignored,
local-only — it is **not** in `public/` so it never deploys).

`Hero.tsx` automatically serves `HeroVid.mobile.mp4` on small screens via a `(max-width: 768px)`
media query, falling back to the desktop file otherwise.

### Re-compressing a new source (ffmpeg, run from project root)
```
ffmpeg -i video-source/HeroVid.original.mp4 -vf "scale=1280:-2" -c:v libx264 -crf 28 -preset slow -an -pix_fmt yuv420p -movflags +faststart public/hero-video/HeroVid.mp4
ffmpeg -i video-source/HeroVid.original.mp4 -vf "scale=720:-2"  -c:v libx264 -crf 30 -preset slow -an -pix_fmt yuv420p -movflags +faststart public/hero-video/HeroVid.mobile.mp4
ffmpeg -i video-source/HeroVid.original.mp4 -vf "scale=1280:-2" -frames:v 1 -q:v 3 public/hero-video/poster.jpg
```

## One combined clip vs. several (recommended: ONE)
For the smoothest result, **edit your 3–4 clips into a single ~15–30s seamless loop**
(ideally with short cross-fades) and export as `hero.mp4`. One file = one network
request, no stutter at clip boundaries, smallest total size.

If you'd rather not edit them together, you can instead drop several files
(`hero.mp4`, `hero-2.mp4`, `hero-3.mp4`, …) and list them in the `HERO_VIDEOS`
array at the top of `components/sections/Hero.tsx`. The hero will auto-advance to
the next clip when one ends and cycle back to the first.

## Encoding specs (keep Lighthouse ≥ 90)
- Format: **MP4 (H.264 / AAC-none)**. Add a `.webm` (VP9) alongside for extra savings if easy.
- Resolution: 1080p max (720p is usually plenty for a dimmed background).
- **No audio track** (the video is muted; stripping audio shrinks the file).
- Target total size: **< ~8 MB**. Compress hard — it sits behind a blur + brightness filter, so detail loss is invisible.
- ~24–30 fps.

## Notes
- The video is `muted`, `autoplay`, `loop`, `playsInline` (required for mobile autoplay).
- Users with "reduce motion" enabled see a static branded fallback instead of the video.
- Nothing breaks if these files are missing — the hero just shows a clean fallback background.
