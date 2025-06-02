    let randomNumber;
    let attempts = 10;
    const maxAttempts = 10;
    let minRange, maxRange;

    function startGame() {
      minRange = parseInt(document.getElementById("min").value);
      maxRange = parseInt(document.getElementById("max").value);

      if (isNaN(minRange) || isNaN(maxRange) || minRange >= maxRange) {
        alert("Please enter a valid range (Min < Max)");
        return;
      }

      randomNumber = Math.floor(Math.random() * (maxRange - minRange + 1)) + minRange;
      attempts = maxAttempts;

      document.getElementById("rangeDisplay").textContent = `Guess a number between ${minRange} and ${maxRange}`;
      document.getElementById("rangeInput").style.display = "none";
      document.getElementById("gameArea").style.display = "block";
    }

    function checkGuess() {
      const guessInput = document.getElementById("guessInput");
      const guess = parseInt(guessInput.value);
      const message = document.getElementById("message");
      const attemptsLeft = document.getElementById("attemptsLeft");
      const restartBtn = document.getElementById("restartBtn");
      const hint = document.getElementById("hint");
      const successMessage = document.getElementById("successMessage");
      const card = document.querySelector(".card");
      const body = document.querySelector("body");

      if (isNaN(guess) || guess < minRange || guess > maxRange) {
        message.textContent = "Enter a valid number in the given range.";
        return;
      }

      attempts--;

      card.classList.remove("flash-low", "flash-high", "confetti-celebrate", "gameover-effect");
      body.classList.remove("celebrate-bg", "gameover-bg");

      if (guess === randomNumber) {
        message.textContent = "";
        successMessage.textContent = ` Correct! The number was ${randomNumber}.`;
        successMessage.style.display = "block";
        card.classList.add("confetti-celebrate");
        body.classList.add("celebrate-bg");
        guessInput.disabled = true;
        restartBtn.style.display = "block";
      } else {
        if (guess < randomNumber) {
          message.textContent = "Too low!";
          card.classList.add("flash-low");
          body.style.background = "#d6f0ff";
        } else {
          message.textContent = "Too high!";
          card.classList.add("flash-high");
          body.style.background = "#ffd6d6";
        }
        attemptsLeft.textContent = `Attempts left: ${attempts}`;

        setTimeout(() => {
          card.classList.remove("flash-low", "flash-high");
          body.style.background = "linear-gradient(135deg, #74ebd5, #acb6e5)";
        }, 1000);
      }

      if (attempts === 5) {
        hint.textContent = (randomNumber % 2 === 0) ? "Hint: The number is even." : "Hint: The number is odd.";
      }

      if (attempts === 0 && guess !== randomNumber) {
        message.textContent = ` Game Over! The number was ${randomNumber}.`;
        card.classList.add("gameover-effect");
        body.classList.add("gameover-bg");
        guessInput.disabled = true;
        restartBtn.style.display = "block";
      }

      guessInput.value = "";
    }

    function restartGame() {
      document.getElementById("min").value = "";
      document.getElementById("max").value = "";
      document.getElementById("rangeInput").style.display = "block";
      document.getElementById("gameArea").style.display = "none";
      document.getElementById("guessInput").disabled = false;
      document.getElementById("message").textContent = "";
      document.getElementById("attemptsLeft").textContent = "";
      document.getElementById("hint").textContent = "";
      document.getElementById("successMessage").style.display = "none";
      document.querySelector("body").classList.remove("celebrate-bg", "gameover-bg");
      document.querySelector("body").style.background = "linear-gradient(135deg, #74ebd5, #acb6e5)";
    }