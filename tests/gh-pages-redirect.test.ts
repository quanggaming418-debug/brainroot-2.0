import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import vm from 'node:vm';

const GATEWAY_DIR = path.resolve(process.cwd(), 'github-pages-redirect');
const TARGET_ORIGIN = 'https://brainroot-55i.pages.dev';

function extractInlineScript(fileName: string): string {
  const html = fs.readFileSync(path.join(GATEWAY_DIR, fileName), 'utf8');
  const match = html.match(/<script>([\s\S]*?)<\/script>/);
  assert.ok(match, `${fileName} must include inline redirect script`);
  return match[1];
}

function runRedirect(fileName: string, inputUrl: string): string | null {
  const script = extractInlineScript(fileName);
  const parsed = new URL(inputUrl);
  let redirectedTo: string | null = null;

  const sandbox = {
    URL,
    window: {
      location: {
        origin: parsed.origin,
        pathname: parsed.pathname,
        search: parsed.search,
        hash: parsed.hash,
        replace(nextUrl: string) {
          redirectedTo = nextUrl;
        },
      },
    },
  };

  vm.runInNewContext(script, sandbox);
  return redirectedTo;
}

test('BR-T046: redirect gateway artifact contains only index.html, 404.html, and .nojekyll', () => {
  const entries = fs.readdirSync(GATEWAY_DIR).sort();
  assert.deepEqual(entries, ['.nojekyll', '404.html', 'index.html']);

  for (const fileName of ['index.html', '404.html']) {
    const html = fs.readFileSync(path.join(GATEWAY_DIR, fileName), 'utf8');
    assert.match(html, /<noscript>[\s\S]*https:\/\/brainroot-55i\.pages\.dev\//);
    assert.ok(!html.includes('internal-data'), `${fileName} must not reference internal-data`);
  }
});

test('BR-T046: maps root, routes, trailing slashes, query, hash, and encoded paths accurately', () => {
  const cases: Array<[string, string, string]> = [
    ['index.html', 'https://quanggaming418-debug.github.io/brainroot-2.0/', `${TARGET_ORIGIN}/`],
    ['index.html', 'https://quanggaming418-debug.github.io/brainroot-2.0', `${TARGET_ORIGIN}/`],
    ['404.html', 'https://quanggaming418-debug.github.io/brainroot-2.0/games', `${TARGET_ORIGIN}/games`],
    ['404.html', 'https://quanggaming418-debug.github.io/brainroot-2.0/games/', `${TARGET_ORIGIN}/games/`],
    ['404.html', 'https://quanggaming418-debug.github.io/brainroot-2.0/games/fact-act/play', `${TARGET_ORIGIN}/games/fact-act/play`],
    ['404.html', 'https://quanggaming418-debug.github.io/brainroot-2.0/games/o-an-quan-xanh', `${TARGET_ORIGIN}/games/o-an-quan-xanh`],
    ['404.html', 'https://quanggaming418-debug.github.io/brainroot-2.0/games/o-an-quan-xanh/play', `${TARGET_ORIGIN}/games/o-an-quan-xanh/play`],
    ['404.html', 'https://quanggaming418-debug.github.io/brainroot-2.0/learn?tab=quiz#start', `${TARGET_ORIGIN}/learn?tab=quiz#start`],
    ['404.html', 'https://quanggaming418-debug.github.io/brainroot-2.0/quest', `${TARGET_ORIGIN}/quest`],
    ['404.html', 'https://quanggaming418-debug.github.io/brainroot-2.0/connect', `${TARGET_ORIGIN}/connect`],
    ['404.html', 'https://quanggaming418-debug.github.io/brainroot-2.0/about', `${TARGET_ORIGIN}/about`],
    ['404.html', 'https://quanggaming418-debug.github.io/brainroot-2.0/unknown/deep-link?a=1&b=2#sec', `${TARGET_ORIGIN}/unknown/deep-link?a=1&b=2#sec`],
    ['404.html', 'https://quanggaming418-debug.github.io/brainroot-2.0/path%20with%20space/%C3%B4-%C4%83n-quan?q=n%C6%B0%E1%BB%9Bc#m%E1%BB%A5c', `${TARGET_ORIGIN}/path%20with%20space/%C3%B4-%C4%83n-quan?q=n%C6%B0%E1%BB%9Bc#m%E1%BB%A5c`],
    ['404.html', 'https://quanggaming418-debug.github.io/brainroot-2.0/nested/brainroot-2.0/keep', `${TARGET_ORIGIN}/nested/brainroot-2.0/keep`],
  ];

  for (const [fileName, inputUrl, expected] of cases) {
    assert.equal(runRedirect(fileName, inputUrl), expected, `Failed for ${inputUrl}`);
  }
});

test('BR-T046: prevents open redirects and redirect loops', () => {
  const openRedirectAttempts = [
    'https://quanggaming418-debug.github.io/brainroot-2.0//evil.example/phish',
    'https://quanggaming418-debug.github.io/brainroot-2.0///evil.example/phish',
    'https://quanggaming418-debug.github.io/brainroot-2.0/%5Cevil.example',
    'https://quanggaming418-debug.github.io/brainroot-2.0/@evil.example',
    'https://quanggaming418-debug.github.io/brainroot-2.0/https://evil.example',
  ];

  for (const attempt of openRedirectAttempts) {
    const result = runRedirect('404.html', attempt);
    assert.ok(result, `Expected redirect for ${attempt}`);
    assert.equal(new URL(result).origin, TARGET_ORIGIN, `Origin escaped for ${attempt} -> ${result}`);
  }

  // Must not redirect if already on destination origin (prevents redirect loop)
  assert.equal(runRedirect('index.html', `${TARGET_ORIGIN}/`), null);
  assert.equal(runRedirect('404.html', `${TARGET_ORIGIN}/games/o-an-quan-xanh/play`), null);
});
