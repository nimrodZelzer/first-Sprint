
function markCell(elCell, cellI, cellJ) {
    if (!gGame.isOn) return;
    var currentCell = gBoard[cellI][cellJ];
    if (currentCell.isShown) return;
    if (currentCell.isMine) {
        gMarkedMines++;
        currentCell.isMarked = true;
    } else if (currentCell.isMine && currentCell.isMarked) {
        gMarkedMines--;
        currentCell.isMarked = false;
    } else if (currentCell.isMarked) {
        currentCell.isMarked = false;
    } else if (!currentCell.isMarked) {
        currentCell.isMarked = true;
    }
    renderBoard(gBoard);
    checkGameOver();
}



function renderCellMarked(elCell, cellI, cellJ, isCellMarked) {
    var strHTML = "";
    if (!isCellMarked) {
        strHTML = `<td data-i="${cellI}" data-j="${cellJ}" oncontextmenu="markCell(this,${cellI} ,${cellJ})"
        onclick="cellClicked(this,${cellI} ,${cellJ})"><span>${FLAG}</span></td>`;
    } else {
        strHTML += `<td data-i="${cellI}" data-j="${cellJ}"  oncontextmenu="markCell(this,${cellI} ,${cellJ})"
        onclick="cellClicked(this,${cellI} ,${cellJ})">${SHOWN}</td>`;
    }
    elCell.innerHTML = strHTML;

}