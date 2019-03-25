const algorithmiaWikipedia = require('algorithmia');
const algorithmiaSummarizeURL = require('algorithmia');
const algorithmiaApiKey = require('../Credentials/algorithmia.json').apiKey;
const docx = require('docx');
const fileSystem = require('fs');

const state = require('./state.js');

async function robot(){
    const searchContent = state.load();

    await fetchContentFromWikipedia(searchContent);
    await summarizeWikipediaContet(searchContent);
    generateDocx(searchContent);

    state.save(searchContent);


    async function fetchContentFromWikipedia(searchContent) {
        
        const portugueseSearchContent = {
            "articleName": searchContent.searchTheme,
            "lang": "pt"
        };
        
        const algorithmiaAuthenticated = algorithmiaWikipedia(algorithmiaApiKey);
        const wikipediaAlgorithm = algorithmiaAuthenticated.algo('web/WikipediaParser/0.1.2');
        const wikipediaResponse = await wikipediaAlgorithm.pipe(portugueseSearchContent);
        const wikipediaContent = wikipediaResponse.get();

        searchContent.sourceContentOriginal = wikipediaContent.content;
        searchContent.urlWikipedia = wikipediaContent.url;
    }

    async function summarizeWikipediaContet(searchContent){
        var urlSearchContent = searchContent.urlWikipedia;
        urlSearchContent = String(urlSearchContent);

        const algorithmiaAuthenticated = algorithmiaSummarizeURL(algorithmiaApiKey);
        const summarizeAlgorithm = algorithmiaAuthenticated.algo('nlp/SummarizeURL/0.1.4');
        const summarizeResponse = await summarizeAlgorithm.pipe(urlSearchContent,searchContent.numberOfSentences);
        const summarizedContent = summarizeResponse.get();

        searchContent.summarizedContent = summarizedContent
    }

    function generateDocx(searchContent){
        const doc = new docx.Document();
        const paragraph = new docx.Paragraph(searchContent.summarizedContent);
        doc.addParagraph(paragraph);
        const fileName = String(searchContent.searchTheme) + '.docx';
        const packer = new docx.Packer();
        
        try {
            packer.toBuffer(doc).then((buffer) => {
                fileSystem.writeFileSync(fileName, buffer)
                
            });
        } catch (error) {
            console.log("Something went wrong and your file was not created.");
        }
        
    }
}

module.exports = robot