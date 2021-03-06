//Program where the human guesses the computers secret number
const readline = require('readline');

const rl = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
	return new Promise((resolve, reject) => {
		rl.question(questionText, resolve);
	});
}
// human enters guess.
async function guessMaker(secretNumber) {
	const guessDirty = await ask('What is your guess? ');

	const guess = Number.parseFloat(guessDirty);

	//if guess is correct you are congratulated and the program is exited
	if (guess === secretNumber) {
		console.log('You got it! Not bad for a human.');

		process.exit();
	}
	//if the guess is incorrect you are sent to receive the computers response
	if (guess !== secretNumber) response(guess, secretNumber);
	newGuessDirty = await ask('What is your new guess?');

	guess = Number.parseFloat(newGuessDirty);

	response(newGuess, secretNumber);
}

function response(guess, secretNumber) {
	//feedback given to the human guesser that sends sends you back to the guessing stage.
	if (guess > secretNumber) {
		console.log('Your guess is too high. \n Try again. ');

		guessMaker(secretNumber);
	}

	if (guess < secretNumber) {
		console.log('Your guess is too low. \n Try again.');

		guessMaker(secretNumber);
	}
}

start();

async function start() {
	console.log(
		"Lets play a game where I (computer) think of a number\nAnd you (human) have to guess what number I'm thinking of. "
	);
	//takes in user input to set the range of the game
	const maxDirty = await ask('What is the highest my number may be? ');
	// cleans the input to add functionality for equations
	const max = Number.parseFloat(maxDirty);

	const minDirty = await ask('What is the lowest my number may be? ');

	const min = Number.parseFloat(minDirty);

	console.log('Alright then the number will be between ' + min + ' and ' + max);

	const difference = Number.parseFloat(max - min);
	// equation using the human entered range inputs to generate a secret number
	const startingNumber = Math.floor(Math.random() * difference) + min;

	// the computer selects and sanitizes a random number between min and max
	const secretNumber = Number.parseFloat(startingNumber);

	//a guess is given
	await guessMaker(secretNumber);
	//you receive feedbacck based on your guess
	response(guess, secretNumber);
}
