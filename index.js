const readline = require('readline');
const rl = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
	return new Promise((resolve, reject) => {
		rl.question(questionText, resolve);
	});
}

start();

async function start() {
	console.log("Let's play a game where you (human) make up a number and I (computer) try to guess it.");
	let secretNumber = await ask("What is your secret number?\nI won't peek, I promise...\n");
	console.log('You entered: ' + secretNumber);
	//script after starting (story : pick a number any number)
	//Set the range by assigning max and min guesses
	let max = await ask('What is the highest the number may be? ');
	let min = await ask('And what may the lowest number be? ');
	// Now try and complete the program.
	//The computer guesses
	let guess = Math.floor(Math.random() * (max - min) + min);
	let response = await ask('Is it ' + guess + '? (yes or no)  ');
	//sanitize response
	let responseSan = response.toLowerCase().trim();
	if (responseSan === 'yes') {
		console.log('Conratulations you have guessed the number.');
		process.exit();
	}
	if (responseSan === 'no') {
		let adjustment = await ask('Is it higher or lower? (higher or lower)  ');
		//sanitize response
		let adjustmentSan = adjustment.toLowerCase().trim();
		if (adjustmentSan === 'higher') {
			higher(guess);
		} else if (adjustmentSan === 'lower') {
			lower(guess);
		}
	}

	//Funcitons
	//Function to change ange to lower ceiling

	async function lower(num) {
		// New Guess assigning random number with lower ceiling.
		let guessLower = Math.floor(Math.random() * (guess - min + 1) + min);
		let lowerGuess = await ask('Is it ' + guessLower + '(yes or no)   ');
		if (lowerGuess === 'no') {
			//loop to no funciton
		}
		if (lowerGuess === 'yes') {
			//loop to yes funciton
		}
	}

	async function higher(num) {
		// New guess assessing random number with new floor. STILL NEEDS WORK
		let guessHigher = Math.floor(Math.random() * (max - guess + 1) + guess);
		let higherGuess = await ask('Is it ' + guessHigher + '(yes or no)   ');
		if (higherGuess === 'yes') {
			//input yes funciton
		}
		if (higherGuess === 'no') {
			// input no funciton
		}
	}

	process.exit();
}
