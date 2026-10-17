#!/usr/bin/env bash
set -euo pipefail

rm -rf _site
mkdir -p _site

# Copy static assets and existing static pages.
for dir in css fonts images js vendor; do
  if [ -d "$dir" ]; then
    cp -a "$dir" "_site/$dir"
  fi
done

find . -maxdepth 1 -type f \( -name '*.html' -o -name '*.txt' -o -name '*.xml' -o -name '*.ico' -o -name '*.png' -o -name '*.jpg' -o -name '*.jpeg' -o -name '*.svg' -o -name '*.webp' \) -exec cp -a {} _site/ \;

# Render top-level PHP content pages to static HTML using the shared PHP includes.
for file in ./*.php; do
  [ -e "$file" ] || continue
  base="$(basename "$file")"
  case "$base" in
    header.php|footer.php|PHPMailer.php|SMTP.php)
      continue
      ;;
  esac

  out="_site/${base%.php}.html"
  php "$file" > "$out"
done

# GitHub Pages expects index.html at the artifact root.
if [ -f _site/index.html ]; then
  :
elif [ -f index1.html ]; then
  cp index1.html _site/index.html
else
  echo 'No index.html could be generated.' >&2
  exit 1
fi

# Rewrite internal links from PHP endpoints to their generated static HTML equivalents.
python3 - <<'PY'
from pathlib import Path
import re

site = Path('_site')
for path in site.rglob('*.html'):
    text = path.read_text(encoding='utf-8', errors='ignore')
    text = re.sub(r'(?i)(href|action)=("|\')([^"\']+?)\.php([?#][^"\']*)?\2',
                  lambda m: f'{m.group(1)}={m.group(2)}{m.group(3)}.html{m.group(4) or ""}{m.group(2)}',
                  text)
    path.write_text(text, encoding='utf-8')

# Static hosting cannot execute contact form POSTs. Keep the form visible but prevent
# misleading POSTs to generated HTML pages until a form backend is connected.
for name in ('index.html', 'contact-us.html'):
    path = site / name
    if not path.exists():
        continue
    text = path.read_text(encoding='utf-8', errors='ignore')
    text = re.sub(r'(?i)<form\b([^>]*?)\saction=("|\')[^"\']*\2([^>]*)>',
                  r'<form\1 action="#"\3 onsubmit="event.preventDefault(); alert(\'Please email us directly while the contact form is being migrated.\');">',
                  text)
    path.write_text(text, encoding='utf-8')
PY

touch _site/.nojekyll

echo "Static site built successfully."
