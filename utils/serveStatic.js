import fs from "node:fs/promises"
import path from "node:path"
import { sendResponse } from "./sendResponse.js"
import { getContentType } from './getContentType.js'
export const serveStatic = async (dirname,req,res) => {
  const publicDir = path.join(dirname, 'public')
  const filepath = path.join(publicDir, req.url === '/' ? 'index.html': req.url)

  try{
    const extname = path.extname(filepath)
    const content = await fs.readFile(filepath)
    sendResponse(res, 200, getContentType(extname), content)
  }catch(err){
    if (err.code === 'ENOENT'){
      const content = await fs.readFile(path.join(publicDir, '404.html'))
      sendResponse(res,404,'text/html',content)
    }else{
      sendResponse(res,500,'text/html',`<html><h1>Server error: ${err.code}</h1></html>`)
    }
  }
}