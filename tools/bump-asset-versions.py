#!/usr/bin/env python3
"""Re-stamp every page's stylesheet and script links with a content hash.

The pages are plain static HTML served straight from GitHub Pages, which
tells browsers to cache assets. A visitor who already has the site can
therefore end up running an old style.css or main.js against freshly
deployed markup, which has broken the layout before. Stamping each URL with
a hash of its file means changed CSS or JS is a different URL, so that
pairing cannot occur.

Run this after editing css/style.css or js/main.js, then commit the HTML
alongside them.
"""

import glob
import hashlib
import io
import re
import sys

ASSETS = [
    ('css/style.css', re.compile(r'<link rel="stylesheet" href="css/style\.css(?:\?v=[0-9a-f]+)?">'),
     '<link rel="stylesheet" href="css/style.css?v={digest}">'),
    ('js/main.js', re.compile(r'<script src="js/main\.js(?:\?v=[0-9a-f]+)?"( defer)?></script>'),
     '<script src="js/main.js?v={digest}"\\1></script>'),
]


def main() -> int:
    stamps = []
    for path, pattern, template in ASSETS:
        digest = hashlib.sha1(io.open(path, 'rb').read()).hexdigest()[:8]
        replacement = template.format(digest=digest)
        for page in sorted(glob.glob('*.html')):
            source = io.open(page, encoding='utf-8').read()
            if len(pattern.findall(source)) != 1:
                print(f'{page}: expected exactly one link to {path}', file=sys.stderr)
                return 1
            updated = pattern.sub(replacement, source)
            if updated != source:
                io.open(page, 'w', encoding='utf-8').write(updated)
        stamps.append(f'{path} -> {digest}')

    print('stamped: ' + ', '.join(stamps))
    return 0


if __name__ == '__main__':
    raise SystemExit(main())
