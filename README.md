# base2048

Base2048 is a binary encoding optimised for transmitting data through Twitter. This JavaScript module, `base2048`, is the first implementation of this encoding. Using Base2048, up to 385 octets can fit in a single (new-style, long) Tweet. Compare with [Base65536](https://github.com/qntm/base65536), which manages only 280 octets.

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

\* New-style "long" Tweets, up to 280 Unicode characters give or take Twitter's complex "weighting" calculation.<br/>
† Base85 is listed for completeness but all variants use characters which are considered hazardous for general use in text: escape characters, brackets, punctuation *etc.*.<br/>
‡ Base131072 is a work in progress, not yet ready for general use.<br/>

## Installation

```bash
npm install base2048
```

## Usage

```js
const base2048 = require('base2048')

const uint8Array = new Uint8Array([1, 2, 4, 8, 16, 32, 64, 128]) // 8 octets
const arrayBuffer = uint8Array.buffer

const str = base2048.encode(arrayBuffer)
console.log(str); // 'GƸOʜeҩ', 6 characters

const arrayBuffer2 = base2048.decode(str)
const uint8Array2 = new Uint8Array(arrayBuffer2)

console.log(uint8Array2.length) // 8
console.log(uint8Array2[0]) // 1
console.log(uint8Array2[1]) // 2
console.log(uint8Array2[2]) // 4
console.log(uint8Array2[3]) // 8
console.log(uint8Array2[4]) // 16
console.log(uint8Array2[5]) // 32
console.log(uint8Array2[6]) // 64
console.log(uint8Array2[7]) // 128
```

## API

### base2048.encode(arrayBuffer)

Encodes an [`ArrayBuffer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer) and returns a Base2048 `String` suitable for passing through Twitter. Give or take some padding characters, the output string has 1 character per 11 bits of input.

### base2048.decode(string)

Decodes a Base2048 `String` and returns an `ArrayBuffer` containing the original binary data.

## Rationale

Up until relatively recently, Twitter allowed Tweets to be at most 140 characters. Discounting URLs, which have their own complex rules, Tweet length was computed as the number of Unicode code points in the Tweet — *not* the number of octets in any particular encoding of that Unicode string. In 2015, observing that most existing text-based encodings made negligible use of most of the Unicode code point space (e.g. Base64 encodes only 6 bits per character = 105 octets per Tweet), I developed [Base65536](https://github.com/qntm/base65536), which encodes 16 bits per character = 280 octets per Tweet.

On 26 September 2017, Twitter <a href="https://blog.twitter.com/official/en_us/topics/product/2017/Giving-you-more-characters-to-express-yourself.html">announced that</a>

> we're going to try out a longer limit, 280 characters, in languages impacted by cramming (which is all except Japanese, Chinese, and Korean).

This statement is fairly light on usable details and/or factual accuracy. However, following some experimentation and examination of the new web client code, we now understand that maximum Tweet length is indeed 280 Unicode code points, *except that code points U+1100 HANGUL CHOSEONG KIYEOK upwards now count double*.

Effectively, Unicode is now divided into 4,352 "light" code points (U+0000 to U+10FF inclusive) and 1,109,760 "heavy" code points (U+1100 to U+10FFFF inclusive).

Base65536 *solely* uses heavy characters, which means that a new "long" Tweet can still only contain at most 140 characters of Base65536, encoding 280 octets. This seemed like an imperfect state of affairs to me, and so here we are.

Base2048 solely uses light characters, which means a new "long" Tweet can contain at most 280 characters of Base2048. Base2048 is an 11-bit encoding, so those 280 characters encode 3080 bits i.e. 385 octets of data, significantly better than Base65536.

### Note

At the time of writing, the sophisticated weighted-code point check is only carried out client-side. Server-side, the check is still a simple code point length check, now capped at 280 code points. So, by circumventing the client-side check, it's possible to send <a href="https://twitter.com/dx_test1/status/912835316679151621">280 characters of Base65536 i.e. 560 bytes of data in a single Tweet</a>.

Base2048 was developed under the assumption that most people will not go to the trouble of circumventing the client-side check and/or that eventually the check will be implemented server-side as well.

## Code point safety

Base2048 uses only ["safe" Unicode code points](https://qntm.org/safe) (no unassigned code points, no control characters, no whitespace, no combining diacritics, ...). This guarantees that the data sent will remain intact when sent through any "Unicode-clean" text interface.

In the available space of 4,352 light code points, there are 2,343 safe code points. For Base2048, since I felt it improved the character repertoire, I further ruled out the four "Symbol" General Categories, leaving 2,212 safe code points, and the "Letter, Modifier" General Category, leaving 2,176 safe code points. From these I chose 2<sup>11</sup> = 2048 code points for the primary repertoire and 2<sup>3</sup> = 8 additional code points to use as padding characters.

## Padding

Base2048 is an 11-bit encoding. We take the input binary data as a sequence of 8-bit numbers, compact it into a sequence of bits, then dice the bits up again to make a sequence of 11-bit numbers. We then encode each of these 2<sup>11</sup> = 2,048 possible numbers as a different Unicode code point.

Note that the final 11-bit number in the sequence is likely to be "incomplete", i.e. missing some of its bits. We need to signal this fact in the output string somehow. Here's how we handle those cases.

#### Final 11-bit number has 1 to 7 bits missing

In the following cases:

	aabbbbbbbb_ // 1 missing bit
	abbbbbbbb__ // 2 missing bits
	bbbbbbbb___ // 3 missing bits
	bbbbbbb____ // 4 missing bits
	bbbbbb_____ // 5 missing bits
	bbbbb______ // 6 missing bits
	bbbb_______ // 7 missing bits

we pad the incomplete 11-bit number out to 11 bits using 1s:

	aabbbbbbbb1
	abbbbbbbb11
	bbbbbbbb111
	bbbbbbb1111
	bbbbbb11111
	bbbbb111111
	bbbb1111111

and then encode as normal using our 2<sup>11</sup>-bit repertoire.

#### Final 11-bit number has 8 to 10 bits missing

In the following cases:

	bbb________ // 8 missing bits
	bb_________ // 9 missing bits
	b__________ // 10 missing bits

we encode them differently. We'll pad the incomplete number out to only 3 bits using 1s:

	bbb
	bb1
	b11

and then encode them using a completely different, 2<sup>3</sup>-character repertoire. On decoding, we will treat that character differently, returning 3 bits, rather than 11 from characters in the main repertoire.

In other words, "Base2048" is a slight misnomer. This encoding uses not 2,048 but 2<sup>11</sup> + 2<sup>3</sup> = 2,056 characters for its repertoires. Of course, Base64 uses a 65th character for its padding too.

### Decoding

On decoding, we get a series of 8-bit values, the last of which might be incomplete, like so:

	1_______ // 7 missing bits
	11______ // 6 missing bits
	111_____ // 5 missing bits
	1111____ // 4 missing bits
	11111___ // 3 missing bits
	111111__ // 2 missing bits
	1111111_ // 1 missing bit

These are the padding 1s added at encoding time. We can check this and discard this final value.

## Performance

Not really.

## License

MIT
