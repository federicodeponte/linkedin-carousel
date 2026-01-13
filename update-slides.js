const fs = require('fs');
const path = require('path');

// Read the HTML
let html = fs.readFileSync(path.join(__dirname, 'slides.html'), 'utf8');

// Image mapping - slide class to image file
const imageMap = {
  'slide-4': 'openword.png',   // openletter -> openword visual
  'slide-5': 'opendraft.png',
  'slide-6': 'openfigma.png', 
  'slide-7': 'openblog.png',
  'slide-8': 'openkeyword.png',
  'slide-9': 'openinvoice.png'
};

// For each slide, replace the example-content with an image
Object.entries(imageMap).forEach(([slideClass, imgFile]) => {
  // Find the example-content div for this slide and replace its contents
  const regex = new RegExp(
    '(<div class="slide ' + slideClass + ' tool-slide">.*?<div class="example-content">)(.*?)(</div>\s*</div>\s*(?:<div class="templates-row">|<span class="slide-number">))',
    's'
  );
  
  const imgTag = '<img src="visuals/' + imgFile + '" class="real-output-img" style="width:100%; height:auto; max-height:700px; object-fit:contain; border-radius:12px;">';
  
  html = html.replace(regex, '\n                ' + imgTag + '\n            ');
});

// Write the updated HTML
fs.writeFileSync(path.join(__dirname, 'slides.html'), html);
console.log('Updated slides.html with embedded images');
