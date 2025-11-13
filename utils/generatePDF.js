import PDFDocument from "pdfkit"
import fs from "node:fs"
import path from "node:path"
import fsp from "node:fs/promises"

export async function generatePDF(parsedBody){
    const outDir = path.join(process.cwd(), "public", "pdfs");
    await fsp.mkdir(outDir, { recursive: true });

    const safeTs = new Date().toISOString().replace(/[:.]/g, "-");
    const id = Date.now(); // numeric timestamp, always unique enough
    const filename = `receipt-${safeTs}-${id}.pdf`;
    const outPath = path.join(outDir, filename);
    const publicPath = `pdfs/${filename}`;

    return new Promise((resolve,reject) => {
        

        const doc = new PDFDocument({ size:"A4" })
        const stream = fs.createWriteStream(outPath)

        stream.on("finish", () => resolve(publicPath));
        stream.on("error", reject);
        doc.on("error", reject);

        doc.pipe(stream)

        doc.fontSize(24).text("Gold Purchase Receipt", {
            align: "center"
        })
        doc.moveDown(2)

        doc.text(`Transaction Time: ${parsedBody.transactionTime}`)
        doc.text(`Amount Paid: £${parsedBody.investmentAmount}`)
        doc.text(`Price per Oz: £${parsedBody.pricePerOz}`)
        doc.text(`Gold Purchased: ${parsedBody.goldSold}Oz`)

        doc.moveDown()
        doc.fontSize(10).fillColor("gray")
        doc.text("This is an automatically generated receipt.",{
            align: "center"
        })
        doc.end()     
    })
}
