// Renders video/scene.html frame-by-frame with headless Chromium and encodes an MP4 with ffmpeg.
//
//   node video/render.mjs                    → public/saascrm-promo.mp4 (1920x1080, 30fps)
//   node video/render.mjs --stills 2,6,12    → PNG stills to video/stills/ for quick checks
//
// Requires: playwright (npm i -D playwright, or a global install) and ffmpeg on PATH.
import { spawn } from "node:child_process";
import { createRequire } from "node:module";
import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const args = process.argv.slice(2);
const arg = (name, def) => {
	const i = args.indexOf(`--${name}`);
	return i === -1 ? def : args[i + 1];
};

const FPS = Number(arg("fps", 30));
const OUT = path.resolve(root, arg("out", "public/saascrm-promo.mp4"));
const STILLS = arg("stills", null);

function loadPlaywright() {
	const require = createRequire(import.meta.url);
	try {
		return require("playwright");
	} catch {
		const globalRoot = execSync("npm root -g").toString().trim();
		return require(path.join(globalRoot, "playwright"));
	}
}

const { chromium } = loadPlaywright();
const browser = await chromium.launch({
	executablePath: process.env.CHROMIUM_PATH || undefined,
	args: ["--force-color-profile=srgb", "--font-render-hinting=none"],
});
const page = await browser.newPage({ viewport: { width: 1920, height: 1080 }, deviceScaleFactor: 1 });
await page.goto(pathToFileURL(path.join(__dirname, "scene.html")).href + "?capture");
await page.evaluate(() => document.fonts.ready);
await page.waitForLoadState("networkidle");
const duration = await page.evaluate(() => window.DURATION);

if (STILLS) {
	const dir = path.join(__dirname, "stills");
	fs.mkdirSync(dir, { recursive: true });
	for (const s of STILLS.split(",").map(Number)) {
		await page.evaluate((t) => window.render(t), s);
		await page.screenshot({ path: path.join(dir, `t${String(s).replace(".", "_")}.png`) });
		console.log("still", s);
	}
	await browser.close();
	process.exit(0);
}

const frames = Math.round(duration * FPS);
const audio = path.join(__dirname, "soundtrack.m4a");
const hasAudio = fs.existsSync(audio);
const ff = spawn(
	"ffmpeg",
	[
		"-y", "-loglevel", "error",
		"-f", "image2pipe", "-framerate", String(FPS), "-c:v", "mjpeg", "-i", "-",
		...(hasAudio ? ["-i", audio, "-c:a", "aac", "-b:a", "160k", "-shortest"] : []),
		"-c:v", "libx264", "-preset", "slow", "-crf", "20", "-pix_fmt", "yuv420p",
		"-movflags", "+faststart", OUT,
	],
	{ stdio: ["pipe", "inherit", "inherit"] },
);

const started = Date.now();
for (let i = 0; i < frames; i++) {
	await page.evaluate((t) => window.render(t), i / FPS);
	const buf = await page.screenshot({ type: "jpeg", quality: 95 });
	if (!ff.stdin.write(buf)) await new Promise((r) => ff.stdin.once("drain", r));
	if (i % FPS === 0) process.stdout.write(`\rframe ${i}/${frames}  (${((Date.now() - started) / 1000).toFixed(0)}s)`);
}
ff.stdin.end();
await new Promise((r) => ff.on("close", r));
await browser.close();
console.log(`\nwrote ${path.relative(root, OUT)}`);
