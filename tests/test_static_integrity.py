import json
import re
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

class ProductionStaticIntegrity(unittest.TestCase):
    def test_manifest_paths(self):
        manifest = json.loads((ROOT / "manifest.webmanifest").read_text(encoding="utf-8"))
        self.assertEqual(manifest["lang"], "vi")
        self.assertTrue((ROOT / manifest["start_url"]).is_file())
        for icon in manifest["icons"]:
            self.assertTrue((ROOT / icon["src"]).is_file(), icon["src"])

    def test_service_worker_precache(self):
        service_worker = (ROOT / "sw.js").read_text(encoding="utf-8")
        shell = service_worker.split("const APP_SHELL = [", 1)[1].split("]", 1)[0]
        paths = re.findall(r"['\"]\./([^'\"]+)['\"]", shell)
        self.assertGreaterEqual(len(paths), 7)
        for rel in paths:
            with self.subTest(path=rel):
                self.assertTrue((ROOT / rel).is_file(), rel)

    def test_local_runtime_scripts_and_css(self):
        php = (ROOT / "index.php").read_text(encoding="utf-8")
        paths = re.findall(r"(?:src|href)=[\"']([^\"']+\.(?:js|css|svg))[\"']", php)
        self.assertGreaterEqual(len(paths), 5)
        for rel in paths:
            if rel.startswith(("http:", "https:", "//")):
                continue
            with self.subTest(path=rel):
                self.assertTrue((ROOT / rel.lstrip("/")).is_file(), rel)

    def test_basic_response_security_headers(self):
        php = (ROOT / "index.php").read_text(encoding="utf-8")
        for header in ["Content-Security-Policy", "X-Content-Type-Options", "X-Frame-Options"]:
            self.assertIn(header, php)
