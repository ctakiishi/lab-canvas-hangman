class Hangman {
  constructor(words) {
    this.words = words;
    this.secretWord = this.pickWord();
    this.letters = [];
    this.guessedLetters = '';
    this.errorsLeft = 10;
  }

  pickWord() {
    const wordChosen = this.words[Math.floor(this.words.length * Math.random())];
    return wordChosen;
  }

  checkIfLetter(keyCode) {
    this.keyCode = keyCode;
    if (this.keyCode >= 65 && this.keyCode <= 90) {
      return true;
    }
    return false;
  }

  checkClickedLetters(letter) {
    this.letter = letter;
    const alreadyPressed = () => {
      if (this.letters.includes(this.letter)) {
        return false;
      }
      return true;
    };
    return alreadyPressed();
  }

  addCorrectLetter(letter) {
    this.letter = letter;
    this.guessedLetters += this.letter;
    return this.guessedLetters;
  }

  addWrongLetter(letter) {
    this.letter = letter;
    this.errorsLeft -= 1;
    this.letters.push(this.letter);
  }

  checkGameOver() {
    if (this.errorsLeft > 0) {
      return false;
    }
    return true;
  }

  checkWinner() {
    const wordArray = this.secretWord.split('');
    let count = 0;

    for (let i = 0; i < wordArray.length; i++) {
      if (this.guessedLetters.includes(wordArray[i])) {
        count += 1;
      }
    }

    if (wordArray.length === count) {
      return true;
    }
    return false;
  }
}

let hangman;
let hangmanCanvas;

const startGameButton = document.getElementById('start-game-button');

if (startGameButton) {
  startGameButton.addEventListener('click', event => {
    hangman = new Hangman(['node', 'javascript', 'react', 'miami', 'paris', 'amsterdam', 'lisboa']);
    hangmanCanvas = new HangmanCanvas(hangman.secretWord);
    hangmanCanvas.createBoard();
  });
}

document.addEventListener('keydown', (event) => {
  if (!hangman.checkGameOver() && !hangman.checkWinner()) {
    const check = hangman.checkIfLetter(event.keyCode);
    if (check) {
      const clicked = hangman.checkClickedLetters(event.key.toLowerCase());
      if (clicked) {
        if (hangman.secretWord.includes(event.key)) {
          hangman.addCorrectLetter(event.key);
          hangmanCanvas.writeCorrectLetter(event.key);
          console.log(event.key);
          if (hangman.checkWinner()) {
            hangmanCanvas.winner();
          }
        } else {
          hangman.addWrongLetter(event.key);
          hangmanCanvas.writeWrongLetter(event.key, hangman.errorsLeft);
          hangmanCanvas.drawHangman(hangman.errorsLeft);
          if (hangman.checkGameOver()) {
            hangmanCanvas.gameOver();
          }
        }
      }
    } else {
      alert('Somente letras do alfabeto!');
    }
  }
});
