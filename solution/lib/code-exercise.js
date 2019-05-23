'use strict'

const fs = require('fs')
const readline = require('readline')

const answer = []
let count = 1
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

      // for (var prop in pojo) {
      //   string1 += object1[property1];
      // }
      rl.question(">>Enter a selector ", function(userInput){
        console.log("Hello " + userInput)

        // console.log(pojo)
        reader(pojo['subviews'], userInput)
        printAnswers(answer)
        console.log(`Total number of DOM nodes ${answer.length} \n\n`)

        rl.close()
      })
      }catch(err) {
      console.error(err)
      }
  })
}


function reader(parentSubview, userInput){
  // console.log(parentSubview[0])
  if(parentSubview.length){
    //const numberOfSubviews = parentSubview.length
    //console.log(numberOfSubviews)
    parentSubview.map(view =>{
      if (view['class'] === userInput ){
        answer.push(view)
        //console.log(view.class)
        console.log(view)
        //console.log(view['subviews'])
      }
      if(view['subviews']){
        reader(view['subviews'], userInput)
      } else if(view['contentView']) {

        if(view['contentView']['subviews'].length){
          const contentSubview = view['contentView']['subviews']
          contentSubview.map(element =>{
            if (element['class'] === userInput ){
              answer.push(element)
            }
            if(element['control']){
              if (element['control']['class'] === userInput ){
                answer.push(element)
              }
            }
          })
        }

      }
    })
  }
}

function printAnswers(answers){
  answers.map(item=>{
    let propValue;
    for(let propName in item) {
        propValue = item[propName]
        console.log(propName,propValue);
    }
    console.log(`Node Number: ${count} \n \n \n`)
    count = count + 1
  })
}



module.exports = parseJson
