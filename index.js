const readline = require('readline-sync');


function start(){
    const searchContent = {};

    searchContent.searchTheme = askAndReturnSearchTheme();

    function askAndReturnSearchTheme(){
        return readline.question('Type your research theme: ');
    }

    console.log(searchContent);
}

start();