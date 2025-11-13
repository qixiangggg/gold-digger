import { addNewTransaction } from "../utils/addNewTransaction.js";
import { generatePDFEvent } from "../utils/generatePDFEvent.js";
import { updateGoldPrice } from "../utils/goldPriceSimulator.js";
import { parseJSONBody } from "../utils/parseJSONBody.js";
import { sendResponse } from "../utils/sendResponse.js";

export async function handlePost(req,res){
    try{
        const parsedBody = await parseJSONBody(req)
        await addNewTransaction(parsedBody)
        sendResponse(res,201, 'application/json', JSON.stringify(parsedBody))
        generatePDFEvent.emit('transaction-added', parsedBody)
        return parsedBody
    }catch(err){
        sendResponse(res,400,'application/json', JSON.stringify({error: err}))
    }
}

export async function handleGoldPrice(req, res){
    res.statusCode = 200
    res.setHeader('Content-Type','text/event-stream')
    res.setHeader('Cache-Control','no-cache')
    res.setHeader('Connection','keep-alive')
    setInterval(() => {
        res.write(
            `data: ${JSON.stringify({
                event: 'gold-price-update',
                goldPrice: updateGoldPrice()
            })}\n\n`
        )
    },3000)
}

export async function handlePDFReady(req, res){
    res.statusCode = 200
    res.setHeader('Content-Type','text/event-stream')
    res.setHeader('Cache-Control','no-cache')
    res.setHeader('Connection','keep-alive')
    const pdfReady = (filePath) => res.write(
        `data: ${JSON.stringify({
            event: 'pdf-ready',
            filePath: filePath
        })}\n\n`
    )
    generatePDFEvent.on("pdf-ready",pdfReady)
}