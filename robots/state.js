const fs = require('fs');
const contentFilePath = './wikipedia-content.json';

function save(searchContent){
    const searchContentString = JSON.stringify(searchContent);
    return fs.writeFileSync(contentFilePath,searchContentString);
}

function load(){
    const fileBuffer = fs.readFileSync(contentFilePath, 'utf-8');
    const contentJson = JSON.parse(fileBuffer);
    return contentJson;
}

module.exports = {
    save,
    load
}