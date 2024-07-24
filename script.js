const player = document.getElementById('player');
const gameArea = document.getElementById('gameArea');
const leftButton = document.getElementById('left');
const rightButton = document.getElementById('right');

const gameWidth = gameArea.clientWidth;
const playerWidth = player.clientWidth;

let playerPosition = (gameWidth - playerWidth) / 2;
let score = 0;

function updatePlayerPosition() {
    player.style.left = `${playerPosition}px`;
}

function createItem(type) {
    const item = document.createElement('div');
    item.classList.add('item', type);
    item.style.left = `${Math.random() * (gameWidth - 30)}px`;
    gameArea.appendChild(item);

    let itemInterval = setInterval(() => {
        let itemTop = item.offsetTop;
        if (itemTop > gameArea.clientHeight) {
            gameArea.removeChild(item);
            clearInterval(itemInterval);
            if (type === 'apple') {
                score -= 10;
            } else if (type === 'bottle') {
                score += 10;
            }
        } else if (itemTop + 30 > gameArea.clientHeight - 50 &&
            parseInt(item.style.left) + 30 > playerPosition &&
            parseInt(item.style.left) < playerPosition + playerWidth) {
            gameArea.removeChild(item);
            clearInterval(itemInterval);
            if (type === 'apple') {
                score -= 10;
            } else if (type === 'bottle') {
                score += 10;
            }
        }
        item.style.top = `${itemTop + 5}px`;
    }, 20);
}

function startGame() {
    setInterval(() => {
        createItem(Math.random() > 0.5 ? 'apple' : 'bottle');
    }, 1000);
}

function movePlayer(direction) {
    if (direction === 'left' && playerPosition > 0) {
        playerPosition -= 20;
    } else if (direction === 'right' && playerPosition < gameWidth - playerWidth) {
        playerPosition += 20;
    }
    updatePlayerPosition();
}

leftButton.addEventListener('click', () => movePlayer('left'));
rightButton.addEventListener('click', () => movePlayer('right'));

startGame();
