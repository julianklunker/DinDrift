# Hero background video

Drop your b-roll here. The hero (`components/sections/Hero.tsx`) plays it full-bleed
behind a frosted glass panel, dimmed for text legibility.

## Files this folder expects
- `hero.mp4` — the background loop (required for video to show).
- `poster.jpg` — a still first frame (shown before the video loads / on slow connections). Optional but recommended.

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
