'use strict'

const base2048 = require('./index.js')
const fs = require('fs')
const glob = require('glob')

const forms = ['NFC', 'NFD', 'NFKC', 'NFKD']

const arrayBuffersEqual = function (arrayBuffer1, arrayBuffer2) {
  if (arrayBuffer1.byteLength !== arrayBuffer2.byteLength) {
    return false
  }

  const uint8Array1 = new Uint8Array(arrayBuffer1)
  const uint8Array2 = new Uint8Array(arrayBuffer2)
  for (let i = 0; i < uint8Array1.length; i++) {
    if (uint8Array1[i] !== uint8Array2[i]) {
      return false
    }
  }

  return true
}

glob('./data/pairs/**/*.bin', function (err, files) {
  if (err) {
    throw Error(err)
  }
  files.forEach(function (fileName) {
    const caseName = fileName.substring(0, fileName.length - '.bin'.length)
    console.log(caseName)

    const binary = new Uint8Array(fs.readFileSync(caseName + '.bin')).buffer
    // const text = base2048.encode(binary)
    // fs.writeFileSync(caseName + '.txt', text, 'utf8')
    const text = fs.readFileSync(caseName + '.txt', 'utf8')

    if (base2048.encode(binary) !== text) {
      console.error('Input binary', binary)
      console.error('Expected text', text)
      console.error('Actual text', base2048.encode(binary))
      throw Error('Encode error')
    }

    if (!arrayBuffersEqual(base2048.decode(text), binary)) {
      console.error('Input text', text)
      console.error('Expected binary', binary)
      console.error('Actual binary', base2048.decode(text))
      throw Error('Decode error')
    }

    forms.forEach(function (form) {
      if (text.normalize(form) !== text) {
        throw new Error('String failed to survive ' + form + ' normalization! ' + text)
      }
    })
  })

  glob('./data/bad/**/*.txt', function (err, files) {
    if (err) {
      throw Error(err)
    }
    files.forEach(function (fileName) {
      const caseName = fileName.substring(0, fileName.length - '.txt'.length)
      console.log(caseName)

      const text = new Uint8Array(fs.readFileSync(caseName + '.txt', 'utf8')).buffer
      let threw
      try {
        base2048.decode(text)
        threw = false
      } catch (e) {
        threw = true
      }
      if (!threw) {
        throw new Error('String should have failed to decode! ' + text)
      }
    })
  })
})
