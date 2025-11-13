import fs from "node:fs/promises"
import path from "node:path"
export const getData = async () => {
    const filepath = path.join("data","purchasedData.txt")
    const data = await fs.readFile(filepath, 'utf8')
    const splittedData = data.split(/\r?\n/)
    return splittedData
}