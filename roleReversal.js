//Program where the human guesses the computers secret number
const readline = require('readline');

const rl = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
    return new Promise((resolve, reject) => {
        rl.question(questionText, resolve);
    });
}

async function guessMaker(secretNumber) {
    const guessDirty = await ask('What is your guess? ');

    const guess = Number.parseFloat(guessDirty);

    if (guess === secretNumber) {
        console.log('You got it! Not bad for a human.');

        process.exit();
    }
    if (guess !== secretNumber) response(guess, secretNumber);
    newGuessDirty = await ask('What is your new guess?');

    guess = Number.parseFloat(newGuessDirty);

    response(newGuess, secretNumber);
}

function response(guess, secretNumber) {
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

    const max = await ask('What is the highest my number may be? ');

    console.log('Alright then the number will be between 0 and ' + max);

    const startingNumber = Math.floor(Math.random() * max);

    const secretNumber = Number.parseFloat(startingNumber);

    await guessMaker(secretNumber);

    response(guess, secretNumber);
}
