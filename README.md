# Cantina Code Exercise
## Overview
A JavaScript command line program that takes a Json file as a command line argument and a selector and then returns the matching views. To run this program, you should have **Node** installed.

## How to install
- Fork and clone the repo.
- Install dependencies with **npm install**

## How to run the program

In the project directory run the command
 `node solution/bin/code-exercise.js ./SystemViewController.json`
 and then you will be prompted to enter a selector.
 The program will then return views matching the selector you have entered.

## Implemented features

- Command line JavaScript program.
- Takes a Json file as command line argument.
- Parse the Json.
- Take user input as a selector on `stdin`.
- Print matching views.

## Future Features
- Cater for `Compound selectors`.
- Cater for `Selector chains`.
