const puppeteer = require('puppeteer');
const fs = require('fs');
const randomString = require('../random');

async function htmlToPdf(htmlContent) {
    const browser = await puppeteer.launch({headless : true});
    const page = await browser.newPage();
  
    // Set the page content from the custom HTML content
    await page.setContent(htmlContent, { waitUntil: 'networkidle0' });
  
    // Generate the PDF as a buffer
    const pdfBuffer = await page.pdf({ format: 'a4',omitBackground:true ,landscape: true});
    const fileName = randomString(12);
    const pdfPath = `public/Cert${fileName}.pdf`;

    // Save the PDF buffer to a file
    fs.writeFileSync(pdfPath, pdfBuffer);
    const fileStream = fs.createReadStream(pdfPath);
    // Close the browser
    await browser.close();
  
    return {file :fileStream,fileName : `Cert${fileName}.pdf`};
}

function bufferToBase64(buffer) {
    return buffer.toString('base64');
  }

module.exports = htmlToPdf;