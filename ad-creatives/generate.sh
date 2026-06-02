#!/usr/bin/env bash
# Generate 20 DinDrift ad statics via Wavespeed flux-dev (5 angles x 4)
KEY="${WAVESPEED_API_KEY:?set WAVESPEED_API_KEY env var}"
BASE="https://api.wavespeed.ai/api/v3/wavespeed-ai/flux-dev"
STYLE="Clean modern Scandinavian minimal advertising photograph, bright airy Danish setting, soft natural daylight, premium editorial commercial style, generous empty negative space at top for text overlay, vivid electric cobalt blue accents, uncluttered high-end photorealistic, no text, no words, no logos, no letters, no numbers"
cd "$(dirname "$0")"

names=(a1_1 a1_2 a1_3 a1_4 a2_1 a2_2 a2_3 a2_4 a3_1 a3_2 a3_3 a3_4 a4_1 a4_2 a4_3 a4_4 a5_1 a5_2 a5_3 a5_4)
prompts=(
"a calm small-business owner closing a laptop and leaving a bright modern office early in the afternoon, relaxed and happy, warm sunlight"
"a relaxed shop owner enjoying free time at home with family in a cozy bright Scandinavian living room"
"a tidy empty minimalist desk with a small clock, a plant and a coffee cup, calm peaceful workspace, lots of open space"
"a professional woman walking out of a sleek modern office into bright daylight, relaxed, bag over shoulder, content"
"a friendly softly glowing translucent blue holographic assistant figure standing beside a desk like a helpful colleague in a modern minimal office"
"an open laptop on a clean desk with a softly glowing blue chat interface, modern minimal workspace, coworker atmosphere"
"a modern minimal office desk with an empty chair and a subtle blue glow suggesting a digital teammate, clean and airy"
"a person at a desk smiling while a translucent blue digital assistant presence helps them, bright clean office"
"a smartphone glowing softly at night on a wooden desk receiving messages being handled automatically, cozy dim office, blue glow"
"a clean organized digital booking calendar board with blue highlighted slots, bright modern office, sense of being fully booked"
"a welcoming cafe reception in the evening with lights on, a friendly staff member serving a happy customer"
"close up of hands holding a phone receiving a booking confirmation, soft blue accent light, clean minimal"
"an approachable Scandinavian man in a casual shirt in a bright minimal workspace, friendly and direct, looking at camera, founder vibe"
"a warm genuine handshake between a young founder and a small-business owner in a bright cafe, personal and friendly, no suits"
"a skilled craftsperson carefully tailoring a bespoke piece on a workbench, metaphor for custom-built, vivid blue accent tools"
"a cozy one-on-one consulting meeting at a cafe table with a laptop, two people, personal and relaxed"
"five glossy gold stars floating elegantly above a smartphone on a clean blue-accented surface, review rating concept, no text"
"an elegant upward-curving 3D growth arrow as a sculptural object on a minimal desk, vivid blue, success and momentum"
"a tidy automated bookkeeping scene with neatly organized receipts and a calculator on a clean desk, calm and orderly, blue accents"
"a thriving small Danish business storefront with happy customers outside on a bright sunny day, sense of growth"
)

> ids.txt
for i in "${!names[@]}"; do
  n="${names[$i]}"; p="${prompts[$i]}. $STYLE"
  resp=$(curl -s -X POST "$BASE" -H "Authorization: Bearer $KEY" -H "Content-Type: application/json" \
    --data-raw "$(printf '{"prompt":%s,"size":"896*1152"}' "$(printf '%s' "$p" | python -c 'import json,sys;print(json.dumps(sys.stdin.read()))')")")
  id=$(printf '%s' "$resp" | grep -o '"id":"[a-f0-9]*"' | head -1 | sed 's/"id":"//;s/"//')
  echo "$n $id" >> ids.txt
  echo "submitted $n -> $id"
done