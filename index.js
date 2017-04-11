const peg = require ('pegjs');
const fs = require ('fs');
const path = require ('path');

const file = fs.readFileSync (path.join (__dirname, './language.pegjs'));
var parse = peg.generate (file.toString ()).parse;

function fromFile (filename) {
    let file = fs.readFileSync (path.join (__dirname, filename));
    return toJSON (file.toString ());  
}

function toJSON (text) {
    return JSON.stringify(parse (text.replace (/#.*?\n/gi, '\n')));
}

if (process.argv[2] && process.argv[2] == '-f' && process.argv[3]) {
    console.log (fromFile (process.argv[3]));
}

module.exports = {
    parse,
    toJSON,
    fromFile
}