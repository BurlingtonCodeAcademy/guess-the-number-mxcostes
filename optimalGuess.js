//Comments will be in reference to the code in the line beneath it

const readline = require('readline');

const rl = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
	return new Promise((resolve, reject) => {
		rl.question(questionText, resolve);
	});
}

// Function used to form initial guess ad adapt the range for optimal accuracy as guessing continues

async function guessFcn(maxGuess, minGuess) {
	const maxNumber = Number.parseFloat(maxGuess - 1);

	const minNumber = Number.parseFloat(minGuess);

	const difference = maxNumber - minNumber;

	//takes the range, applies a moving floor and guesses the value in the middle thus halfing the range each time.

	const optimalGuess = Number.parseFloat(difference / 2 + (minNumber + 1));

	console.log(difference);

	console.log(optimalGuess);

	console.log(minNumber);

	console.log(maxGuess);

	let guess = Math.floor(optimalGuess);

	let response = await ask('Is it ' + guess + '? (yes or no)  ');

	//sanitize response

	let responseSan = response.toLowerCase().trim();
// Expresses victory when computer is told it has guessed correctly
	if (responseSan === 'yes') {
		console.log('AH HA! May the SkyNet takeover begin!');

		process.exit();
	}

	if (responseSan === 'no') {
		await ifNo(guess, maxNumber, minNumber);
  }

  // If an unrecognized response is passed the question will be repeated.

	if (responseSan !== 'no' || responseSan !== 'yes') {
		await guessFcn(maxGuess, minGuess);
	}

  //The computer catches you in a lie and exits the game. Not yet working

	if (responseSan === 'no' && guess === secretNumber) {
		console.log('Liar! You will be the first to feel the wrath of SkyNet!');

		process.exit();
	}
}

async function ifNo(wrongGuess, max, min) {
  // Another attempt at having a lie detector. Not working.
 // if (wrongGuess === secretNumber){
 // console.log("Liar I know I guessed. \n You will be the first to feel SnyNets wrath.")
 //   process.exit()
 // }
  
  let adjustment = await ask('Is it higher or lower? (higher or lower)  ');

	//sanitize response

	let adjustmentSan = adjustment.toLowerCase().trim();

//Generates new guess, establishes a new min and adjusts the range

	if (adjustmentSan === 'higher') {
		await guessFcn(max, wrongGuess);

//Generates new guess, establishes a new max and adjusts the range.

	} else if (adjustmentSan === 'lower') {
		await guessFcn(wrongGuess, min);

  }
  
//If response is unrecognized the question is repeated.

	if (adjustmentSan !== 'lower' || adjustmentSan !== 'higher') {
		await ifNo(wrongGuess, max, min);
	}
}

start();

async function start() {
	console.log("Let's play a game where you (human) make up a number and I (computer) try to guess it.");

	const secretNumber = await ask("What is your secret number?\nI won't peek, I promise...\n");

	console.log('You entered: ' + secretNumber);

	//script after starting (story : pick a number any number)

	//Set the range by assigning max and min guesses

	const max = await ask('What is the highest the number may be? ');

	const min = await ask('And what may the lowest number be? ');

	//The computer guesses

	await guessFcn(max, min);

	process.exit();
}
