# Javascript Base64 Encoder

## Just for fun, and to explore zero-dependency Javascript, a Base64 ASCII encoder written in pureJS

When learning a language, and admittedly, I've actually been doing Javascript a long time now, I always like to write a Base64 encoder/decoder in that language, because it forces me to test my knowledge of a few things:

- Data types within the language: You reduce the string down to binary forms, some languages have a specific binary type, others don't
- Iterating, and generally working with, strings.
- Algorithmic approaches to programming: Not much is more algorithmic than encoding and decoding a string.

### Zero dependency

So, we make a lot of the issues that tools like `npm` and `yarn` cause within Javascript; how they install thousands of dependencies in your project without you knowing and how they cause massive security holes.  I could go on for a bit to point out that this isn't actually a Javascript problem, but a dependency installer problem; but instead, I wrote this as a zero dependency project, as an exercise in considering your own code.

#### Minor concession

It's not entirely dependency free - I did use an existing library, `Mocha` as the test runner, and an assertion library, `chai` for complex assertions in tests.

However, much as you can pull this down, and install those dependencies to run the tests, you can also just do this:

```bash
$ git clone https://github.com/owencjones/jsBase64
$ node example.js

Base64 examples:

String: 'All your base are belong to us.'

Encoded: 'QWxsIHlvdXIgYmFzZSBhcmUgYmVsb25nIHRvIHVzLg=='

Decoded: 'All your base are belong to us.'
```

...so the code runs independently, without needing any dependencies, but the tests are using mocha.  It's on my list to write a quick and simple test runner to use the same lexicon as Mocha for this.

### Base64 encoding

So, for those who never really thought about it, Base64 takes ASCII characters (or UTF-8, if you use a version that supports that - I didn't write that), and creates a longer, encoded string, that represents them with a much limited set of characters:

```
abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ123456789+/=
```

It does this by a relatively simple process:

1. Take the string, and reduce it to character values, e.g a = 65
2. Take the array of values, and create binary octets for each of them.
3. Concatenate all of the values, so you have a long string of binary bits.
4. Add zeroes to the end of the string, until the length is a multiple of 6.
5. Split the string into 6-bit 'hextets'
6. Convert the hextets into new values in decimal
7. Look up the values you now have in decimal in the Base64 encoding index (see above), and convert them to a string of characters from the index
8. If you added zeroes to make the length a multiple of 6, add equals signs to the string to show this.  Add one if you added two zeroes, and two if you added four.

That's it.

The effect is that, whilst an ASCII character (in extended set) can have 8 bits, and therefore one of 256 values, only some of which are typeable characters; characters in a Base64 encoded string can only have six bits per byte, meaning a maximum of 64 possibilities.

The Base64 encoding index contains 64 values that are all typeable characters, and also all URL-safe, and largely transferrable by most means.

To decode:

1. Lookup each character of the string in the Base64 index, and convert it to its position within the index.
2. Convert the index values to binary strings
3. Concatenate all of them to be one long string
4. Divide the string into octets
5. Convert the octets to decimal
6. Convert the decimal to ASCII character codes

If anything, it's slightly easier to decode than encode

#### Interesting note

Because an encoded string will always be divisible by both 6 and 8 when reduced to bits, the padding string is not actually necessary when decoding ASCII, although it can be when decoding UTF-8, in which single characters may be represented by more than one byte, as well as byte length being larger.

For a simple Base64-ASCII decode, the padding of equals signs is not at all needed to decode the string, and indeed, my system doesn't use them - it would be actively choosing to take an extra step to do so.

### Possible Todos

[] Replace Mocha and Chai with home spun testing library, to make this completely zero-dependency
[] Support UTF-8 (Unlikely to bother, but who knows)

### Licence

MIT, Use as you like more or less
