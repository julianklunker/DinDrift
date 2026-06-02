import json, os, textwrap
from PIL import Image, ImageDraw, ImageFont

HERE = os.path.dirname(os.path.abspath(__file__))
BLUE = (0, 21, 255)        # #0015ff brand
INK  = (24, 24, 27)        # near-black
WHITE = (255, 255, 255)

def font(path_list, size):
    for p in path_list:
        try: return ImageFont.truetype(p, size)
        except Exception: continue
    return ImageFont.load_default()

BOLD = ["C:/Windows/Fonts/segoeuib.ttf", "C:/Windows/Fonts/arialbd.ttf"]
SEMI = ["C:/Windows/Fonts/seguisb.ttf", "C:/Windows/Fonts/segoeui.ttf", "C:/Windows/Fonts/arial.ttf"]

copy = json.load(open(os.path.join(HERE, "copy.json"), encoding="utf-8"))
os.makedirs(os.path.join(HERE, "final"), exist_ok=True)

for c in copy:
    src = os.path.join(HERE, c["id"] + ".jpeg")
    if not os.path.exists(src):
        print("missing", src); continue
    im = Image.open(src).convert("RGB")
    W, H = im.size
    d = ImageDraw.Draw(im, "RGBA")

    # soft white scrim across the top for headline legibility
    scrim_h = int(H * 0.34)
    for y in range(scrim_h):
        a = int(225 * (1 - y / scrim_h))
        d.line([(0, y), (W, y)], fill=(255, 255, 255, a))

    pad = int(W * 0.07)
    # wordmark
    wf = font(BOLD, int(W * 0.045))
    d.text((pad, int(H * 0.045)), "DinDrift", font=wf, fill=BLUE)
    # blue accent rule
    d.rectangle([pad, int(H*0.045)+int(W*0.07), pad+int(W*0.10), int(H*0.045)+int(W*0.07)+6], fill=BLUE)

    # headline, wrapped
    hf = font(BOLD, int(W * 0.085))
    words = c["headline"].split()
    lines, cur = [], ""
    maxw = W - 2*pad
    for w in words:
        t = (cur + " " + w).strip()
        if d.textlength(t, font=hf) <= maxw: cur = t
        else: lines.append(cur); cur = w
    if cur: lines.append(cur)
    y = int(H * 0.11)
    for ln in lines:
        d.text((pad, y), ln, font=hf, fill=INK)
        y += int(W * 0.10)

    # CTA pill bottom-left
    cf = font(SEMI, int(W * 0.038))
    cta = "Book en gratis snak"
    tw = d.textlength(cta, font=cf)
    px, py = pad, int(H * 0.90)
    pill = [px, py, px + tw + int(W*0.07), py + int(W*0.085)]
    d.rounded_rectangle(pill, radius=int(W*0.045), fill=BLUE)
    d.text((px + int(W*0.035), py + int(W*0.022)), cta, font=cf, fill=WHITE)

    out = os.path.join(HERE, "final", c["id"] + ".jpg")
    im.save(out, "JPEG", quality=90)
    print("wrote", out)
print("done")
