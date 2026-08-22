#!/usr/bin/env python3
"""Re-stamp every page's stylesheet link with a hash of the current CSS.

The pages are plain static HTML served straight from GitHub Pages, which
tells browsers to cache assets. A visitor who already has the site can
therefore end up running an old style.css against freshly deployed markup,
which has broken the layout before. Stamping the URL with a content hash
means a changed stylesheet is a different URL, so that pairing cannot occur.

Run this after any edit to css/style.css, then commit the HTML alongside it.
"""

import glob
import hashlib
import io
import re
import sys

CSS = 'css/style.css'
LINK = re.compile(r'<link rel="stylesheet" href="css/style\.css(?:\?v=[0-9a-f]+)?">')


def main() -> int:
    digest = hashlib.sha1(io.open(CSS, 'rb').read()).hexdigest()[:8]
    replacement = f'<link rel="stylesheet" href="{CSS}?v={digest}">'

    changed = []
    for path in sorted(glob.glob('*.html')):
        source = io.open(path, encoding='utf-8').read()
        if len(LINK.findall(source)) != 1:
            print(f'{path}: expected exactly one stylesheet link', file=sys.stderr)
            return 1
        updated = LINK.sub(replacement, source)
        if updated != source:
            io.open(path, 'w', encoding='utf-8').write(updated)
            changed.append(path)

    print(f'css version {digest} — {len(changed)} page(s) updated')
    return 0


if __name__ == '__main__':
    raise SystemExit(main())
