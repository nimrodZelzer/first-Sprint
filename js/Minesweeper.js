'use strict'
var gBoard;
const MINE = 'X';
const FLAG = 'F';
const SHOWN = 'S';
var gStack = [];
var gLastMoves = [];
var gLifeCtr = 3;
var gMinesCreated = false;
var gMarkedMines = 0;
var gShownCells = 0;

var gGame = {
    isOn: false,
    shownCount: 0,
    markedCount: 0,
    secsPassed: 0
};

var gLevel = {
    SIZE: 4,
    MINES: 2
};

function createCell() {
    var cell = {
        minesAroundCount: 0,
        isShown: false,
        isMine: false,
        isMarked: false
    }
    return cell;
}

function init() {
    window.addEventListener('contextmenu', (event) => {
        event.preventDefault()
    })
    gBoard = buildBoard();
    createRandomMines();
    setMinesNegsCount(gBoard);
    if (!gMinesCreated) {
        renderBoard(gBoard);
        gMinesCreated = true;
    }
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
    var strHTML = ''
    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>'
        for (var j = 0; j < board[0].length; j++) {
            var cell = board[i][j];
            if (cell.isMarked && !cell.isShown) {
                strHTML += `<td data-i="${i}" data-j="${j}" oncontextmenu="markCell(this,${i} ,${j})"
                onclick="cellClicked(this,${i} ,${j})"><span>${FLAG}</span></td>`;
                console.log("here");
            } else if (!cell.isShown) {
                strHTML += `<td . data-i="${i}" data-j="${j}"  oncontextmenu="markCell(this,${i} ,${j})"
                onclick="cellClicked(this,${i} ,${j})"></td>`;
            } else if (cell.isMine) {
                strHTML += `<td data-i="${i}" data-j="${j}"  oncontextmenu="markCell(this,${i} ,${j})"
                onclick="cellClicked(this,${i} ,${j})"><span>${MINE}</span></td>`;
            } else {
                strHTML += `<td data-i="${i}" data-j="${j}" oncontextmenu="markCell(this,${i} ,${j})"
                onclick="cellClicked(this,${i} ,${j})"><span>${cell.minesAroundCount}</span></td>`;
            }
        }
        strHTML += '</tr>'
    }
    var elTable = document.querySelector("tbody");
    elTable.innerHTML = strHTML;
}


function cellClicked(elCell, cellI, cellJ) {
    var currentCell = gBoard[cellI][cellJ];
    // if (!gMinesCreated) {
    //     createRandomMines();
    //     renderBoard(gBoard);
    //     gMinesCreated = true;
    // }
    if (currentCell.isShown) return;
    if (!currentCell.isMine) {
        expandShown(gBoard, cellI, cellJ);
        gShownCells++;
        currentCell.isShown = true;
    } else {
        currentCell.isShown = true;
    }
    gStack.push(gLastMoves);
    gLastMoves = [];
    renderBoard(gBoard);
    checkGameOver();
}



function setMinesNegsCount(board) {
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[0].length; j++) {
            var cell = board[i][j];
            cell.minesAroundCount = countingMineNeighbors(i, j);
        }
    }
}

function countingMineNeighbors(i, j) {
    var minesCount = 0;
    if (!gBoard[i][j].isMine) {
        if (getCell(i, j + 1) !== null && gBoard[i][j + 1].isMine === true) minesCount++;
        if (getCell(i + 1, j) !== null && gBoard[i + 1][j].isMine === true) minesCount++;
        if (getCell(i + 1, j + 1) !== null && gBoard[i + 1][j + 1].isMine === true) minesCount++;
        if (getCell(i - 1, j + 1) !== null && gBoard[i - 1][j + 1].isMine === true) minesCount++;
        if (getCell(i - 1, j) !== null && gBoard[i - 1][j].isMine === true) minesCount++;
        if (getCell(i + 1, j - 1) !== null && gBoard[i + 1][j - 1].isMine === true) minesCount++;
        if (getCell(i - 1, j - 1) !== null && gBoard[i - 1][j - 1].isMine === true) minesCount++;
        if (getCell(i, j - 1) !== null && gBoard[i][j - 1].isMine === true) minesCount++;
    }
    return minesCount;
}


function getCell(i, j) {
    if (j < 0 || i >= gBoard.length || i < 0 || j >= gBoard.length) {
        return null;
    }
    return gBoard[i][j];
}

function expandShown(board, i, j) {
    if (board[i][j].isMine === false) {
        board[i][j].isShown = true;
        gLastMoves.push({ locationI: i, locationJ: j });
    }
    if (board[i][j].minesAroundCount !== 0 || board[i][j].isMine === true) {
        return;
    }
    if (getCell(i, j + 1) !== null && board[i][j + 1].isShown === false) {
        expandShown(board, i, j + 1);
    }
    if (getCell(i + 1, j) !== null && board[i + 1][j].isShown === false) {
        expandShown(board, i + 1, j);
    }
    if (getCell(i + 1, j + 1) !== null && board[i + 1][j + 1].isShown === false) {
        expandShown(board, i + 1, j + 1);
    }
    if (getCell(i - 1, j + 1) !== null && board[i - 1][j + 1].isMine === false) {
        expandShown(board, i - 1, j + 1);
    }
    if (getCell(i - 1, j) !== null && board[i - 1][j].isShown === false) {
        expandShown(board, i - 1, j);
    }
    if (getCell(i + 1, j - 1) !== null && board[i + 1][j - 1].isShown === false) {
        expandShown(board, i + 1, j - 1);
    }
    if (getCell(i - 1, j - 1) !== null && board[i - 1][j - 1].isShown === false) {
        expandShown(board, i - 1, j - 1);
    }
    if (getCell(i, j - 1) !== null && board[i][j - 1].isShown === false) {
        expandShown(board, i, j - 1);
    }
}




function renderCell(i, j) {
    var strHTML = `<td data-i="${i}" data-j="${j}" oncontextmenu="markCell(this,${i} ,${j})"
    onclick="cellClicked(this,${i} ,${j})"><span>${cell.minesAroundCount}</span></td>`;
    var elCell = document.querySelector(cellSelector);
    elCell.innerHTML = strHTML;
}

function checkGameOver() {
    if (gMarkedMines === gLevel.MINES) {
        for (var i = 0; i < gLevel.SIZE; i++) {
            for (var j = 0; j < gLevel.SIZE; j++) {
                console.log(gBoard[i][j].isShown);
                if (!gBoard[i][j].isShown && !gBoard[i][j].isMarked) {
                    console.log("not over");
                    return;
                }
            }
        }
        console.log("won");
    }

}
