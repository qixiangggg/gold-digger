import {EventEmitter} from "node:events"
import { generatePDF } from "./generatePDF.js"
import path from "node:path"

export const generatePDFEvent = new EventEmitter()
generatePDFEvent.on("transaction-added", async (parsedBody) => {
    const filePath = await generatePDF(parsedBody)
    generatePDFEvent.emit("pdf-ready", filePath)
})