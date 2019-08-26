const {
    toCharacterCodeArray,
    decimalToBinary,
    binaryToBase64Character,
    base64IndexToDecimal,
    padToOctet,
    padToHextet,
    paddingForString,
    paddingStringFromLength,
    splitToSextets,
    splitToOctets
} = require('./includes/utils');

module.exports = {};

module.exports.encode = string => {
    const padding = paddingForString(string.length);
    const paddingString = paddingStringFromLength(padding);
    const decimalArray = toCharacterCodeArray(string);
    const binaryArray = decimalArray.map(decimalToBinary);
    const paddedBinaryArray = binaryArray.map(padToOctet);
    const binaryString = paddedBinaryArray.join('');
    const sextetArray = splitToSextets(binaryString);
    const outputString = sextetArray.map(binaryToBase64Character).join('');

    return outputString + paddingString;
}

module.exports.decode = string => {
    const decimalArray = string.split('').filter(c => c !== '=').map(base64IndexToDecimal);
    const binaryArray = decimalArray.map(decimalToBinary).map(padToHextet);
    const binaryString = binaryArray.join('');
    const octetsArray = splitToOctets(binaryString).map(c => parseInt(c, 2));
    return octetsArray.map(c => String.fromCharCode(c)).join('')
}