const { assert } = require('chai');
const {
    toCharacterCodeArray,
    decimalToBinary,
    padToOctet,
    binaryToBase64Character,
    paddingForString,
    paddingStringFromLength,
    splitToSextets,
    splitToOctets
} = require('./utils')

describe('#toCharacterCodeArray' , () => {
    it('should return an array of characters for a given string', () => {
        const output = toCharacterCodeArray('aaa');
        
        assert.deepEqual(output, [97, 97, 97], 'Did not return array of char codes');
    })

    it('should thrown for a non string', () => {
        assert.throws(toCharacterCodeArray.bind(null, {}));
    })
});

describe('#decimalToBinary', () => {
    it('should return a binary number for an integer input', () => {
        const input = 254;
        const output = decimalToBinary(input);

        assert.strictEqual(output, '11111110');
    });

    it('should throw for a non number input', () => {
        const input = 'cheese';

        assert.throws(decimalToBinary.bind(null, input));
    })

    it('should throw for a non integer number input', () => {
        const input = 0.1337;

        assert.throws(decimalToBinary.bind(null, input));
    })
});

describe('#binaryToBase64Character', () => {
    it('should throw if passed a number outside the 0-255 range', () => {
        assert.throws(binaryToBase64Character.bind(null, -1));
        assert.throws(binaryToBase64Character.bind(null, 256));
    });

    it('should throw if passed a non number', () => {
        assert.throws(binaryToBase64Character.bind(null, 'H'));
    });

    it('should throw if passed a non integer', () => {
        assert.throws(binaryToBase64Character.bind(null, 0.1337));
    });
})

describe('#padToOctet', () => {
    it('should pad a binary string shorter than an octet with zeroes', () => {
        assert.strictEqual(padToOctet('0101'), '00000101');
    });

    it('should not change a binary string equal to an octet', () => {
        assert.strictEqual(padToOctet('11110101'), '11110101');
    });

    it('should throw when passed a string over octet length', () => {
        assert.throws(padToOctet.bind(null, '0101010101010101'));
    });

    it('should throw when passed a string containing non binary characters', () => {
        assert.throws(padToOctet.bind(null, 'x106'));
    });

    it('should throw when passed a non string', () => {
        assert.throws(padToOctet.bind(null, {}));
    });
});

describe('#splitToSextets', () => {
    it ('should throw for a non-string', () => {
        assert.throws(splitToSextets.bind(null, 1337))
    });

    it ('should return an array of six character strings', () => {
        const testInput = '123456654321123456654321';
        assert.deepEqual(splitToSextets(testInput), ['123456', '654321', '123456', '654321']);
    });

    it('should handle a string of length not divisible by 6', () => {
        const testInput = '123456654321123456654321xx';
        assert.deepEqual(splitToSextets(testInput), ['123456', '654321', '123456', '654321', 'xx0000']);
    });

});

describe('#splitToOctets', () => {
    it('should throw for a non-string', () => {
        assert.throws(splitToOctets.bind(null, 1337))
    });

    it('should return an array of six character strings', () => {
        const testInput = '1234567887654321';
        assert.deepEqual(splitToOctets(testInput), ['12345678', '87654321']);
    });

    it('should handle a string of length not divisible by 6', () => {
        const testInput = '1234567887654321xx';
        assert.deepEqual(splitToOctets(testInput), ['12345678', '87654321', 'xx000000']);
    });

})

describe('#paddingForString', () => {
    it('should throw if not passed an integer', () => {
        assert.throws(paddingForString.bind(null, 'this is not an array'));
    });

    it ('should return correct amount of padding', () => {
        const testObject = {
            16: 2,
            17: 1,
            18: 0,
            19: 2,
            20: 1
        }

        Object.keys(testObject).forEach(key => {
            const output = paddingForString(key);

            assert.equal(output, testObject[key], `Incorrect value returned for ${key}`);
        });
    });
});

describe('#paddingStringFromLength', () => {
    it('should throw if not passed an integer', () => {
        assert.throws(paddingStringFromLength.bind(null, 'this is not an integer'));
    });

    it ('should throw for an integer out of range', () => {
        assert.throws(paddingStringFromLength.bind(null, -1));
        assert.throws(paddingStringFromLength.bind(null, 3));
    });

    it ('should return the correct number of equals signs for a valid integer', () => {
        const testObj = {
            1: '=',
            2: '=='
        };

        Object.keys(testObj).forEach(key => {
            assert.equal(paddingStringFromLength(key), testObj[key], `Returned wrong amount of characters to pad value: ${key}`);
        });
    })
});
