const readLine = require('readline-sync');
const state = require('./state.js');

function robot(){
    const searchContent = {};

    searchContent.searchTheme = askAndReturnSearchTheme();
    searchContent.numberOfSentences = askAndReturnNumberOfSentences();
    state.save(searchContent);

    function askAndReturnNumberOfSentences(){
        return readLine.question('Type the number of sentences to summarize: ');
    }

    function askAndReturnSearchTheme(){
        return readLine.question('Type your research theme: ');
    }
}

module.exports = robot