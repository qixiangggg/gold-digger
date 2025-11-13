export async function parseJSONBody(req){
    let body = ''
    for await(const payload of req){
        body += payload
    }
    try{
        return JSON.parse(body)
    }catch(err){
        throw new Error(`Invalid JSON format: ${err}`)
    }
}