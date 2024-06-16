const puppeteer = require('puppeteer');

async function generatePDF(htmlContent, outputPath) {
    try {
        const browser = await puppeteer.launch({
            headless: true, // Set to false to run in non-headless mode for debugging
            args: ['--no-sandbox', '--disable-setuid-sandbox'], // Add more arguments as needed
        });
        const page = await browser.newPage();
        await page.setContent(htmlContent);
        await page.pdf({
            path: outputPath,
            format: 'A4',
            printBackground: true
        });
        console.log('PDF generated successfully:', outputPath);

        await browser.close();
    } catch (error) {
        console.error('Error generating PDF:', error);
    }
}

module.exports = generatePDF;
