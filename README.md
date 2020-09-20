# base2048

Base2048 is a binary encoding optimised for transmitting data through Twitter. This JavaScript module, `base2048`, is the first implementation of this encoding. Using Base2048, up to 385 octets can fit in a single Tweet. Compare with [Base65536](https://github.com/qntm/base65536), which manages only 280 octets.

<table>
  <thead>
    <tr>
      <th colspan="2" rowspan="2">Encoding</th>
      <th colspan="3">Efficiency</th>
      <th rowspan="2">Bytes per Tweet *</th>
    </tr>
    <tr>
      <th>UTF&#x2011;8</th>
      <th>UTF&#x2011;16</th>
      <th>UTF&#x2011;32</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td rowspan="5">ASCII&#x2011;constrained</td>
      <td>Unary / <a href="https://github.com/ferno/base1">Base1</a></td>
      <td style="text-align: right;">0%</td>
      <td style="text-align: right;">0%</td>
      <td style="text-align: right;">0%</td>
      <td style="text-align: right;">1</td>
    </tr>
    <tr>
      <td>Binary</td>
      <td style="text-align: right;">13%</td>
      <td style="text-align: right;">6%</td>
      <td style="text-align: right;">3%</td>
      <td style="text-align: right;">35</td>
    </tr>
    <tr>
      <td>Hexadecimal</td>
      <td style="text-align: right;">50%</td>
      <td style="text-align: right;">25%</td>
      <td style="text-align: right;">13%</td>
      <td style="text-align: right;">140</td>
    </tr>
    <tr>
      <td>Base64</td>
      <td style="text-align: right;"><strong>75%</strong></td>
      <td style="text-align: right;">38%</td>
      <td style="text-align: right;">19%</td>
      <td style="text-align: right;">210</td>
    </tr>
    <tr>
      <td>Base85 †</td>
      <td style="text-align: right;">80%</td>
      <td style="text-align: right;">40%</td>
      <td style="text-align: right;">20%</td>
      <td style="text-align: right;">224</td>
    </tr>
    <tr>
      <td rowspan="4">BMP&#x2011;constrained</td>
      <td><a href="https://github.com/ferno/hexagram-encode">HexagramEncode</a></td>
      <td style="text-align: right;">25%</td>
      <td style="text-align: right;">38%</td>
      <td style="text-align: right;">19%</td>
      <td style="text-align: right;">105</td>
    </tr>
    <tr>
      <td><a href="https://github.com/ferno/braille-encode">BrailleEncode</a></td>
      <td style="text-align: right;">33%</td>
      <td style="text-align: right;">50%</td>
      <td style="text-align: right;">25%</td>
      <td style="text-align: right;">140</td>
    </tr>
    <tr>
      <td><a href="https://github.com/qntm/base2048">Base2048</a></td>
      <td style="text-align: right;">56%</td>
      <td style="text-align: right;">69%</td>
      <td style="text-align: right;">34%</td>
      <td style="text-align: right;"><strong>385</strong></td>
    </tr>
    <tr>
      <td><a href="https://github.com/ferno/base32768">Base32768</a></td>
      <td style="text-align: right;">63%</td>
      <td style="text-align: right;"><strong>94%</strong></td>
      <td style="text-align: right;">47%</td>
      <td style="text-align: right;">263</td>
    </tr>
    <tr>
      <td rowspan="3">Full Unicode</td>
      <td><a href="https://github.com/keith-turner/ecoji">Ecoji</a></td>
      <td style="text-align: right;">31%</td>
      <td style="text-align: right;">31%</td>
      <td style="text-align: right;">31%</td>
      <td style="text-align: right;">175</td>
    </tr>
    <tr>
      <td><a href="https://github.com/ferno/base65536">Base65536</a></td>
      <td style="text-align: right;">56%</td>
      <td style="text-align: right;">64%</td>
      <td style="text-align: right;"><strong>50%</strong></td>
      <td style="text-align: right;">280</td>
    </tr>
    <tr>
      <td><a href="https://github.com/ferno/base131072">Base131072</a> ‡</td>
      <td style="text-align: right;">53%+</td>
      <td style="text-align: right;">53%+</td>
      <td style="text-align: right;">53%</td>
      <td style="text-align: right;">297</td>
    </tr>
  </tbody>
</table>

\* A Tweet can be up to 280 Unicode characters, give or take Twitter's complex "weighting" calculation.<br/>
† Base85 is listed for completeness but all variants use characters which are considered hazardous for general use in text: escape characters, brackets, punctuation *etc.*.<br/>
‡ Base131072 is a work in progress, not yet ready for general use.<br/>

## Installation

```bash
npm install base2048
```

## Usage

```js
import { encode, decode } from 'base2048'

const uint8Array = new Uint8Array([1, 2, 4, 8, 16, 32, 64, 128])
const str = encode(uint8Array)
console.log(str) // 'GƸOʜeҩ'

const uint8Array2 = decode(str)
console.log(uint8Array2)
// [1, 2, 4, 8, 16, 32, 64, 128]
```

### In the browser

Load this file in the browser to gain access to a `base2048` global.

```html
<script src="https://unpkg.com/base2048@1/dist/iife/base2048.js"></script>
<script>
  console.log(base2048.decode('GƸOʜeҩ'))
</script>
```

## API

`base2048` accepts and returns `Uint8Array`s. Note that every Node.js `Buffer` is a `Uint8Array`. A `Uint8Array` can be converted to a Node.js `Buffer` like so:

```js
const buffer = Buffer.from(uint8Array.buffer, uint8Array.byteOffset, uint8Array.byteLength)
```

### encode(uint8Array)

Encodes a [`Uint8Array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array) and returns a Base2048 `String` suitable for passing through Twitter. Give or take some padding characters, the output string has 1 character per 11 bits of input.

### decode(string)

Decodes a Base2048 `String` and returns a `Uint8Array` containing the original binary data.

## Rationale

Originally, Twitter allowed Tweets to be at most 140 characters. Discounting URLs, which have their own complex rules, Tweet length was computed as the number of Unicode code points in the Tweet — *not* the number of octets in any particular encoding of that Unicode string. In 2015, observing that most existing text-based encodings made negligible use of most of the Unicode code point space (e.g. Base64 encodes only 6 bits per character = 105 octets per Tweet), I developed [Base65536](https://github.com/qntm/base65536), which encodes 16 bits per character = 280 octets per Tweet.

On 26 September 2017, Twitter <a href="https://blog.twitter.com/official/en_us/topics/product/2017/Giving-you-more-characters-to-express-yourself.html">announced that</a>

> we're going to try out a longer limit, 280 characters, in languages impacted by cramming (which is all except Japanese, Chinese, and Korean).

This statement is fairly light on usable details and/or factual accuracy. However, following some experimentation and examination of the new web client code, we now understand that maximum Tweet length is indeed 280 Unicode code points, *except that code points U+1100 HANGUL CHOSEONG KIYEOK upwards now count double*.

Effectively, Twitter divides Unicode into 4,352 "light" code points (U+0000 to U+10FF inclusive) and 1,109,760 "heavy" code points (U+1100 to U+10FFFF inclusive).

Base65536 *solely* uses heavy characters, which means that a new "long" Tweet can still only contain at most 140 characters of Base65536, encoding 280 octets. This seemed like an imperfect state of affairs to me, and so here we are.

Base2048 solely uses light characters, which means a new "long" Tweet can contain at most 280 characters of Base2048. Base2048 is an 11-bit encoding, so those 280 characters encode 3080 bits i.e. 385 octets of data, significantly better than Base65536.

### Note

At the time of writing, the sophisticated weighted-code point check is only carried out client-side. Server-side, the check is still a simple code point length check, now capped at 280 code points. So, by circumventing the client-side check, it's possible to send <a href="https://twitter.com/dx_test1/status/912835316679151621">280 characters of Base65536 i.e. 560 bytes of data in a single Tweet</a>.

Base2048 was developed under the assumption that most people will not go to the trouble of circumventing the client-side check and/or that eventually the check will be implemented server-side as well.

## Code point safety

Base2048 uses only ["safe" Unicode code points](https://qntm.org/safe) (no unassigned code points, no control characters, no whitespace, no combining diacritics, ...). This guarantees that the data sent will remain intact when sent through any "Unicode-clean" text interface.

In the available space of 4,352 light code points, there are 2,343 safe code points. For Base2048, since I felt it improved the character repertoire, I further ruled out the four "Symbol" General Categories, leaving 2,212 safe code points, and the "Letter, Modifier" General Category, leaving 2,176 safe code points. From these I chose 2<sup>11</sup> = 2048 code points for the primary repertoire and 2<sup>3</sup> = 8 additional code points to use as padding characters.

## License

MIT
