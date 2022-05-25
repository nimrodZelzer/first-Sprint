'use strict'

var gBoard;
const MINE = 'X';
const FLAG = 'F';
const SHOWN = 'S';
var gStack = [];
var gLastMoves = [];

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
    setMinesNegsCount(gBoard);
    renderBoard(gBoard);
}


function buildBoard() {
    var board = [];
    for (var i = 0; i < gLevel.SIZE; i++) {
        board.push([]);
        for (var j = 0; j < gLevel.SIZE; j++) {
            var cell = createCell();
            board[i][j] = cell;
            if (i === 0 && j === 0 || i === 1 && j === 1) {
                cell.isMine = true;
            }
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
    if (currentCell.isShown || currentCell.isMarked) return;
    if (currentCell.isMine) {
        elCell.innerText = MINE;
        currentCell.isShown = true;
    } else { expandShown(cellI, cellJ); }
    //gStack.push(gLastMoves);
    gLastMoves = [];
    console.log(currentCell);
    renderBoard(gBoard);
}

function markCell(elCell, cellI, cellJ) {
    var currentCell = gBoard[cellI][cellJ];
    if (currentCell.isShown) return;
    console.log("here");
    renderCellMarked(elCell, cellI, cellJ);
}

function renderCellMarked(elCell, cellI, cellJ) {
    var strHTML = "";
    strHTML = `<td data-i="${cellI}" data-j="${cellJ}" oncontextmenu="markCell(this,${cellI} ,${cellJ})"
     onclick="cellClicked(this,${cellI} ,${cellJ})"><span>${FLAG}</span></td>`;
    elCell.isMarked = true;
    elCell.innerHTML = strHTML;
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

function expandShown(i, j) {
    if (gBoard[i][j].isMine === false) {
        gBoard[i][j].isShown = true;
        gLastMoves.push({ locationI: i, locationJ: j });
    }
    if (gBoard[i][j].minesAroundCount !== 0 || gBoard[i][j].isMine === true) {
        return;
    }
    if (getCell(i, j + 1) !== null && gBoard[i][j + 1].isShown === false) {
        expandShown(i, j + 1);
    }
    if (getCell(i + 1, j) !== null && gBoard[i + 1][j].isShown === false) {
        expandShown(i + 1, j);
    }
    if (getCell(i + 1, j + 1) !== null && gBoard[i + 1][j + 1].isShown === false) {
        expandShown(i + 1, j + 1);
    }
    if (getCell(i - 1, j + 1) !== null && gBoard[i - 1][j + 1].isMine === false) {
        expandShown(i - 1, j + 1);
    }
    if (getCell(i - 1, j) !== null && gBoard[i - 1][j].isShown === false) {
        expandShown(i - 1, j);
    }
    if (getCell(i + 1, j - 1) !== null && gBoard[i + 1][j - 1].isShown === false) {
        expandShown(i + 1, j - 1);
    }
    if (getCell(i - 1, j - 1) !== null && gBoard[i - 1][j - 1].isShown === false) {
        expandShown(i - 1, j - 1);
    }
    if (getCell(i, j - 1) !== null && gBoard[i][j - 1].isShown === false) {
        expandShown(i, j - 1);
    }
}

function reveal(elCell, i, j, value) {
    (value === MINE) ? elCell.innerText = MINE : str = gBoard[i][j].minesAroundCount;
    gBoard[i][j].isShown = true;
}


function renderCell(i, j, value) {
    var cellSelector = '.' + getClassName(location)
    var elCell = document.querySelector(cellSelector);
    elCell.innerHTML = value;
}
