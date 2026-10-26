"""Local HTTP smoke test for the production PHP site (standard library only)."""
from __future__ import annotations
import json
import os
from pathlib import Path
import shutil
import socket
import subprocess
import time
from urllib.request import urlopen

ROOT = Path(__file__).resolve().parents[1]


def main():
    php = os.getenv("PHP_BINARY") or shutil.which("php")
    if not php or not Path(php).is_file():
        raise SystemExit("PHP CLI is required for HTTP verification")
    for rel in ("index.php", "manifest.php"):
        subprocess.run([php, "-l", str(ROOT / rel)], cwd=ROOT, check=True, capture_output=True)
    with socket.socket() as sock:
        sock.bind(("127.0.0.1", 0))
        port = sock.getsockname()[1]
    server = subprocess.Popen(
        [php, "-S", "127.0.0.1:" + str(port), "-t", str(ROOT)],
        cwd=ROOT, stdin=subprocess.DEVNULL,
        stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL,
    )
    base = "http://127.0.0.1:" + str(port) + "/"
    try:
        for attempt in range(45):
            if server.poll() is not None:
                raise RuntimeError("PHP server exited during startup")
            try:
                with urlopen(base + "index.php", timeout=2) as response:
                    page = response.read(200000).decode("utf-8", errors="replace")
                    assert response.status == 200
                    assert "text/html" in response.headers["Content-Type"]
                    assert response.headers["X-Frame-Options"] == "DENY"
                    assert response.headers.get("Content-Security-Policy")
                    assert 'lang="vi"' in page
                break
            except OSError:
                time.sleep(0.15)
        else:
            raise RuntimeError("PHP server did not accept HTTP requests")
        for route in ("manifest.php", "manifest.webmanifest", "assets/icon.svg", "app.js", "sw.js", "style.css"):
            with urlopen(base + route, timeout=5) as response:
                body = response.read(1000000)
                assert response.status == 200 and len(body) > 30, route
                if route == "manifest.php":
                    assert json.loads(body.decode("utf-8"))["lang"] == "vi"
        print("PHP production HTTP smoke passed (7 endpoints, security headers, manifest).")
    finally:
        server.terminate()
        try:
            server.wait(timeout=4)
        except subprocess.TimeoutExpired:
            server.kill()
            server.wait(timeout=4)


if __name__ == "__main__":
    main()
