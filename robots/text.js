const algorithmiaWikipedia = require('algorithmia');
const algorithmiaSummarizeURL = require('algorithmia');
const algorithmiaApiKey = require('../Credentials/algorithmia.json').apiKey

async function robot(searchContent){
    await fetchContentFromWikipedia(searchContent)

   

    async function fetchContentFromWikipedia(searchContent) {
        
        const portugueseSearchContent = {
            "articleName": searchContent.searchTheme,
            "lang": "pt"
        }
        
        const algorithmiaAuthenticated = algorithmiaWikipedia(algorithmiaApiKey);
        const wikipediaAlgorithm = algorithmiaAuthenticated.algo('web/WikipediaParser/0.1.2');
        const wikipediaResponse = await wikipediaAlgorithm.pipe(portugueseSearchContent);
        const wikipediaContent = wikipediaResponse.get();

        searchContent.sourceContentOriginal = wikipediaContent.content
    }
}

module.exports = robot