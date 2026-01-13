const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

async function screenshotHTML(page, filename, outputName) {
  const filePath = path.join(__dirname, filename);
  await page.goto('file://' + filePath, { waitUntil: 'networkidle0' });
  await page.setViewport({ width: 800, height: 600, deviceScaleFactor: 2 });
  await page.screenshot({ path: path.join(__dirname, outputName), type: 'png' });
  console.log('Created: ' + outputName);
}

async function screenshotJSON(page, jsonFile, outputName, title) {
  const jsonPath = path.join(__dirname, jsonFile);
  const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
  
  const html = `
  <!DOCTYPE html>
  <html>
  <head>
    <style>
      body { 
        font-family: 'SF Mono', Monaco, monospace; 
        background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); 
        color: #e2e8f0; 
        padding: 40px; 
        margin: 0;
      }
      .title { 
        color: #a78bfa; 
        font-size: 24px; 
        margin-bottom: 20px; 
        font-weight: 600;
      }
      pre { 
        background: rgba(0,0,0,0.3); 
        padding: 20px; 
        border-radius: 12px; 
        font-size: 12px; 
        overflow: hidden;
        border: 1px solid rgba(168, 139, 250, 0.3);
      }
    </style>
  </head>
  <body>
    <div class="title">${title}</div>
    <pre>${JSON.stringify(data, null, 2).slice(0, 2000)}</pre>
  </body>
  </html>`;
  
  await page.setContent(html);
  await page.setViewport({ width: 800, height: 600, deviceScaleFactor: 2 });
  await page.screenshot({ path: path.join(__dirname, outputName), type: 'png' });
  console.log('Created: ' + outputName);
}

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  
  // Screenshot HTML blog article
  await screenshotHTML(page, 'openblog.html', 'openblog.png');
  
  // Screenshot JSON files with styled wrappers
  await screenshotJSON(page, 'openkeyword.json', 'openkeyword.png', 'openkeyword / SEO Research Output');
  await screenshotJSON(page, 'openinvoice.json', 'openinvoice.png', 'openinvoice / Invoice Extraction');
  
  await browser.close();
  console.log('Done!');
})();
