const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  
  // Set viewport to slide dimensions
  await page.setViewport({ width: 1080, height: 1350, deviceScaleFactor: 2 });
  
  // Load the HTML file
  const htmlPath = path.join(__dirname, 'slides.html');
  await page.goto('file://' + htmlPath, { waitUntil: 'networkidle0' });
  
  // Wait for fonts to load
  await page.evaluate(() => document.fonts.ready);
  await new Promise(r => setTimeout(r, 2000));
  
  // Create exports directory
  const exportDir = path.join(__dirname, 'exports');
  if (!fs.existsSync(exportDir)) {
    fs.mkdirSync(exportDir);
  }
  
  // Get all slides
  const slides = await page.$$('.slide');
  console.log('Found ' + slides.length + ' slides');
  
  // Screenshot each slide
  for (let i = 0; i < slides.length; i++) {
    const slide = slides[i];
    const filename = path.join(exportDir, 'slide-' + String(i + 1).padStart(2, '0') + '.png');
    
    await slide.screenshot({ path: filename, type: 'png' });
    console.log('Exported: ' + filename);
  }
  
  await browser.close();
  console.log('Done! Exported ' + slides.length + ' slides to exports/');
})();
