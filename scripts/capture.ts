import puppeteer from 'puppeteer';
import * as fs from 'fs';
import * as path from 'path';

const ROUTES = [
  { path: '/', name: '01-home-16-9' },
  { path: '/games', name: '02-green-play-catalog-16-9' },
  { path: '/games/fact-act', name: '03-fact-act-detail-16-9' },
  { path: '/games/fact-act/play', name: '04-fact-act-trial-16-9' },
  { path: '/games/o-an-quan-xanh', name: '05-o-an-quan-detail-16-9' },
  { path: '/?preview=oanquan3d', name: '06-o-an-quan-3d-sandbox-16-9' },
  { path: '/quest', name: '07-green-quest-16-9' },
  { path: '/learn', name: '08-green-learn-16-9' },
  { path: '/connect', name: '09-green-connect-16-9' },
  { path: '/about', name: '10-about-brainroot-16-9' }
];

async function main() {
  const outputDir = path.resolve(process.cwd(), 'public/screenshots-16-9');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  console.log('Launching Puppeteer browser for fast 16:9 capture...');
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });

  const baseUrl = 'http://localhost:3000';

  for (const r of ROUTES) {
    const url = `${baseUrl}${r.path}`;
    console.log(`Capturing ${r.name} at ${url}...`);
    try {
      await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 10000 });
      await new Promise(resolve => setTimeout(resolve, 1500));
      const filePath = path.join(outputDir, `${r.name}.png`);
      await page.screenshot({ path: filePath, fullPage: false });
      console.log(`Saved: ${filePath}`);
    } catch (err) {
      console.error(`Failed ${r.path}:`, err);
    }
  }

  await browser.close();
  console.log('All 16:9 screenshots captured successfully in /public/screenshots-16-9/');
}

main().catch(console.error);
