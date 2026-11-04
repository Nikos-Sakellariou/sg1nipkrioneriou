import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const { chromium } = require('C:\\Users\\Giannis\\.cache\\codex-runtimes\\codex-primary-runtime\\dependencies\\node\\node_modules\\playwright');
const browser = await chromium.launch({
  executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  headless: true,
});

for (const [width, height, name, isMobile] of [
  [1440, 900, 'desktop.png', false],
  [390, 844, 'mobile.png', true],
]) {
  const context = await browser.newContext({ viewport: { width, height }, isMobile });
  const page = await context.newPage();
  await page.goto('http://127.0.0.1:4173/', { waitUntil: 'networkidle' });
  await page.evaluate(async () => {
    await document.fonts.ready;
    scrollTo(0, document.documentElement.scrollHeight);
    scrollTo(0, 0);
  });
  await page.screenshot({ path: new URL(`./review/${name}`, import.meta.url).pathname.slice(1), fullPage: true });
  await context.close();
}

await browser.close();
