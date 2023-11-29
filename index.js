import readline from 'readline';
import wordBank from './word-bank.js';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const getRandomWord = () => {
  const randomIndex = Math.floor(Math.random() * wordBank.length);
  return wordBank[randomIndex].toLowerCase();
};

const displayWord = (word, guessedLetters) => {
  let displayedWord = '';
  for (const char of word) {
    if (guessedLetters.includes(char)) {
      displayedWord += char;
    } else {
      displayedWord += '_';
    }
  }
  return displayedWord;
};

const drawStickman = (incorrectGuesses) => {
  const Stickman = [ 
    '   O',
    '   |',
    '  /|\','
      / \'
  

  console.log('\nIncorrect Guesses:');
  for (let i = 0; i < incorrectGuesses; i++) {
    console.log(Stickman[i]);
  }
};

const isGameWon = (word, guessedLetters) => {
  return word.split('').every(char => guessedLetters.includes(char));
};

const startGame = () => {
  let wins = 0;
  let losses = 0;

  const playRound = () => {
    const targetWord = getRandomWord();
    const guessedLetters = [];
    let incorrectGuesses = 0;

    console.log('Would You Like To Play A Game?');
    console.log('Push Down Ctrl + c To End Your Game.'); 

    const playAgain = () => {
      rl.question('Test Yourself Again?! (yes/no)): ', answer => 
        if (answer.toLowerCase() === 'yes') {
          playRound();
        } else {
          console.log('We Hope You Had Fun Playing!');
          console.log('Wins:', wins);
          console.log('Losses:', losses);
          rl.close();
        }
      }
    };

    const playOneRound = () => {
      console.log('\nWord:', displayWord(targetWord, guessedLetters));
      console.log('Guessed Letters:', guessedLetters.join(', '));
      console.log('Attempts Left:', 4 - incorrectGuesses);

      rl.question('Guess A Letter: ', answer => {

      const guessedLetter = answer.toLowerCase();

        if (guessedLetters.includes(guessedLetter)) {
          console.log('Nope Try Again...');
        } 
          else if (targetWord.includes(guessedLetter)) {
          guessedLetters.push(guessedLetter);
          if (isGameWon(targetWord, guessedLetters)) {
            console.log('YaY You Got It... Your Word Was:', targetWord);
            wins++;
            playAgain();
          } 
            else {
            playOneRound();
          }
        } 
          else {
          incorrectGuesses++;
          drawStickman(incorrectGuesses);

          if (incorrectGuesses === 6) {
            console.log('I Am Sorry!  The Word Was:', targetWord);
            losses++;
            playAgain();
          } 
            else {
            console.log('Well Hey There...');
            playOneRound();
          }
        }
      });
    };

    playOneRound();
  };

  playRound();
;

startGame();



const wordBank = ['The Book'];
export default wordBank;