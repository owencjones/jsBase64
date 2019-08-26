module.exports = {};

module.exports.toCharacterCodeArray = string => {
    if (typeof string !== 'string') throw 'Expected a string';

    return string
        .split('')
        .map(character => character.charCodeAt(0));
}

module.exports.decimalToBinary = n => {
    if (typeof n !== 'number' || parseInt(n) != n) throw new Error('Expected an integer');

    return (+n.toString()).toString(2);
}

module.exports.binaryToBase64Character = binStr => {
    if (typeof binStr !== 'string' || binStr.match(/[^01]/g)) throw new Error('Expected a string of binary characters');
    if (binStr.length > 6) throw new Error('Expected binary string expressing value up to 111111 ' + binStr);
    const decFromBin = parseInt(binStr, 2);
    const base64Index = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"

    return base64Index[decFromBin];
}

module.exports.base64IndexToDecimal = char => {
    const base64Index = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    return base64Index.indexOf(char);
}

module.exports.padToOctet = str => {
    if (typeof str !== 'string') throw 'Expected a string';
    if (str.length > 8) throw 'Octet length too long';
    if (str.match(/[^01]/g)) throw 'Expected only binary characters';

    return '0'.repeat(8 - str.length) + str;
}

module.exports.padToHextet = str => {
    if (typeof str !== 'string') throw 'Expected a string';
    if (str.length > 8) throw 'Octet length too long';
    if (str.match(/[^01]/g)) throw 'Expected only binary characters';

    return '0'.repeat(6 - str.length) + str;
}

module.exports.splitToSextets = str => {
    if (typeof str !== 'string') throw 'Expected a string';

    let output = [];
    for (let i = 0; i < str.length; i += 6) {
        const sub = str.substr(i, 6);
        output.push(sub + '0'.repeat(6 - sub.length));
    }

    return output;
}

module.exports.splitToOctets = str => {
    if (typeof str !== 'string') throw 'Expected a string';

    let output = [];
    for (let i = 0; i < str.length; i += 8) {
        const sub = str.substr(i, 8);
        output.push(sub + '0'.repeat(8 - sub.length));
    }

    return output;
}

module.exports.paddingForString = length => {
    if (parseInt(length) != length) throw 'Expected integer length';
    
    const leftOver = length % 3;
    return leftOver ? (3 - leftOver) : 0;
}

module.exports.paddingStringFromLength = length => {
    if (length != parseInt(length) || (Math.abs(length) > 2)) throw 'Expected integer 0-2';
    return '='.repeat(length);
}