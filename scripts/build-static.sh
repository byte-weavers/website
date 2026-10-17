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

# Rewrite internal PHP links and connect real lead forms to the Google Apps Script backend.
python3 - <<'PY'
from pathlib import Path
import re

site = Path('_site')
endpoint = 'https://script.google.com/macros/s/AKfycbzqNhRLON09P8XsB52IdrEwl7dgxs8REh7g3h40gLXm5NcN43igAcq06IJqGJ3JWzd5Rw/exec'

for path in site.rglob('*.html'):
    text = path.read_text(encoding='utf-8', errors='ignore')
    text = re.sub(
        r'(?i)(href|action)=("|\')([^"\']+?)\.php([?#][^"\']*)?\2',
        lambda m: f'{m.group(1)}={m.group(2)}{m.group(3)}.html{m.group(4) or ""}{m.group(2)}',
        text,
    )

    counter = 0

    def wire_contact_form(match):
        nonlocal_counter = None
        block = match.group(0)
        lower = block.lower()
        # Only touch genuine inquiry/contact forms, not search/newsletter/login forms.
        if not all(f'name="{field}"' in lower or f"name='{field}'" in lower for field in ('name', 'email', 'message')):
            return block

        # Use a stable per-page form number.
        wire_contact_form.count += 1
        idx = wire_contact_form.count
        frame_id = f'bw-contact-frame-{idx}'
        form_id = f'bw-contact-form-{idx}'
        status_id = f'bw-contact-status-{idx}'

        opening_end = block.find('>')
        opening = block[:opening_end + 1]
        body = block[opening_end + 1:-7]  # strip closing </form>

        # Replace/append form attributes while preserving existing classes/name.
        opening = re.sub(r'\saction=("|\')[^"\']*\1', '', opening, flags=re.I)
        opening = re.sub(r'\smethod=("|\')[^"\']*\1', '', opening, flags=re.I)
        opening = re.sub(r'\starget=("|\')[^"\']*\1', '', opening, flags=re.I)
        opening = re.sub(r'\sid=("|\')[^"\']*\1', '', opening, flags=re.I)
        opening = opening[:-1] + (
            f' id="{form_id}" action="{endpoint}" method="post" '
            f'target="{frame_id}" data-byte-weavers-contact="true">'
        )

        hidden = (
            '<input type="hidden" name="formKey" value="byte-weavers-contact-v1">'
            f'<input type="hidden" name="sourcePage" value="{path.name}">'
            '<div style="position:absolute;left:-9999px;top:auto;width:1px;height:1px;overflow:hidden" aria-hidden="true">'
            '<label>Leave this field empty<input type="text" name="_gotcha" tabindex="-1" autocomplete="off"></label>'
            '</div>'
        )

        status = (
            f'<div id="{status_id}" class="bw-contact-status" role="status" aria-live="polite" '
            'style="display:none;margin-top:15px;padding:12px 15px;border-radius:6px"></div>'
            f'<iframe id="{frame_id}" name="{frame_id}" title="Contact form submission" '
            'style="display:none"></iframe>'
        )

        script = f'''<script>
(function() {{
  var form = document.getElementById('{form_id}');
  var frame = document.getElementById('{frame_id}');
  var status = document.getElementById('{status_id}');
  if (!form || !frame || !status) return;

  var submitted = false;
  var submitButton = form.querySelector('button[type="submit"], input[type="submit"]');
  var originalButtonHtml = submitButton ? submitButton.innerHTML : '';

  form.addEventListener('submit', function() {{
    if (!form.checkValidity()) return;
    submitted = true;
    status.style.display = 'block';
    status.style.background = '#eef5ff';
    status.style.color = '#1f3b64';
    status.textContent = 'Sending your inquiry...';
    if (submitButton) {{
      submitButton.disabled = true;
      if (submitButton.tagName === 'BUTTON') submitButton.textContent = 'Sending...';
    }}
  }});

  frame.addEventListener('load', function() {{
    if (!submitted) return;
    submitted = false;
    form.reset();
    status.style.display = 'block';
    status.style.background = '#eaf8ef';
    status.style.color = '#185c2f';
    status.textContent = 'Thank you! Your inquiry has been received. We will get back to you shortly.';
    if (submitButton) {{
      submitButton.disabled = false;
      if (submitButton.tagName === 'BUTTON') submitButton.innerHTML = originalButtonHtml;
    }}
  }});
}})();
</script>'''

        return opening + hidden + body + '</form>' + status + script

    wire_contact_form.count = 0
    text = re.sub(r'(?is)<form\b[^>]*>.*?</form>', wire_contact_form, text)
    path.write_text(text, encoding='utf-8')

# Ensure at least the primary contact form was wired; fail the build if not.
contact = site / 'contact-us.html'
if not contact.exists():
    raise SystemExit('contact-us.html was not generated')
contact_text = contact.read_text(encoding='utf-8', errors='ignore')
if 'data-byte-weavers-contact="true"' not in contact_text:
    raise SystemExit('Primary contact form was not connected to the Apps Script backend')
PY

touch _site/.nojekyll

echo "Static site built successfully."
