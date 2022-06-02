const { Console } = require("console-mpds");
const console = new Console();

const playMastermind = () => {
  do {
    playGame();
  } while (isResumen());
}

const playGame = () => {
  const COLORS = ['r','g','b','y','c','m'];
  const COMBINATION_LENGTH = 4;
  const secretCombination = getSecretCombination(COLORS, COMBINATION_LENGTH);
  console.writeln(secretCombination);
  const maxAttempts = 11;
  let currentAttempt = 0;
  let winner;
  do{
    showBoard(currentAttempt);
    const proposedCombination = console.readString();
    const error = validateProposedCombination(proposedCombination, COLORS, COMBINATION_LENGTH);
    const resultProposedCombination = getResultProposedCombination(proposedCombination, secretCombination);
    winner = isWinner(resultProposedCombination) ;
    showResult(error, proposedCombination, resultProposedCombination);
    if(!error) {
      currentAttempt += 1;
    }
  }
  while(!winner && currentAttempt < maxAttempts);
  showIsWinnerOrLost(winner);
}

const getSecretCombination = (COLORS, COMBINATION_LENGTH) => {
  const secretCombination = [];
  do{
    let randomColor = COLORS[parseInt(Math.random() * 6)];
    if(!isRepeatSecretCombination(randomColor, secretCombination)) {
      secretCombination[secretCombination.length] = randomColor;
    }
  }while(secretCombination.length !== COMBINATION_LENGTH);
  return secretCombination;
}

const showBoard = (currentAttempt) => {
  const firstAttempts = 0;
  if(currentAttempt === firstAttempts) {
    console.writeln('----- MASTERMIND -----');
  }
  console.writeln(`${currentAttempt} attempt(s):`);
  console.writeln('****');
  console.write(`Propose a combination: `);
}

const validateProposedCombination = (proposedCombination, COLORS, COMBINATION_LENGTH) => {
  let error;
  if(proposedCombination.length !== COMBINATION_LENGTH) {
    error = 'Wrong proposed combination length';
    return error
  }
  for (let i = 0; i < COMBINATION_LENGTH; i++) {
    let hasColor = false;
    for (let j = 0; j < COLORS.length; j++) {
      if(proposedCombination[i] === COLORS[j]) {
        hasColor = true;
      }
    }
    if (!hasColor) {
      error = 'Wrong colors, they must be';
      return error
    }
  }
  return error;
}

const getResultProposedCombination = (proposedCombination, secretCombination) => {
  let blacks = 0;
  let whites = 0;
  for (let i = 0; i < proposedCombination.length; i++) {
    for (let j = 0; j < secretCombination.length; j++) {
      if(proposedCombination[i] === secretCombination[j]) {
        if(i === j) {
          blacks += 1;
        }else {
          whites += 1;
        }
      }
    }
  }
  return [blacks + ' blacks', whites + ' whites'];
}

const isWinner = (resultProposedCombination) => {
  const indexBlacks = 0;
  if(resultProposedCombination[indexBlacks] === '4 blacks') {
    return true;
  }
  return false;
}

const showResult = (error, proposedCombination, resultProposedCombination) => {
  const indexBlacks = 0;
  const indexWhites = 1;
  console.writeln(`${proposedCombination} --> ${resultProposedCombination[indexBlacks]} and ${resultProposedCombination[indexWhites]}`);
  console.writeln(error);
}

const isRepeatSecretCombination = (color, secretCombination) => {
  if(secretCombination.length === 0) {
    return false;
  }
  for (let i = 0; i < secretCombination.length; i++) {
    if(secretCombination[i] === color) {
      return true;
    }
  }
  return false;
}

const isResumen = () => {
  const answer = console.readString(`Do you want to continue? (y/n): `);
  return answer == 'y' ? true : false;
}

const showIsWinnerOrLost = (winner) => {
  if(winner) {
    console.writeln(`You've won!!! ;-`);
  }else {
    console.writeln(`You've lost!!! :-(`);
  }
}

playMastermind();