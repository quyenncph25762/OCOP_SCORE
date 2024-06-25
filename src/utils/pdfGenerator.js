const puppeteer = require('puppeteer');
const path = require('path');
const htmlDocx = require('html-docx-js');
const fs = require('fs');
async function generatePDF(htmlContent, nameFile, res) {
    try {
        const browser = await puppeteer.launch({
            headless: true, // Set to false to run in non-headless mode for debugging
            args: ['--no-sandbox', '--disable-setuid-sandbox'], // Add more arguments as needed
        });

        const page = await browser.newPage();
        await page.setContent(htmlContent, { waitUntil: 'networkidle0' });
        await page.emulateMediaType('screen');
        await page.pdf(
            {
                format: 'A4',
              
                margin: {
                    bottom: '2cm',
                    top: '2cm',
                    left: '3cm',
                    right: '3cm',
                }
            }
        );
        await browser.close();
        // Chuyển đổi HTML sang DOCX bằng html-docx-js
        const docxBuffer = htmlDocx.asBlob(htmlContent);
        // Chuyển đổi Blob thành Buffer
        const arrayBuffer = await docxBuffer.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        // Lưu buffer DOCX thành tệp
        const outputPath = path.join(__dirname, 'output.docx');
        fs.writeFileSync(outputPath, buffer);

        // Gửi file DOCX cho người dùng tải về
        res.download(outputPath, `${nameFile}`, (err) => {
            if (err) {
                console.error(err);
            }
            // Xóa file sau khi gửi
            fs.unlinkSync(outputPath);
        });

    } catch (error) {
        console.error('Error generating PDF:', error);
    }
}

module.exports = generatePDF;
