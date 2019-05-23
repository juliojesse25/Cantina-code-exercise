'use strict'

// Require the fs module
const fs = require('fs')
// Require the readline module
const readline = require('readline')

// Declare an empty array `answer` to store Views
const answer = []
// Initialize a variable count for numbering the views in the output
let count = 1

// Declare a function `parseJson` which takes an `inFile` as a parameter
const parseJson = function(inFile) {
  // Use the readline module
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  })

  // read the contents of the `inFile`
  fs.readFile(inFile, 'utf8', (err, fileContents) => {
    // if an error occurs in the process
    if (err) {
      // print the error in the terminal
      console.error(err)
      return
    }

    // try statement to test for errors
    try {
      // Store the resulting javascript object in a variable `pojo`
      const pojo = JSON.parse(fileContents)

      // Get input from the user
      rl.question(">>Enter a selector ", function(userInput){
        console.log(`\n\n\n Views that match ${userInput} selector`)

        // call the function `reader` with the subviews array in the
        // resulting javascript object and the userInput as arguments
        reader(pojo['subviews'], userInput)
        // Call the function `printAnswers` on the `answer` array
        printAnswers(answer)
        // Print the total number of printed views to the terminal
        console.log(`Total number of DOM nodes ${answer.length} \n\n`)

        // Close the readline interface
        rl.close()
      })
      // catch statement to handle an error if it occurs
      }catch(err) {
      console.error(err)
      }
  })
}

// Declare a function reader that takes a `view` and `userInput` as parameters
function reader(parentSubview, userInput){
  // Check if the view is an array
  if(parentSubview.length){
    //map over the array
    parentSubview.map(view =>{
      // Check if the userInput is a selector in the view
      if (filterSelector(view, userInput)){
        // Add the view to the answer array
        answer.push(view)
      }
      if(view['subviews']){
        reader(view['subviews'], userInput)
      } else if(view['contentView']) {

        if(view['contentView']['subviews'].length){
          const contentSubview = view['contentView']['subviews']
          contentSubview.map(element =>{
            if (filterSelector(element, userInput) ){
              answer.push(element)
            }
            if(element['control']){
              if (filterSelector(element['control'], userInput)){
                answer.push(element)
              }
            }
          })
        }

      }
    })
  }
}

// Declare a function `filterSelector` that takes a view and userInput
function filterSelector(node, userInput){
  // Check if the userInput is equal to an `identifier`, a `class` or
  // `classNames` in the view
  if(
      node['identifier'] === userInput  || node['class'] === userInput
  ){
      return true
  } else if (
      node['classNames'] && node['classNames'].indexOf(userInput) >= 0
  ){
    return true
  }
  // return false if userInput doesn't match any selector.
  return false
}

// Declare a function `printAnswers` that takes the `answers` array
// as a parameter
function printAnswers(answers){
  // map over the answers array
  answers.map(item=>{
    // Print the views
    console.log(item)
    // Add node number to each view
    console.log(`Node Number: ${count} \n \n \n`)
    count = count + 1
  })
}



module.exports = parseJson
