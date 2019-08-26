const { encode, decode } = require('./base64');

const string = 'All your base are belong to us.';
const encoded = encode(string);
const decoded = decode(encoded);

console.log(`
Base64 examples:

String: '${string}'

Encoded: '${encoded}'

Decoded: '${decoded}'
`);