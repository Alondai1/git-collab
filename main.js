/*
1. Player must guess a number between min and max
2. Player gets a certain amount of guesses
3. Notify player of guesses remaining
4. Notify the player of the correct answer if loose
5. Let player choose to play again

*/

let min = 1,
    max = 10,
    winnigNum = getRandomNum(min, max),
    guessesLeft = 3;

const minNumUI = document.querySelector('.min-num'),
      maxNumUI = document.querySelector('.max-num'),
      guessBtnUI = document.querySelector('.guess-btn'),
      guessInputUI = document.querySelector('.guess-input'),
      messageUI = document.querySelector('.message'),
      gameWrapperUI = document.querySelector('.game');

minNumUI.textContent = min;
maxNumUI.textContent = max;

guessBtnUI.addEventListener('click', function() {
    const guess = parseInt(guessInputUI.value);
    
    if(isNaN(guess) || guess < min || guess > max) {
        setMessage(`Please enter a number between ${min} and ${max}`, 'red');
    }else {
        if(guess === winnigNum) {
            gameOver(true, `${winnigNum} is correct, YOU WIN!`);
        }else {
            guessesLeft -= 1;

            if (guessesLeft === 0) {
                gameOver(false, `Game over, You Lost! The correct number was ${winnigNum}`);
            }else {
                guessInputUI.style.borderColor = 'orange';

                guessInputUI.value = '';

                if(guess > winnigNum) {
                    setMessage(`${guess} is not correct, Go Lower, ${guessesLeft} Guesses Left!`, 'orange');
                }
                else if(guess < winnigNum) {
                    setMessage(`${guess} is not correct, Go Higher, ${guessesLeft} Guesses Left!`, 'orange');
                }
            }
        }
    }
});

// playagain event
gameWrapperUI.addEventListener('mousedown', function(e) {
    if(e.target.classList.contains('play-again')) {
        window.location.reload();
    }
});

function gameOver(won, msg) {
    let color;
    won === true ? color = 'green' : color = 'red';

    guessInputUI.disabled = true;
    guessInputUI.style.borderColor = color;

    setMessage(msg, color);

    // After GameOver
    guessBtnUI.value = 'Play Again';
    guessBtnUI.className += ' play-again';
}

function setMessage(msg, color) {
    messageUI.style.color = color;
    messageUI.textContent = msg;
}

function getRandomNum(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}