const {JSDOM} = require('jsdom')

function getURLsFromHTML(htmlBody, BaseURL){
    const urls = []
    const dom = new JSDOM(htmlBody)
    const urlsFromHTML = dom.window.document.querySelectorAll('a')
    for(let url of urlsFromHTML){
        if(url.href.slice(0,1) === '/'){
            //relative
            try{
                const urlObject = new URL(`${BaseURL}${url.href}`)
                urls.push(urlObject.href)
            }catch (err){
                console.log(`There was an error with relative URL: ${err.message}`)
            }
        }else{
            //absolute
            try{
                const urlObject = new URL(url.href)
                urls.push(urlObject.href)
            }catch (err){
                console.log(`There was an erro with absolute URL: ${err.message}`)
            }
        }
    }
    return urls
}

function normalizeURL(urlString){
    const urlObject = new URL(urlString)
    const urlOutput = `${urlObject.hostname}${urlObject.pathname}` 
 
    if(urlOutput.length>0 && urlOutput.slice(-1)==='/'){
        return urlOutput.slice(0,-1) 
    }
    return urlOutput
}

module.exports = {
    normalizeURL,
    getURLsFromHTML
}