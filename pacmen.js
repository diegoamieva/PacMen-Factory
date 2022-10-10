var pos = 0;
const pacArray = [
    ['./images/pacman1.png', './images/pacman2.png'],
    ['./images/pacman3.png', './images/pacman4.png']
];
const pacMen = [];

var runStatus = false;

function setToRandom(scale) {
    return {
        x: Math.random() * scale,
        y: Math.random() * scale
    }
}

function randomValue(scale) {
    return Math.floor(Math.random() * scale);
}


function makePac() {
    let velocity = setToRandom(50);
    let limit = checkContainerSize();
    let minLimit = Math.min(limit.x, limit.y);
    let position = setToRandom(minLimit * 0.5 + minLimit * 0.15);
    let size = Math.floor(Math.random() * 100) + 20;
    let game = document.getElementById('game');
    let newimg = document.createElement('img');
    let direction = 0;
    let focus = 0;
    newimg.style.position = 'absolute';
    newimg.src = './images/pacman1.png';
    newimg.width = size;
    newimg.style.left = position.x * 2;
    newimg.style.top = position.y;
    game.appendChild(newimg);
    return {
        position,
        velocity,
        newimg,
        direction,
        focus
    }
}

function update() {
    pacMen.forEach((item) => {
        item.focus = (item.focus + 1) % 2;
        item.newimg.src = pacArray[item.direction][item.focus];
        checkCollisions(item);
        item.position.x += item.velocity.x;
        item.position.y += item.velocity.y;
        item.newimg.style.left = item.position.x;
        item.newimg.style.top = item.position.y;
    })
}

function checkCollisions(item) {
    let limit = checkContainerSize();
    let imgWidth = item.newimg.width;
    if (item.position.x >= limit.x - imgWidth ||
    item.position.x <= 0) {
        item.velocity.x *= -1;
        item.direction = (item.direction + 1) % 2;
    }
    if (item.position.y >= limit.y - imgWidth - 20 ||
    item.position.y <= 0) {
        item.velocity.y *= -1;
    }
}

function checkContainerSize() {
    let containerSize = document.getElementById('game').getBoundingClientRect();
    return {
        x: containerSize.width,
        y: containerSize.height
    }
}

function makeOne() {
    buttonEffect('buttonMake');
    pacMen.push(makePac());
}

function run() {
    buttonEffect('buttonRun');
    let buttonRun = document.getElementById('buttonRun');
    if(!runStatus) {
        intervalID = setInterval(update, 50);
        runStatus = !runStatus;
        buttonRun.style.backgroundColor = 'red';
        buttonRun.innerText = 'STOP';
        return
    }
    if(runStatus) {
        runStatus = !runStatus;
        buttonRun.style.backgroundColor = 'lime';
        buttonRun.innerText = 'START';
        clearInterval(intervalID);
    }
}

function shakeOne() {
    buttonEffect('buttonZap');
    let remove = document.getElementById('game').childNodes[1];
    pacMen.shift();
    remove.classList.add('shake');
    remove.addEventListener('animationend', () => {
      remove.classList.remove('shake'); 
    }, { once: true });
    setTimeout(removeOne, 750);
}

function removeOne() {
    let remove = document.getElementById('game');
    remove.removeChild(remove.childNodes[1]);
}

function buttonEffect(buttonId) {
    let buttonClicked = document.getElementById(buttonId);
    buttonClicked.classList.add('buttonEffect');
    buttonClicked.addEventListener('transitionend', () => {
      buttonClicked.classList.remove('buttonEffect'); 
    }, { once: true });
}