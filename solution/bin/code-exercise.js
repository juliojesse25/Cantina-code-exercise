'use strict'

const parseJson = require('../server.js')

const inFile = process.argv[2]

if (!inFile) {
  throw new Error('Script requires an in file')
} else {
  parseJson(inFile)
}
