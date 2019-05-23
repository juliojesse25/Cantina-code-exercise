'use strict'

const fs = require('fs')
const readline = require('readline')


const parseJson = function(inFile) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  })

  fs.readFile(inFile, 'utf8', (err, fileContents) => {
    if (err) {
      console.error(err)
      return;
    }

    let pojo

    try {
      const pojo = JSON.parse(fileContents)
      console.log(pojo)
      }
      rl.question(">>Enter a selector ", function(answer){
        console.log("Hello " + answer)
        rl.close()
      })
    } catch(err) {
      console.error(err)
    }
  })
}

module.exports = parseJson
