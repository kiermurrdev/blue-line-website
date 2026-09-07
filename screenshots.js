
const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  
  const breakpoints = [
    { name: 'mobile-375', width: 375, height: 812 },
    { name: 'tablet-768', width: 768, height: 1024 },
    { name: 'desktop-1280', width: 1280, height: 900 },
  ];
  
  for (const bp of breakpoints) {
    const page = await browser.newPage({ viewport: bp });
    await page.goto('http://localhost:3000');
    // Wait for fonts to load
    await page.waitForTimeout(2000);
    await page.screenshot({ path: `./screenshots/${bp.name}.png`, fullPage: false });
    console.log(`Screenshot: ${bp.name} (${bp.width}x${bp.height})`);
    await page.close();
  }
  
  await browser.close();
})();
