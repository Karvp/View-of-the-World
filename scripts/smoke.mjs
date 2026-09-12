import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";

const root = path.resolve(import.meta.dirname, "..");
const src = path.join(root, "src");

const required = [
  "index.html",
  "style.css",
  "app.js",
  "manifest.webmanifest",
  "sw.js",
  path.join("assets", "icon.svg")
];

for (const file of required) {
  const full = path.join(src, file);
  if (!fs.existsSync(full)) throw new Error(`Missing required file: src/${file}`);
}

const html = fs.readFileSync(path.join(src, "index.html"), "utf8");
const js = fs.readFileSync(path.join(src, "app.js"), "utf8");
const css = fs.readFileSync(path.join(src, "style.css"), "utf8");

const requiredIds = [
  "mainContent",
  "homeScreen",
  "playScreen",
  "progressScreen",
  "settingsScreen",
  "gameArea",
  "hintBtn",
  "pauseModal",
  "packsScreen",
  "packForm",
  "communicationModal",
  "switchScanningSetting"
];

for (const id of requiredIds) {
  if (!html.includes(`id="${id}"`)) throw new Error(`Missing required DOM id: ${id}`);
}

const ids = [...html.matchAll(/\sid="([^"]+)"/g)].map((match) => match[1]);
const duplicateIds = [...new Set(ids.filter((id, index) => ids.indexOf(id) !== index))];
if (duplicateIds.length) throw new Error(`Duplicate DOM IDs: ${duplicateIds.join(", ")}`);

if (!html.includes('data-activity="classify"')) throw new Error("Categorization activity card missing.");
if ((html.match(/data-comm=/g) || []).length < 6) throw new Error("Quick communication board is incomplete.");

new vm.Script(js, { filename: "src/app.js" });

const runtimeSource = [html, js, css, fs.readFileSync(path.join(src, "sw.js"), "utf8")].join("\n");
const externalUrls = runtimeSource.match(/https?:\/\/[^\s"'`)]+/g) || [];
if (externalUrls.length) {
  throw new Error(`Runtime contains third-party URLs: ${externalUrls.join(", ")}`);
}

const manifest = JSON.parse(fs.readFileSync(path.join(src, "manifest.webmanifest"), "utf8"));
if (!manifest.name || !manifest.start_url) throw new Error("Manifest is incomplete.");

console.log("✓ Required files present");
console.log("✓ Browser JavaScript parses");
console.log("✓ Required UI anchors present");
console.log("✓ v2.2 communication, content-studio, and categorization anchors present");
console.log("✓ No duplicate static DOM IDs");
console.log("✓ No third-party runtime HTTP URLs");
console.log("✓ Manifest parses");
