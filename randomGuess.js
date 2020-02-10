const readline = require('readline');

const rl = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
	return new Promise((resolve, reject) => {
		rl.question(questionText, resolve);
	});
}

async function guessFcn(maxGuess, minGuess) {
  //funciton takes the changing min and max and makes a random guess within the parameters
	const maxNumber = Number.parseFloat(maxGuess);

	const minNumber = Number.parseFloat(minGuess);

	const difference = maxNumber - minNumber;

	const random = Math.random();

	const product = Number.parseFloat(random * difference);

	const rawGuess = Number(product) + Number(minGuess + 1);

	let guess = Math.floor(rawGuess);

	let response = await ask('Is it ' + guess + '? (yes or no)  ');

	//sanitize response

	let responseSan = response.toLowerCase().trim();

	if (responseSan === 'yes') {
		console.log('Conratulations you have guessed the number.');

		process.exit();
	}

	if (responseSan === 'no') {
    //triggers if no response giving the computer guidance
		await ifNo(guess, maxNumber, minNumber);
	}

	if (responseSan !== 'no' || responseSan !== 'yes') {
    // repeats question when recieving unrecognized responses
		await guessFcn(maxGuess, minGuess);
	}
}

async function ifNo(wrongGuess, max, min) {
	let adjustment = await ask('Is it higher or lower? (higher or lower)  ');

	//sanitize response

	let adjustmentSan = adjustment.toLowerCase().trim();

	if (adjustmentSan === 'higher') {
		await guessFcn(max, wrongGuess);

		//higher(guess);
	} else if (adjustmentSan === 'lower') {
		await guessFcn(wrongGuess, min);

		//lower(guess);
	}

	if (adjustmentSan !== 'lower' || adjustmentSan !== 'higher') {
    // repeats the questions when an unrecognized response is received
		await ifNo(wrongGuess, max, min);
	}
}

start();

async function start() {
	console.log("Let's play a game where you (human) make up a number and I (computer) try to guess it.");
// secret number is establishes which the compuer will seek while adjusting guesses acoording to an adapting range
	let secretNumber = await ask("What is your secret number?\nI won't peek, I promise...\n");

	console.log('You entered: ' + secretNumber);

	//Set the range by assigning max and min guesses

	const max = await ask('What is the highest the number may be? ');

	const min = await ask('And what may the lowest number be? ');

	// Now try and complete the program.

	//The computer guesses

	await guessFcn(max, min);

	process.exit();
}
