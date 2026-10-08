# Promo video

`public/saascrm-promo.mp4` (1920×1080, 30fps, ~42s) is generated entirely from code:

| File | What it does |
|------|--------------|
| `scene.html` | The motion design. Every frame is a pure function `render(t)` — open it in a browser to preview it live. |
| `soundtrack.py` | Synthesizes the royalty-free soundtrack (`soundtrack.m4a`) with numpy, synced to the scene cuts. |
| `render.mjs` | Steps `render(t)` frame-by-frame in headless Chromium (Playwright) and pipes frames to ffmpeg. |

```bash
python3 video/soundtrack.py                  # optional: regenerate the music
node video/render.mjs                         # → public/saascrm-promo.mp4
node video/render.mjs --stills 3,12,25,38     # quick PNG previews in video/stills/
```

Requires `ffmpeg` and `playwright` (local or global). To tweak copy, timing or screenshots, edit `scene.html` — the `T` object holds each scene's start/end time.
