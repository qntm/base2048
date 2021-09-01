// The purpose of this module is to generate 2,048 + 8 = 2,056 "safe"
// <https://qntm.org/safe> Unicode code points suitable for use in the Base2048
// encoding. It makes use of the package `safe-code-point`
// <https://github.com/qntm/safe-code-point>.

// This program was run once, with the successful results immediately
// transplanted into `base2048` for use. It is kept here for historical reasons
// and to ensure reproducibility.

import SafeCodePoint from 'safe-code-point'

const BITS_PER_CHAR = 11 // Base2048 is an 11-bit encoding
const BITS_PER_BYTE = 8

const safeCodePoint = await SafeCodePoint('10.0.0')

const repertoireSizes = []
for (let i = BITS_PER_CHAR; i > 0; i -= BITS_PER_BYTE) {
  repertoireSizes.unshift(1 << i)
}

let codePoint = 0
const full = repertoireSizes
  .map(repertoireSize => {
    const codePoints = []
    while (codePoints.length < repertoireSize) {
      if (safeCodePoint(codePoint)) {
        if (
          safeCodePoint(codePoint) &&
          !safeCodePoint.generalCategory(codePoint).startsWith('S') &&
          safeCodePoint.generalCategory(codePoint) !== 'Lm'
        ) {
          codePoints.push(codePoint)
        }
      }

      codePoint++
    }
    return codePoints
  })
  .map(codePoints => codePoints.map(x => String.fromCodePoint(x)).join(''))
  .reverse()

// Just have the first and last character in each contiguous range
const compressed = full.map(input => {
  const comp2 = []
  const chrs = [...input]
  chrs.forEach(chr => {
    if (
      comp2.length - 1 in comp2 &&
      comp2[comp2.length - 1].codePointAt(0) + 1 === chr.codePointAt(0)
    ) {
      // Extend the existing run
      comp2[comp2.length - 1] = chr
    } else {
      // Start a new run (zero length at first)
      comp2.push(chr, chr)
    }
  })
  return comp2.join('')
})

const wordBreakable = {
  no: [],
  maybe: []
}
for (let codePoint = 0; codePoint < 0x1100; codePoint++) {
  if (safeCodePoint(codePoint)) {
    const wordBreak = safeCodePoint.wordBreak(codePoint)
    if (wordBreak === 'Numeric' || wordBreak === 'ALetter' || wordBreak === 'Hebrew_Letter') {
      wordBreakable.no.push(codePoint)
    } else {
      wordBreakable.maybe.push(codePoint)
    }
  }
}

export { full, compressed, wordBreakable }
