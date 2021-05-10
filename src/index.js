/**
  Base2048 is a binary-to-text encoding optimised for transmitting data
  through Twitter.
*/

'use strict'

// Z is a number, usually a uint11 but sometimes a uint3

const BITS_PER_CHAR = 11 // Base2048 is an 11-bit encoding
const BITS_PER_BYTE = 8

// Compressed representation of inclusive ranges of characters used in this encoding.
const pairStrings = [
  '89AZazÆÆÐÐØØÞßææððøøþþĐđĦħııĸĸŁłŊŋŒœŦŧƀƟƢƮƱǃǝǝǤǥǶǷȜȝȠȥȴʯͰͳͶͷͻͽͿͿΑΡΣΩαωϏϏϗϯϳϳϷϸϺϿЂЂЄІЈЋЏИКикяђђєіјћџѵѸҁҊӀӃӏӔӕӘәӠӡӨөӶӷӺԯԱՖաֆאתװײؠءاؿفي٠٩ٮٯٱٴٹڿہہۃےەەۮۼۿۿܐܐܒܯݍޥޱޱ߀ߪࠀࠕࡀࡘࡠࡪࢠࢴࢶࢽऄनपरलळवहऽऽॐॐॠॡ०९ॲঀঅঌএঐওনপরললশহঽঽৎৎৠৡ০ৱ৴৹ৼৼਅਊਏਐਓਨਪਰਲਲਵਵਸਹੜੜ੦੯ੲੴઅઍએઑઓનપરલળવહઽઽૐૐૠૡ૦૯ૹૹଅଌଏଐଓନପରଲଳଵହଽଽୟୡ୦୯ୱ୷ஃஃஅஊஎஐஒஓககஙசஜஜஞடணதநபமஹௐௐ௦௲అఌఎఐఒనపహఽఽౘౚౠౡ౦౯౸౾ಀಀಅಌಎಐಒನಪಳವಹಽಽೞೞೠೡ೦೯ೱೲഅഌഎഐഒഺഽഽൎൎൔൖ൘ൡ൦൸ൺൿඅඖකනඳරලලවෆ෦෯กะาาเๅ๐๙ກຂຄຄງຈຊຊຍຍດທນຟມຣລລວວສຫອະາາຽຽເໄ໐໙ໞໟༀༀ༠༳ཀགངཇཉཌཎདནབམཛཝཨཪཬྈྌကဥဧဪဿ၉ၐၕ',
  '07'
]

const lookupE = {}
const lookupD = {}
pairStrings.forEach((pairString, r) => {
  // Decompression
  const encodeRepertoire = []
  pairString.match(/../gu).forEach(pair => {
    const first = pair.codePointAt(0)
    const last = pair.codePointAt(1)
    for (let codePoint = first; codePoint <= last; codePoint++) {
      encodeRepertoire.push(String.fromCodePoint(codePoint))
    }
  })

  const numZBits = BITS_PER_CHAR - BITS_PER_BYTE * r // 0 -> 11, 1 -> 3
  lookupE[numZBits] = encodeRepertoire
  encodeRepertoire.forEach((chr, z) => {
    lookupD[chr] = [numZBits, z]
  })
})

export const encode = uint8Array => {
  const length = uint8Array.length

  let str = ''
  let z = 0
  let numZBits = 0

  for (let i = 0; i < length; i++) {
    const uint8 = uint8Array[i]

    // Take most significant bit first
    for (let j = BITS_PER_BYTE - 1; j >= 0; j--) {
      const bit = (uint8 >> j) & 1

      z = (z << 1) + bit
      numZBits++

      if (numZBits === BITS_PER_CHAR) {
        str += lookupE[numZBits][z]
        z = 0
        numZBits = 0
      }
    }
  }

  if (numZBits !== 0) {
    // Final bits require special treatment.

    // byte = bbbcccccccc, numBits = 11, padBits = 0
    // byte = bbcccccccc, numBits = 10, padBits = 1
    // byte = bcccccccc, numBits = 9, padBits = 2
    // byte = cccccccc, numBits = 8, padBits = 3
    // byte = ccccccc, numBits = 7, padBits = 4
    // byte = cccccc, numBits = 6, padBits = 5
    // byte = ccccc, numBits = 5, padBits = 6
    // byte = cccc, numBits = 4, padBits = 7
    // => Pad `byte` out to 11 bits using 1s, then encode as normal (repertoire 0)

    // byte = ccc, numBits = 3, padBits = 0
    // byte = cc, numBits = 2, padBits = 1
    // byte = c, numBits = 1, padBits = 2
    // => Pad `byte` out to 3 bits using 1s, then encode specially (repertoire 1)

    while (!(numZBits in lookupE)) {
      z = (z << 1) + 1
      numZBits++
    }

    str += lookupE[numZBits][z]
  }

  return str
}

export const decode = str => {
  const length = str.length

  // This length is a guess. There's a chance we allocate one more byte here
  // than we actually need. But we can count and slice it off later
  const uint8Array = new Uint8Array(Math.floor(length * BITS_PER_CHAR / BITS_PER_BYTE))
  let numUint8s = 0
  let uint8 = 0
  let numUint8Bits = 0

  for (let i = 0; i < length; i++) {
    const chr = str.charAt(i)

    if (!(chr in lookupD)) {
      throw new Error(`Unrecognised Base2048 character: ${chr}`)
    }

    const [numZBits, z] = lookupD[chr]

    if (numZBits !== BITS_PER_CHAR && i !== length - 1) {
      throw new Error('Secondary character found before end of input at position ' + String(i))
    }

    // Take most significant bit first
    for (let j = numZBits - 1; j >= 0; j--) {
      const bit = (z >> j) & 1

      uint8 = (uint8 << 1) + bit
      numUint8Bits++

      if (numUint8Bits === BITS_PER_BYTE) {
        uint8Array[numUint8s] = uint8
        numUint8s++
        uint8 = 0
        numUint8Bits = 0
      }
    }
  }

  // Final padding bits! Requires special consideration!
  // Remember how we always pad with 1s?
  // Note: there could be 0 such bits, check still works though
  if (uint8 !== ((1 << numUint8Bits) - 1)) {
    throw new Error('Padding mismatch')
  }

  return new Uint8Array(uint8Array.buffer, 0, numUint8s)
}
