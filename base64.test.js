const { assert } = require('chai');
const { encode, decode } = require('./base64');

const string = 'All your base are belong to us.';
const encodedString = 'QWxsIHlvdXIgYmFzZSBhcmUgYmVsb25nIHRvIHVzLg==';

describe('#encode', () => {
    it('should encode a string correctly', () => {
        assert.equal(encode(string), encodedString);
    });
});

describe.skip('#decode', () => {
    it('should decode a string correctly', () => {

        assert.equal(decode(encodedString), string);
    });
});
