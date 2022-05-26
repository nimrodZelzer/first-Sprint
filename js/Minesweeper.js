'use strict'
var gBoard;
const MINE = "&#128163";
const FLAG = '&#128681';
const SHOWN = '';
var gSmiley = '&#128512';
var gStack = [];
var gLastMoves = [];
var gMinesCreated = false;
var gMarkedMines = 0;
var gLives = 3;


var gGame = {
    isOn: true,
    shownCount: 0,
    markedCount: 0,
    secsPassed: 0
};

var gLevel = {
    SIZE: 4,
    MINES: 2
};

function init() {
    preventLeftClick()
    gGame.isOn = true;
    renderFeatures();
    clearInterval(gTimerInterval);
    startWatch();
    gBoard = buildBoard();
    createRandomMines();
    renderBoard(gBoard);
    setMinesNegsCount(gBoard);

}


function buildBoard() {
    var board = [];
    for (var i = 0; i < gLevel.SIZE; i++) {
        board.push([]);
        for (var j = 0; j < gLevel.SIZE; j++) {
            var cell = createCell();
            board[i][j] = cell;
        }
    }
    return board;
}

function renderBoard(board) {
    var value = "";
    var strHTML = '';
    var colorHtml = "";
    var elStopWatch = document.querySelector(".stop-watch");
    elStopWatch.innerText = "";
    for (var i = 0; i < gLevel.SIZE; i++) {
        strHTML += '<tr>'
        for (var j = 0; j < gLevel.SIZE; j++) {
            var cell = board[i][j];

            if (cell.isMarked && !cell.isShown) {
                value = FLAG
            } else if (!cell.isShown) {
                colorHtml += `class="not-shown"`
                value = ""
            } else if (cell.isMine && cell.isShown) {
                colorHtml += `class="mine"`
                value = MINE
            } else {
                value = cell.minesAroundCount;
                if (value === 0 && !cell.isMine) {
                    value = '0';
                } else { colorHtml = `class="color${value}" ` };
            }
            if (cell.isShown && cell.minesAroundCount === 0 && !cell.isMine) {
                colorHtml = `class="no-number"`;
            }

            strHTML += `<td data-i="${i}" data-j="${j}"  oncontextmenu="markCell(this,${i} ,${j})"
                        onclick="cellClicked(${i} ,${j})" ${colorHtml}>${value} </td>`;
        }
        strHTML += '</tr>'
    }
    var elTable = document.querySelector("tbody");
    elTable.innerHTML = strHTML;
}



function cellClicked(cellI, cellJ) {
    if (!gGame.isOn) return;
    var currentCell = gBoard[cellI][cellJ];
    if (currentCell.isMarked) return;
    if (currentCell.isShown) return;
    saveLAstMove();
    if (!currentCell.isMine) {
        currentCell.isShown = true;
        expandShown(gBoard, cellI, cellJ);
    }
    if (currentCell.isMine) {
        gLives--;
        var ellives = document.querySelector(".lives");
        (gLives === 2) ? ellives.innerHTML = "&#10084 &#10084" : ellives.innerHTML = "&#10084"
        currentCell.isShown = true;
        gMarkedMines++;
        if (gLives === 0) {
            ellives.innerHTML = "";
            stopGame();
        }
    }
    checkGameOver();
    gStack.push(gBoard);
    renderBoard(gBoard);
}



function expandShown(board, i, j) {

    if (board[i][j].isMine === false || !board[i][j].isShown) {
        var elCell = document.querySelector(getCellSelector(i, j));
        board[i][j].isShown = true;
        elCell.isShown = true;
    }
    if (board[i][j].minesAroundCount !== 0 || board[i][j].isMine === true || board[i][j].isMarked) {
        return;
    }
    if (!checkCell(i, j + 1) && board[i][j + 1].isShown === false) {
        expandShown(board, i, j + 1);
    }
    if (!checkCell(i + 1, j) && board[i + 1][j].isShown === false) {
        expandShown(board, i + 1, j);
    }
    if (!checkCell(i + 1, j + 1) && board[i + 1][j + 1].isShown === false) {
        expandShown(board, i + 1, j + 1);
    }
    if (!checkCell(i - 1, j + 1) && board[i - 1][j + 1].isMine === false) {
        expandShown(board, i - 1, j + 1);
    }
    if (!checkCell(i - 1, j) && board[i - 1][j].isShown === false) {
        expandShown(board, i - 1, j);
    }
    if (!checkCell(i + 1, j - 1) && board[i + 1][j - 1].isShown === false) {
        expandShown(board, i + 1, j - 1);
    }
    if (!checkCell(i - 1, j - 1) && board[i - 1][j - 1].isShown === false) {
        expandShown(board, i - 1, j - 1);
    }
    if (!checkCell(i, j - 1) && board[i][j - 1].isShown === false) {
        expandShown(board, i, j - 1);
    }

}

function boardSize() {
    var elRadios = [];
    elRadios = document.querySelectorAll(`[name="game-size"]`);
    for (var i = 0; i < elRadios.length; i++) {
        if (elRadios[i].checked) {
            gLevel.SIZE = elRadios[i].id;
            gLevel.MINES = (elRadios[i].getAttribute('data-i'));
        }
    }
    clearInterval(gTimerInterval);
    init();
}

function renderFeatures() {
    document.querySelector('.smiley').innerHTML = `&#128512`;
    var elHints = [];
    elHints = document.querySelectorAll(`.hint-btn`);
    elHints[0].style.display = "inline-block";
    elHints[1].style.display = "inline-block";
    elHints[2].style.display = "inline-block";
    var ellives = document.querySelector(`.lives`);
    ellives.innerHTML = "&#10084 &#10084 &#10084";
    gLives = 3;
    gMarkedMines = 0;
    gMine = 0;
}
