const readline = require('readline');

const rl = readline.createInterface(process.stdin, process.stdout);

 

function ask(questionText) {

  return new Promise((resolve, reject) => {

    rl.question(questionText, resolve);

  });

}

 

async function guessFcn(maxGuess, minGuess) {

    const maxNumber = Number.parseFloat((maxGuess - 1))

    const minNumber = Number.parseFloat(minGuess)

    const difference = (maxNumber - minNumber);

    const random = Math.random();

    const product = Number.parseFloat((random * difference) + 1);

//alternative for optimal solution

   // const = rawGuess = (Number())

//used for random guess

    const rawGuess = (Number(product)) + Number(minGuess);

    console.log(difference)

    console.log(random)

    console.log(product)

    console.log(rawGuess)

    console.log(minNumber)

    console.log(maxGuess)

  let guess = Math.floor(rawGuess); 

  let response = await ask('Is it ' + guess + '? (yes or no)  ');

  //sanitize response

  let responseSan = response.toLowerCase().trim();

  if (responseSan === 'yes') {

    console.log('Conratulations you have guessed the number.');

    process.exit();

  }

  if (responseSan === 'no') {

    await ifNo(guess, maxNumber, minNumber);

  }

}

 

async function ifNo(wrongGuess, max, min) {

  let adjustment = await ask('Is it higher or lower? (higher or lower)  ');

  //sanitize response

  let adjustmentSan = adjustment.toLowerCase().trim();

  if (adjustmentSan === 'higher') {

    await guessFcn(max, wrongGuess)

    //higher(guess);

  } else if (adjustmentSan === 'lower') {

    await guessFcn(wrongGuess, min)

    //lower(guess);

  }

}

 

start();

 

async function start() {

  console.log("Let's play a game where you (human) make up a number and I (computer) try to guess it.");

  let secretNumber = await ask("What is your secret number?\nI won't peek, I promise...\n");

  console.log('You entered: ' + secretNumber);

  //script after starting (story : pick a number any number)

  //Set the range by assigning max and min guesses

  const max = await ask('What is the highest the number may be? ');

  const min = await ask('And what may the lowest number be? ');

  // Now try and complete the program.

  //The computer guesses

  

  await guessFcn(max, min)

 

  process.exit();

}