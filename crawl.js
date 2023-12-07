function normalizeURL(urlString){
    const urlObject = new URL(urlString)
    const urlOutput = `${urlObject.hostname}${urlObject.pathname}` 
 
    if(urlOutput.length>0 && urlOutput.slice(-1)==='/'){
        return urlOutput.slice(0,-1) 
    }
    return urlOutput
}

module.exports = {
    normalizeURL 
}