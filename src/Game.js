class Game {
  words = [
    "word",
    "cat",
    "dog",
    "read",
    "vintorez",
    "alexeychikk",
    "andrey",
    "nikitos",
  ];
  guessedWords = [];
  usedWord = "";
  guessedChar = "";
  turnCount = 0;

  getNewStartString() {
    const randomArrayIndex = _.random(0, this.words.length - 1);
    if (this.words.length === 0) {
      throw new Error("No words available");
    }
    const randomWord = this.words[randomArrayIndex];
    this.usedWord = randomWord;
    document.getElementById("string-with-word").textContent =
      randomWord.replace(/[a-z]/gi, "_ ");
    this.guessedWords.push(this.words[randomArrayIndex]);
    this.words.splice(randomArrayIndex, 1);
  }

  createAlphabetButtons() {
    let alphabetElement = document.getElementById("ABC");
    let alphabetInnerHtml = "";
    for (let i = 0; i < 26; i++) {
      alphabetInnerHtml += `<button class="alphabet-char" id="alphabet-char-${
        i + 97
      }">${String.fromCharCode(i + 97)}</button>`;
    }
    alphabetElement.innerHTML = alphabetInnerHtml;
  }

  startGame() {
    this.getNewStartString();
    this.createAlphabetButtons();
    this.registerEvents();
    document.getElementById("turn-count").textContent = `(${this.turnCount})`;
    document.getElementById("play").textContent = "Restart";
    document.getElementById("next-word").style.display = "block";
  }

  getNewWord() {
    try {
      this.getNewStartString();
      this.turnCount = 0;
      document.getElementById("turn-count").textContent = `(${this.turnCount})`;
    } catch {
      alert("You completed the game");
    }
  }

  searchMatches(alphabetChar) {
    if (this.usedWord.split("").indexOf(alphabetChar) !== -1) {
      this.replaceLetters(alphabetChar);
    }
  }

  replaceLetters(alphabetChar) {
    this.guessedChar += alphabetChar;
    let regex = new RegExp(`[^${this.guessedChar}]`, "gi");
    document.getElementById("string-with-word").textContent =
      this.usedWord.replace(regex, " _ ");
  }

  handleClickButtonWithAlphabetChar(alphabetChar) {
    if (
      document.getElementById("string-with-word").textContent.indexOf("_") ===
      -1
    ) {
      alert("You guessed the word");
      return;
    }
    document.getElementById("turn-count").textContent = `(${++this.turnCount})`;
    this.searchMatches(alphabetChar);
  }

  registerEvents() {
    _.times(26, (i) => {
      const el = document.getElementById(`alphabet-char-${i + 97}`);
      el.onclick = () => this.handleClickButtonWithAlphabetChar(el.textContent);
    });
  }
}
