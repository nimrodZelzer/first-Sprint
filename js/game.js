function stopGame() {
    if (gLives === 0) {
        var elSmiley = document.querySelector('.smiley')
        elSmiley.innerHTML = `&#129301;`;
    }
    gGame.isOn = false;
    clearInterval(gTimerInterval);
}

function saveLAstMove() {
    for (var i = 0; i < gGame.SIZE; i++) {
        gStack.push(gBoard);
    }
    console.table("stack:", gStack);
}

function checkGameOver() {
    console.log("gMarkedMines", gMarkedMines);
    console.log("gLevel.MINES", gLevel.MINES);
    if (gMarkedMines === gLevel.MINES) {
        var elSmiley = document.querySelector('.smiley')
        elSmiley.innerHTML = `&#x1F60E;`;
        stopGame();
    }

}


function undo() {
    for (var i = 0; i < gLevel.SIZE; i++) {
        gBoard = gStack.pop();
    } renderBoard(gBoard);
}