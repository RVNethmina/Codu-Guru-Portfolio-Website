"""Render view-only documents to page images for the in-site viewer.

The original PDFs live in /private (git-ignored) and are never published.
Only the page images in /public/viewer/<slug>/ are deployed, so visitors
can read a document on the site but there is no file to download.

Usage:  python scripts/render-viewer.py            (renders every entry)
        python scripts/render-viewer.py thesis-group (renders one entry)

Requires PyMuPDF and Pillow (pip install pymupdf pillow). Slides are exported
to PDF first (PowerPoint: File > Save As > PDF) and listed here like documents.
"""

import io
import json
import shutil
import sys
from pathlib import Path

import pymupdf
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
PRIVATE = ROOT / "private"
OUT = ROOT / "public" / "viewer"
MANIFEST = ROOT / "src" / "data" / "viewer-pages.json"

# slug -> (source PDF relative to /private, rendered width in px)
SOURCES = {
    "topic-assessment": ("docs/topic-assessment-form.pdf", 1100),
    "proposal-nethmina": ("docs/proposals/R26-SE-036_IT22253958_Nethmina W P R.pdf", 1100),
    "proposal-madurapperuma": ("docs/proposals/R26-SE-036_IT22230942_Madurapperuma H A S I.pdf", 1100),
    "proposal-aron": ("docs/proposals/R26-SE-036_IT22203380_Aaron Charles J.pdf", 1100),
    "research-paper": ("../public/docs/Code-Guru-Research-Paper.pdf", 1100),
    "thesis-group": ("docs/thesis/R26-SE-036.pdf", 1100),
    "thesis-nethmina": ("docs/thesis/IT22253958.pdf", 1100),
    "slides-proposal": ("presentations/R26-SE-036_Proposal_Presentation.pdf", 1280),
    "slides-pp1": ("presentations/R26-SE-036_PP1-Presentation.pdf", 1280),
    "slides-pp2": ("presentations/R26-SE-036_PP2-Presentation.pdf", 1280),
}


def render(slug: str, source: str, width: int) -> dict:
    doc = pymupdf.open(PRIVATE / source)
    target = OUT / slug
    shutil.rmtree(target, ignore_errors=True)
    target.mkdir(parents=True)

    size = None
    for i, page in enumerate(doc, start=1):
        zoom = width / page.rect.width
        pix = page.get_pixmap(matrix=pymupdf.Matrix(zoom, zoom), alpha=False)
        img = Image.open(io.BytesIO(pix.tobytes("png")))
        img.save(target / f"{i}.webp", "WEBP", quality=72, method=6)
        size = size or img.size

    total = sum(f.stat().st_size for f in target.iterdir()) / 1e6
    print(f"{slug}: {doc.page_count} pages, {total:.1f} MB")
    return {"pages": doc.page_count, "width": size[0], "height": size[1]}


def main() -> None:
    only = sys.argv[1:]
    manifest = json.loads(MANIFEST.read_text()) if MANIFEST.exists() else {}
    for slug, (source, width) in SOURCES.items():
        if not only or slug in only:
            manifest[slug] = render(slug, source, width)
    manifest = {k: manifest[k] for k in SOURCES if k in manifest}
    MANIFEST.write_text(json.dumps(manifest, indent=2) + "\n")


if __name__ == "__main__":
    main()
