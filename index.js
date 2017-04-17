const peg = require ('pegjs');
const fs = require ('fs');
const path = require ('path');

const file = fs.readFileSync (path.join (__dirname, './language.pegjs'));
var _parse = peg.generate (file.toString ()).parse;

function parse (text) {
    text = text.replace (/\#.*?$/, '');
    if (text.length === 0) return [];
    return _parse (text);
}

function fromFile (filename) {
    let file = fs.readFileSync (path.join (__dirname, filename));
    return toJSON (file.toString ());  
}

function toJSON (text) {
    return JSON.stringify(parse (text.replace (/#.*?\n/gi, '\n')));
}

module.exports = {
    parse,
    toJSON,
    fromFile
}
