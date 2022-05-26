var gMine = 0;
var gHintTimeOut = true;
var gHintTimeOutID;



function countingMineNeighbors(i, j) {
    var firstI = i;
    var firstJ = j;
    var minesCount = 0;
    if (!gBoard[i][j].isMine) {
        for (i = firstI - 1; i < firstI + 2; i++) {
            for (j = firstJ - 1; j < firstJ + 2; j++) {
                if (i === firstI && j === firstJ) continue;
                if (!checkCell(i, j) && gBoard[i][j].isMine) {
                    minesCount++;
                }
            }
        }
    }
    console.log("Mines count:", minesCount)
    return minesCount;
}



function checkCell(i, j) {
    return (j < 0 || i >= gBoard.length || i < 0 || j >= gBoard.length);
}

function setMinesNegsCount(board) {
    for (var i = 0; i < gLevel.SIZE; i++) {
        for (var j = 0; j < gLevel.SIZE; j++) {
            var cell = board[i][j];
            cell.minesAroundCount = countingMineNeighbors(i, j);
        }
    }
}

function createRandomMines() {
    var cell;
    for (var i = 0; i < gLevel.MINES; i++) {
        cell = placeSingleMine();
        cell.isMine = true;
    }
}


function placeSingleMine() {
    var i = Math.floor(Math.random() * gLevel.SIZE);
    var j = Math.floor(Math.random() * gLevel.SIZE);
    while (gBoard[i][j].isShown) {
        i = Math.floor(Math.random() * gLevel.SIZE);
        j = Math.floor(Math.random() * gLevel.SIZE);
    }
    gMine++;
    console.log("mine amount", gMine);
    return gBoard[i][j];
}

function getRandomMine(elBtn) {
    if (!gGame.isOn) return;
    elBtn.style.display = "none";
    var randMines = [];
    for (var i = 0; i < gLevel.SIZE; i++) {
        for (var j = 0; j < gLevel.SIZE; j++) {
            if (gBoard[i][j].isMine && !gBoard[i][j].isShown) {
                randMines.push(document.querySelector(getCellSelector(i, j)));
            }
        }
    }
    var rand = getRandomInt(0, randMines.length);
    console.log(randMines[rand]);
    randMines[rand].classList.add("hint");
    gHintTimeOutID = setTimeout(function () {
        (randMines[rand].classList.remove("hint"))
    }, 500);

}



function getCellSelector(i, j) {
    return `[data-i="${i}"][data-j="${j}"]`;

}