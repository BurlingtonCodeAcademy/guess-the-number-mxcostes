const readline = require('readline');
const rl = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
  return new Promise((resolve, reject) => {
    rl.question(questionText, resolve);
  });
}

start();

async function start() {
  console.log("Let's play a game where you (human) make up a number and I (computer) try to guess it.")
  let secretNumber = await ask("What is your secret number?\nI won't peek, I promise...\n");
  console.log('You entered: ' + secretNumber);
  // Now try and complete the program.
  let max = 100
  let min = 0
  let guess = Math.floor(Math.random()*(max - min) + min)
  console.log(" The Computer guess " + guess)
  //If the computer guess over secretNumber, ask to guess lower and change range to below first guess
  if (guess > secretNumber){
    console.log("Sorry, guess lower")
    // New Guess assigning random number with lower ceiling.
    let guessLower = Math.floor(Math.random()*(guess - min) + min)
    console.log("Computer guesses " + guessLower)
  // If the guess is under secretNumber, ask to guess higher and change range to above first guess
  } if (guess < secretNumber){
    console.log("Sorry, guess higher.")
    // New guess assinging random number with new floor. STILL NEEDS WORK
    let guessHigher = Math.floor(Math.random()*(max - guess) + guess)
    console.log("Computer guesses " + guessHigher)
  }  else if (guess === secretNumber){
    //If guess is correct
    console.log("You got it! Congratulations the secret number is in fact " + secretNumber)
  }

  process.exit();
}
