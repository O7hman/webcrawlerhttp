const {JSDOM} = require('jsdom')

async function crawlPage(currentURL){
    console.log(`Actively crawling: ${currentURL}`)
    try{
        const resp = await fetch(currentURL)
        if(resp.status >399){
            console.log(`error in fetch with status code: ${resp.status} on page: ${currentURL}`)
            return
        }

        const contentType = resp.headers.get('content-type')
        if(!contentType.includes('text/html')){
            console.log(`non html response, content type: ${contentType}, on page: ${currentURL}`)
            return
        }
        console.log(await resp.text())
    }catch(err){
        console.log(`error fetching page ${err.message}`)
    }

}

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
    getURLsFromHTML,
    crawlPage
}