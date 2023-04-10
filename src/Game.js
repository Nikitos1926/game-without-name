const QWERTY_KEYBOARD = ["qwertyuiop", "asdfghjkl", "zxcvbnm"];

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
	currentWord = "";
	guessedChar = "";
	triesCount = 0;

	constructor() {
		document
			.getElementById("playButton")
			.addEventListener("click", () => this.startGame());
		document
			.getElementById("nextWordButton")
			.addEventListener("click", () => this.getNewWord());
	}

	startGame() {
		this.refreshWordToGuess();
		this.createScreenKeyboard();
		document.getElementById(
			"triesCountLabel"
		).textContent = `(${this.triesCount})`;
		document.getElementById("playButton").textContent = "Restart";
		document.getElementById("game").classList.add("started");
	}

	refreshWordToGuess() {
		if (this.words.length === 0) {
			throw new Error("No words available");
		}
		const randomArrayIndex = _.random(0, this.words.length - 1);
		const [randomWord] = this.words.splice(randomArrayIndex, 1);
		this.currentWord = randomWord;
		document.getElementById("currentWord").textContent = randomWord.replace(
			/[a-z]/gi,
			"_ "
		);
		this.guessedWords.push(randomWord);
	}

	createScreenKeyboard() {
		let screenKeyboardEl = document.getElementById("screenKeyboard");
		let keyboardHtml = QWERTY_KEYBOARD.map(
			(row) =>
				`<div class="keyboard-row">${row
					.split("")
					.map(
						(char) =>
							`<button class="keyboard-key" data-key="${char}">${char}</button>`
					)
					.join("")}
      </div>`
		).join("");

		screenKeyboardEl.innerHTML = keyboardHtml;
		screenKeyboardEl.querySelectorAll(".keyboard-key").forEach((keyEl) => {
			keyEl.addEventListener("click", () => {
				this.handleKeyButtonClick(keyEl.dataset.key);
			});
		});
	}

	getNewWord() {
		try {
			this.refreshWordToGuess();
			this.triesCount = 0;
			document.getElementById(
				"triesCountLabel"
			).textContent = `(${this.triesCount})`;
		} catch {
			alert("You completed the game");
		}
	}

	searchMatches(alphabetChar) {
		if (this.currentWord.split("").indexOf(alphabetChar) !== -1) {
			this.replaceLetters(alphabetChar);
		}
	}

	replaceLetters(alphabetChar) {
		this.guessedChar += alphabetChar;
		let regex = new RegExp(`[^${this.guessedChar}]`, "gi");
		document.getElementById("currentWord").textContent =
			this.currentWord.replace(regex, " _ ");
	}

	handleKeyButtonClick(char) {
		if (
			document.getElementById("currentWord").textContent.indexOf("_") === -1
		) {
			alert("You guessed the word");
			return;
		}
		document.getElementById("triesCountLabel").textContent = `(${++this
			.triesCount})`;
		this.searchMatches(char);
	}
}
