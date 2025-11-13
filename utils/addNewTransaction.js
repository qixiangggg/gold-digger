import fs from "node:fs/promises"
import path from "node:path"
import { getData } from "./getData.js"
export const addNewTransaction = async (payload) => {
    try{
        const existingData = await getData()
        existingData.push( `${payload.transactionTime}, amount paid: £${payload.investmentAmount}, price per Oz: £${payload.pricePerOz}, gold sold: ${payload.goldSold} Oz`)
        const filePath = path.join('data','purchasedData.txt')
        await fs.writeFile(filePath, existingData.join("\n"),'utf8')
    }catch(err){
        console.error(err)
    }
}