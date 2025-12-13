import { chromium } from 'playwright';
import { pathToFileURL } from 'node:url';

const fileUrl = pathToFileURL('/workspace/index.html').toString();

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 720 } });

await page.goto(fileUrl, { waitUntil: 'load' });
await page.waitForTimeout(250);
await page.screenshot({ path: '/workspace/preview-1.png', fullPage: true });

// Let the page advance into the fade cycle.
await page.waitForTimeout(4200);
await page.screenshot({ path: '/workspace/preview-2.png', fullPage: true });

await browser.close();
