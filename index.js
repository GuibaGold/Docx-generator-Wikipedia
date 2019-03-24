const readline = require('readline-sync');
const robots = {
    text: require('./robots/text')
}


async function start(){
    const searchContent = {};

    searchContent.searchTheme = askAndReturnSearchTheme();

    await robots.text(searchContent);

    function askAndReturnSearchTheme(){
        return readline.question('Type your research theme: ');
    }

    console.log(searchContent);
}

start();