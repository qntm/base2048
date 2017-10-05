# base2048

Base2048 is a binary encoding optimised for transmitting data through Twitter. This JavaScript module, `base2048`, is the first implementation of this encoding. Using Base2048, up to 385 octets can fit in a single (new-style, long) Tweet. Compare with [Base65536](https://github.com/qntm/base65536), which manages only 280 octets.

## Installation

```bash
npm install base2048
```

## Usage

```js
const base2048 = require('base2048')

const uint8Array = new Uint8Array([1, 2, 4, 8])
const arrayBuffer = uint8Array.buffer

const str = base2048.encode(arrayBuffer)
console.log(str); // 'GƸP', 3 characters

const arrayBuffer2 = base2048.decode(str)
const uint8Array2 = new Uint8Array(arrayBuffer2)

console.log(uint8Array2.length) // 4
console.log(uint8Array2[0]) // 1
console.log(uint8Array2[1]) // 2
console.log(uint8Array2[2]) // 4
console.log(uint8Array2[3]) // 8
```

## API

### base2048.encode(arrayBuffer)

Encodes an [`ArrayBuffer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer) and returns a Base2048 `String` suitable for passing through Twitter. Give or take some padding characters, the output string has 1 character per 11 bits of input.

### base2048.decode(str)

Decodes a Base2048 `String` and returns an `ArrayBuffer` containing the original binary data.

## Rationale

Up until relatively recently, Twitter allowed Tweets to be at most 140 characters. Discounting URLs, which have their own complex rules, Tweet length was computed as the number of Unicode code points in the Tweet -- *not* the number of octets in any particular encoding of that Unicode string. In 2015 I developed [Base65536](https://github.com/qntm/base65536), which encodes 16 bits per character for a total of 280 octets per Tweet. (Compare with Base64, which could manage only 105 octets.)

On 26 September 2017, Twitter <a href="https://blog.twitter.com/official/en_us/topics/product/2017/Giving-you-more-characters-to-express-yourself.html">announced that</a>

> we're going to try out a longer limit, 280 characters, in languages impacted by cramming (which is all except Japanese, Chinese, and Korean).

This statement is fairly light on usable details and/or factual accuracy. Following some experimentation and examination of the new web client code, we now understand that maximum Tweet length is indeed 280 Unicode code points, *except that code points U+1100 HANGUL CHOSEONG KIYEOK upwards now count double*.

Effectively, Unicode is now divided into 4,352 "light" code points (U+0000 to U+10FF inclusive) and 1,109,760 "heavy" code points (U+1100 to U+10FFFF inclusive).

Base65536 *solely* uses heavy characters, which means that a new "long" Tweet can still only contain at most 140 characters of Base65536, encoding 280 octets.

This seemed like an imperfect state of affairs to me, which is why I've developed Base2048. Base2048 solely uses light characters, which means a new "long" Tweet can contain at most 280 characters of Base2048. Base2048 is an 11-bit encoding, so those 280 characters encode 3080 bits i.e. 385 octets of data, significantly more than Base65536.

### Note

At the time of writing, the sophisticated weighted-code point check is only carried out client-side. Server-side, the check is still a simple code point length check, now capped at 280 code points. So, by circumventing the client-side check, it's possible to send <a href="https://twitter.com/dx_test1/status/912835316679151621">280 characters of Base65536 i.e. 560 bytes of data in a single Tweet</a>.

This piece of work assumes that most people will not go to the trouble of circumventing the client-side check and/or that eventually the check will be implemented server-side as well.

## Code point safety

For Base65536, there were some interesting questions relating to "unsafe" code points (unassigned code points, control characters, whitespace, combining diacritics, ...) and Unicode normalization in transit. However, [this is more or less a solved problem](https://github.com/qntm/base65536gen) at this point and it was just a matter of modifying that code a little to return different results.

In the available space of 4,352 "light" code points, there are 2,343 safe code points. For Base2048 I further ruled out the four "Symbol" General Categories, leaving 2,212 safe code points, and the "Letter, Modifier" GC leaving 2,176 safe code points. From these I chose 2<sup>11</sup> = 2048 code points for the primary repertoire and 2<sup>3</sup> = 8 additional code points to use as padding characters.

That's 2,056 code points in total, which puts the lie to the name of the encoding, but then Base64 also uses a 65th character as padding, so there you go.

## Performance

Not really.

## License

MIT
