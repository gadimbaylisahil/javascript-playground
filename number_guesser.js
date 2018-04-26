// game values

let min = 1,
    max = 50,
    winningNum = getWinningNum(min, max),
    guessesLeft = 3;

const game = document.getElementById('game'),
      minNum = document.querySelector('.min-num'),
      maxNum = document.querySelector('.max-num'),
      guessBtn = document.querySelector('#guess-btn'),
      guessInput = document.querySelector('#guess-input'),
      message = document.querySelector('.message');

// Assign UI min and max
minNum.textContent = min;
maxNum.textContent = max;

game.addEventListener('mousedown', function (e) {
   if(e.target.className === 'play-again'){
       window.location.reload();
   }
});

// Listen for guess
guessBtn.addEventListener('click', function (e) {
    if (e.target.id === 'guess-btn'){

    }
    let guess = parseInt(guessInput.value);
    if(isNaN(guess)|| guess < min || guess > 10){
        setMessage(`Please enter the number between ${min} and ${max} `, 'red');
    }

    if (guess === winningNum){
        gameOver(true, `You won! Number was: ${winningNum}`)
    } else {
        guessesLeft -= 1;
        if (guessesLeft === 0){
            gameOver(false, `Game over, you lost. Correct number was ${winningNum}`)
        } else {
            guessInput.style.borderColor = 'red';
            guessInput.value = '';
            setMessage(`Wrong! Guesses left: ${guessesLeft}`, 'red');
        }
    }

    console.log(guess);
});


function setMessage(msg, color){
    message.textContent = msg;
    message.style.borderColor = color;
    message.style.color = color;
}

function gameOver(result, msg){
    let color;
    result === true ? color = 'green' : color = 'red';
    setMessage(msg, color);
    guessesLeft = 3;
    // Play Again
    guessBtn.value = 'Play Again?';
    guessBtn.className += 'play-again';
}

function getWinningNum(min, max){
    return Math.floor(Math.random() * (max-min+1) + min);
}