import http from "node:http"
import fs from "node:fs/promises"
import path from "node:path"
import { sendResponse } from "./utils/sendResponse.js"
import { serveStatic } from "./utils/serveStatic.js"
import { handleGoldPrice, handlePDFReady, handlePost } from "./handlers/routeHandlers.js"
const PORT = 8000

const __dirname = import.meta.dirname

const server = http.createServer(async (req, res) =>{
    if(req.url === "/api"){
      if(req.method === 'POST'){
        return await handlePost(req,res)
      }
    } else if(req.url === '/api/goldPrice'){
      return await handleGoldPrice(req, res)
    }else if (req.url === '/api/purchasedRecipe'){
      return await handlePDFReady(req, res)
    }
    if (!req.url.startsWith("/api")){
      return await serveStatic(__dirname, req, res)
    }  
    
    
  }
)

server.listen(PORT, () => console.log(`Connected on port: ${PORT}`))