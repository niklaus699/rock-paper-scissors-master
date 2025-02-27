const gameSection = document.getElementById('gameSection');
const paper = document.getElementById('paperButton');
const scissors = document.getElementById('scissorsButton');
const rock = document.getElementById('rockButton');
const rules = document.getElementById('rulesButton');
const scoreDisplay = document.getElementById('scoreInteger');
const triangleImage = document.getElementById('triangleId');
const body = document.getElementById('body');

let iWin = false;
let draw = false;
let score = parseInt(localStorage.getItem('rpsScore')) || 0;


let randomNumber = () => {
    return Math.floor(Math.random() * 3);
}

let computerChoice = randomNumber();
scoreDisplay.textContent = `${score}`;


const container = document.createElement('div');
container.className = 'mainDiv';

const firstContainer = document.createElement('div');
firstContainer.className = 'firstDiv';
firstContainer.style.display = 'grid';

const secondContainer = document.createElement('div');
secondContainer.className = 'secondDiv';
secondContainer.style.display = 'grid';

const youPicked = document.createElement('span');
youPicked.textContent = 'You Picked';
youPicked.className = 'you-picked-text';

const computerChoiceDiv = document.createElement('div');
computerChoiceDiv.className = 'house-pick';

const computerPicked = document.createElement('span');
computerPicked.textContent = 'The House Picked';
computerPicked.className = 'computer-picked-text';


const statusDisplay = document.createElement('div');
statusDisplay.className = 'win-lose-draw';
const statusTextContent = document.createElement('h2');
statusTextContent.className = 'win-lose-text';
const playAgain = document.createElement('button');
statusDisplay.append(statusTextContent, playAgain)
    /**
     * Clears #gameSection and appends only the clicked element.
     * Using cloneNode(true) ensures we copy the exact HTML of the clicked icon.
     * 
     */
const showOnlyClickedIcon = (iconElement, iconClass) => {
    // 1) Clear all children of #gameSection
    iconElement.style.position = '';
    gameSection.innerHTML = '';

    // 2) Clone the clicked icon so we don’t “move” the original out of the DOM
    const clone = iconElement.cloneNode(true);
    clone.removeAttribute('class');
    clone.classList.add('option-clicked');
    clone.classList.add(`${iconClass}`);
    // (Optional) Remove the original ID to avoid duplicates
    // clone.removeAttribute(`${iconId}`);
    firstContainer.appendChild(youPicked);
    firstContainer.appendChild(clone);
    secondContainer.appendChild(computerPicked);
    secondContainer.appendChild(computerChoiceDiv);
    statusDisplay.style.display = 'none';
    container.append(firstContainer, statusDisplay, secondContainer);


    gameSection.appendChild(container);
    gameSection.style.position = '';
    // if (computerChoice == 0) {

    // }
}

const computerIcon = document.createElement('img');
computerIcon.className = 'computer-icon';

paper.addEventListener('click', () => {
    computerChoice = randomNumber();
    showOnlyClickedIcon(paper, iconClass = 'option-paper-clicked');
    if (computerChoice == 2) {
        computerIcon.src = '/images/icon-rock.svg';
        computerChoiceDiv.className = 'option-clicked option-computer-rock-clicked';
        iWin = true;
        score += 1;
        localStorage.setItem('rpsScore', score);
        handleWinner(iWin, draw);
        scoreDisplay.textContent = `${score}`;
    }
    if (computerChoice == 1) {
        computerChoiceDiv.className = 'option-clicked option-computer-scissors-clicked';
        iWin = false;
        computerIcon.src = './images/icon-scissors.svg';
        if (score >= 1) {
            score -= 1;
            localStorage.setItem('rpsScore', score);
        }
        handleWinner(iWin, draw);
        scoreDisplay.textContent = `${score}`;
    }
    if (computerChoice == 0) {
        computerChoiceDiv.className = 'option-clicked option-computer-paper-clicked';
        draw = true;
        computerIcon.src = './images/icon-paper.svg';
        localStorage.setItem('rpsScore', score);
        handleWinner(iWin, draw);
        scoreDisplay.textContent = `${score}`;
    }
    computerChoiceDiv.appendChild(computerIcon);
    console.log(computerChoice);
});

scissors.addEventListener('click', () => {
    computerChoice = randomNumber();
    showOnlyClickedIcon(scissors, iconClass = 'option-scissors-clicked');
    if (computerChoice == 2) {
        computerChoiceDiv.className = 'option-clicked option-computer-rock-clicked';
        computerIcon.src = './images/icon-rock.svg';
        iWin = false;
        if (score >= 1) {
            score -= 1;
            localStorage.setItem('rpsScore', score);
        }
        handleWinner(iWin, draw);
        scoreDisplay.textContent = `${score}`;
    }
    if (computerChoice == 1) {
        computerChoiceDiv.className = 'option-clicked option-computer-scissors-clicked';
        computerIcon.src = './images/icon-scissors.svg';
        draw = true;
        handleWinner(iWin, draw);
    }
    if (computerChoice == 0) {
        computerChoiceDiv.className = 'option-clicked option-computer-paper-clicked';
        computerIcon.src = './images/icon-paper.svg';
        iWin = true;
        score += 1;
        localStorage.setItem('rpsScore', score);
        handleWinner(iWin, draw);
        scoreDisplay.textContent = `${score}`;
    }
    computerChoiceDiv.appendChild(computerIcon);
});

rock.addEventListener('click', () => {
    computerChoice = randomNumber();
    showOnlyClickedIcon(rock, iconClass = 'option-rock-clicked');
    if (computerChoice == 2) {
        computerChoiceDiv.className = 'option-clicked option-computer-rock-clicked';
        computerIcon.src = './images/icon-rock.svg';
        draw = true;
        handleWinner(iWin, draw);
        scoreDisplay.textContent = `${score}`;
    }
    if (computerChoice == 1) {
        computerChoiceDiv.className = 'option-clicked option-computer-scissors-clicked';
        computerIcon.src = './images/icon-scissors.svg';
        iWin = true;
        score += 1;
        localStorage.setItem('rpsScore', score);
        handleWinner(iWin, draw);
        scoreDisplay.textContent = `${score}`;
    }
    if (computerChoice == 0) {
        computerChoiceDiv.className = 'option-clicked option-computer-paper-clicked';
        computerIcon.src = './images/icon-paper.svg';
        iWin = false;
        if (score >= 1) {
            score -= 1;
            localStorage.setItem('rpsScore', score);
        }
        handleWinner(iWin, draw);
        scoreDisplay.textContent = `${score}`;
    }
    computerChoiceDiv.appendChild(computerIcon);
    scoreDisplay.textContent = `${score}`;
});
container.insertBefore(statusDisplay, container.children[1]);

rules.addEventListener('click', () => {
    const entireRule = document.createElement('div');
    entireRule.className = 'rules-content';
    const ruleSection = document.createElement('div');
    ruleSection.className = 'rule-section';
    const upSection = document.createElement('div');
    upSection.className = 'up-section';
    const ruleText = document.createElement('span');
    ruleText.className = 'rule-text';
    ruleText.textContent = 'Rules';
    const cancelIcon = document.createElement('img');
    cancelIcon.src = './images/icon-close.svg';
    const rulesIcon = document.createElement('img');
    rulesIcon.src = './images/image-rules.svg';
    rulesIcon.style.justifySelf = 'center';
    upSection.append(ruleText, cancelIcon);
    ruleSection.append(upSection, rulesIcon);
    entireRule.append(ruleSection);
    body.append(entireRule);
    cancelIcon.addEventListener('click', () => {
        entireRule.removeAttribute('class');
        entireRule.innerHTML = '';
    })
});

playAgain.addEventListener('click', () => {
    window.location.href = 'index.html';
});

const styleStatus = (winLoseDraw) => {
    statusDisplay.style.display = 'grid';
    statusTextContent.textContent = `${winLoseDraw}`;
    playAgain.className = 'play-again';
    playAgain.textContent = 'Play Again';
}

const handleWinner = (win, draw) => {
    if (win == true) {
        styleStatus(winLoseDraw = 'YOU WIN');
    }
    if (win == false) {
        styleStatus(winLoseDraw = 'YOU LOSE');
    }
    if (draw == true) {
        styleStatus(winLoseDraw = 'TIE');
    }
}