/* eslint-env mocha */

import assert from 'assert'
import fs from 'fs'
import { glob } from 'glob'

import { encode, decode } from '../src/index.js'

const forms = ['NFC', 'NFD', 'NFKC', 'NFKD']

describe('base2048', () => {
  describe('test data pairs', () => {
    const binFileNames = glob.sync('./test-data/pairs/**/*.bin')

    binFileNames.forEach(fileName => {
      const caseName = fileName.substring(0, fileName.length - '.bin'.length)
      it(caseName, () => {
        const uint8Array = new Uint8Array(fs.readFileSync(caseName + '.bin'))
        const text = fs.readFileSync(caseName + '.txt', 'utf8')
        assert.deepStrictEqual(encode(uint8Array), text)
        assert.deepStrictEqual(decode(text), uint8Array)
        forms.forEach(form => {
          assert.deepStrictEqual(text.normalize(form), text)
        })
      })
    })
  })

  describe('failure cases', () => {
    const badFileNames = glob.sync('./test-data/bad/**/*.txt')

    badFileNames.forEach(fileName => {
      const caseName = fileName.substring(0, fileName.length - '.txt'.length)
      it(caseName, () => {
        const text = fs.readFileSync(caseName + '.txt', 'utf8')
        assert.throws(() => decode(text))
      })
    })
  })

  describe('round trips at all lengths', () => {
    const fillUint8s = [
      0b00000000,
      0b00000001,
      0b01010101,
      0b10101010,
      0b11111111
    ]
    for (let length = 0; length < 256; length++) {
      fillUint8s.forEach(fillUint8 => {
        it(`every uint8 is ${fillUint8} to length ${length}`, () => {
          const uint8Array = new Uint8Array(length)
          for (let i = 0; i < length; i++) {
            uint8Array[i] = fillUint8
          }

          assert.deepStrictEqual(uint8Array, decode(encode(uint8Array)))
        })
      })
    }
  })

  it('demo code', () => {
    const ascii = 'some ASCII text'
    const uint8Array = Uint8Array.from(ascii, chr => chr.charCodeAt(0))
    const str = encode(uint8Array)
    const uint8Array2 = decode(str)
    const ascii2 = String.fromCharCode(...uint8Array2)
    assert.deepStrictEqual(ascii2, 'some ASCII text')
  })
})
