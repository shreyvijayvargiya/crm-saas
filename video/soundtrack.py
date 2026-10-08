"""Synthesizes video/soundtrack.m4a: an ambient pad + soft pulse synced to the scene cuts.

    python3 video/soundtrack.py      (needs numpy + ffmpeg)

Fully generated, so the track is royalty-free and safe to ship in an MIT repo.
"""
import os
import subprocess
import wave

import numpy as np

SR = 44100
DUR = 42.0
CUTS = [4.5, 9.3, 17.5, 22.3, 28.9, 35.3]  # matches the flashes in scene.html
BPM = 100
HERE = os.path.dirname(os.path.abspath(__file__))

t = np.arange(int(SR * DUR)) / SR
midi = lambda n: 440.0 * 2 ** ((n - 69) / 12)

# Am9 → Fmaj7 → Cadd9 → G6, two bars each, looping
CHORDS = [[45, 60, 64, 67, 71], [41, 57, 60, 64, 69], [48, 55, 62, 64, 67], [43, 55, 59, 62, 64]]
bar = 4 * 60 / BPM
chord_len = 2 * bar


def pad():
    out = np.zeros_like(t)
    n = int(np.ceil(DUR / chord_len)) + 1
    for i in range(n):
        start = i * chord_len
        notes = CHORDS[i % len(CHORDS)]
        seg = (t >= start - 0.6) & (t < start + chord_len + 1.2)
        tt = t[seg] - start
        env = np.clip((tt + 0.6) / 1.2, 0, 1) * np.clip((chord_len + 1.2 - tt) / 1.8, 0, 1)
        for k, note in enumerate(notes):
            f = midi(note)
            # three detuned saw-ish partial stacks for width
            for det in (-0.12, 0.0, 0.12):
                ff = f * 2 ** (det / 12)
                ph = 2 * np.pi * ff * tt + k
                tone = np.sin(ph) + 0.35 * np.sin(2 * ph) + 0.12 * np.sin(3 * ph)
                out[seg] += tone * env * (0.5 if note < 50 else 0.18)
    return out


def arp():
    out = np.zeros_like(t)
    step = 60 / BPM / 2  # eighth notes
    i = 0
    while i * step < DUR:
        s = i * step
        chord = CHORDS[int(s // chord_len) % len(CHORDS)]
        note = chord[1:][[0, 2, 1, 3, 2, 1, 3, 2][i % 8]] + 12
        seg = (t >= s) & (t < s + 0.6)
        tt = t[seg] - s
        env = np.exp(-tt * 7) * np.clip(tt / 0.005, 0, 1)
        out[seg] += np.sin(2 * np.pi * midi(note) * tt) * env * 0.16
        i += 1
    # arp sits out the intro, swells in
    return out * np.clip((t - 4.0) / 2.0, 0, 1)


def kick():
    out = np.zeros_like(t)
    beat = 60 / BPM
    i = 0
    while i * beat < DUR:
        s = i * beat
        if 9.0 < s < 39.0:
            seg = (t >= s) & (t < s + 0.4)
            tt = t[seg] - s
            freq = 45 + 90 * np.exp(-tt * 30)
            out[seg] += np.sin(2 * np.pi * np.cumsum(freq) / SR) * np.exp(-tt * 9) * 0.55
        i += 1
    return out


def swells():
    """Reverse-swell whoosh into each cut + soft impact."""
    rng = np.random.default_rng(3)
    noise = rng.standard_normal(len(t))
    # cheap low-pass
    k = 40
    noise = np.convolve(noise, np.ones(k) / k, mode="same")
    out = np.zeros_like(t)
    for c in CUTS:
        rise = np.clip((t - (c - 0.9)) / 0.9, 0, 1) ** 3 * (t < c)
        tail = np.exp(-np.clip(t - c, 0, None) * 6) * (t >= c)
        out += noise * (rise + tail) * 2.2
        seg = (t >= c) & (t < c + 1.2)
        tt = t[seg] - c
        out[seg] += np.sin(2 * np.pi * 55 * tt) * np.exp(-tt * 4) * 0.5
    return out


mix = pad() * 0.22 + arp() + kick() * 0.7 + swells() * 0.5
# master envelope: fade in/out
mix *= np.clip(t / 1.5, 0, 1) * np.clip((DUR - t) / 2.5, 0, 1)
mix = np.tanh(mix * 1.4) / np.tanh(1.4)  # gentle saturation / limiter
mix /= np.max(np.abs(mix)) * 1.12
# stereo: slight delay on right channel for width
d = int(0.012 * SR)
left, right = mix, np.concatenate([np.zeros(d), mix[:-d]])
pcm = (np.stack([left, right], axis=1) * 32767).astype(np.int16)

wav_path = os.path.join(HERE, "soundtrack.wav")
with wave.open(wav_path, "wb") as w:
    w.setnchannels(2)
    w.setsampwidth(2)
    w.setframerate(SR)
    w.writeframes(pcm.tobytes())
subprocess.run(["ffmpeg", "-y", "-loglevel", "error", "-i", wav_path, "-c:a", "aac", "-b:a", "192k",
                os.path.join(HERE, "soundtrack.m4a")], check=True)
os.remove(wav_path)
print("wrote video/soundtrack.m4a")
