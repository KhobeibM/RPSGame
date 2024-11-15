// Creating a score object
const score = {
    wins: 0,
    losses: 0,
    ties: 0
};

// Listening to the Storage event to check for saved score
window.addEventListener('storage', updateScore());

// Generating the computer move in a random manner
function generateComputerMove(userMove) {
    // Using the random() function to generate a random value
    // between 0 and 1
    const randomNumber = Math.random();
    // Creating the computer move variable
    let computerMove = '';

    // Checking the random value based on the previous assumption
    if (randomNumber >= 0 && randomNumber < 1 / 3) {
        computerMove = "Rock";
    }
    else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
        computerMove = "Paper";
    }
    else if (randomNumber >= 2 / 3 && randomNumber < 1) {
        computerMove = "Scissors";
    }

    // Displaying both moves
    //console.log(`User: ${userMove} --- Computer: ${computerMove}`);

    // Calling the compare moves method
    compareChoices(userMove, computerMove);
}

// Creating the comparsion method
function compareChoices(userChoice, computerChoice) {
    // Creating a variable to store the comparison result
    let theResult = '';

    // Comparing the moves
    if (userChoice === computerChoice) {
        theResult = "Tie.";
    }
    else if (userChoice === "Rock" && computerChoice === "Paper") {
        theResult = "You lose.";
    }
    else if (userChoice === "Rock" && computerChoice === "Scissors") {
        theResult = "You win.";
    }
    else if (userChoice === "Paper" && computerChoice === "Rock") {
        theResult = "You win.";
    }
    else if (userChoice === "Paper" && computerChoice === "Scissors") {
        theResult = "You lose.";
    }
    else if (userChoice === "Scissors" && computerChoice === "Rock") {
        theResult = "You lose."
    }
    else if (userChoice === "Scissors" && computerChoice === "Paper") {
        theResult = "You win.";
    }

    // Updating the score object
    if (theResult === "You win.") {
        score.wins += 1;
    }
    else if (theResult === "You lose.") {
        score.losses += 1;
    }
    else if (theResult === "Tie.") {
        score.ties += 1;
    }

    // Using localStorage to maintain the current score
    // Since localStorage works with text data, we need to serialize the score object
    localStorage.setItem('Score', JSON.stringify(score));

    // Calling the displayResults function
    displayResults(theResult, userChoice, computerChoice);

    //console.log(`You picked: ${userChoice}. Computer picked: ${computerChoice}. Result: ${theResult}\nWins: ${score.wins} - Losses: ${score.losses} - Ties: ${score.ties}`);
}

// Creating a counter reset function
function resetCounters() {
    score.wins = 0;
    score.losses = 0;
    score.ties = 0;

    // Deleting the availabel stored score
    localStorage.removeItem("Score");

    // Informing the user with the current score
    displayResults();
    console.log(`Score has been reset. This is a fresh start.\nWins: ${score.wins} - Losses: ${score.losses} - Ties: ${score.ties}`);
}

// Creating a score update function
function updateScore(e) {
    // Getting the data from the localStorage and converting them back to JavaScript object
    let newScore = JSON.parse(localStorage.getItem('Score'));
    // Checking if the newScore is empty
    if (newScore === null) {
        alert("There is no saved data..");
    } else {
        alert("Saved score available..");
        score.wins = newScore.wins;
        score.losses = newScore.losses;
        score.ties = newScore.ties;
    }
}

// Creating a function to display full output
function displayResults(result = "New Game", userStep = "No Moves", computerStep = "No Moves") {
    // Displaying the comparison result
    // Linking to the pparagraph elements
    let theResultDisplay = document.querySelector(".jsResult");
    let theMovesDisplay = document.querySelector(".jsMoves");
    let theScoreDisplay = document.querySelector(".jsScore");

    // Populating the text inside the paragraph elements
    theResultDisplay.innerHTML = result;
    theMovesDisplay.innerHTML = `You
<img src="./images/${userStep}Final.png" class="moveIcon">
<img src="./images/${computerStep}Final.png" class="moveIcon">
Computer.`;
    theScoreDisplay.innerHTML = `Wins: ${score.wins} - Losses: ${score.losses} - Ties: ${score.ties}`;
}