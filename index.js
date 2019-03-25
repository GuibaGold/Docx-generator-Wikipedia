const readline = require('readline-sync');
const robots = {
    text: require('./robots/text.js'),
    input: require('./robots/input.js'),
    state: require('./robots/state.js')
}


async function start(){
    robots.input();
    await robots.text();
    const searchContent = robots.state.load()
    console.dir(searchContent, { depth: null });
}

start();