
function markCell(elCell, cellI, cellJ) {
    var currentCell = gBoard[cellI][cellJ];
    if (currentCell.isShown) return;
    if (currentCell.isMarked) {
        currentCell.isMarked = false;
        renderCellMarked(elCell, cellI, cellJ, true);
        if (currentCell.isMine) gMarkedMines--;
    } else {
        currentCell.isMarked = true;
        if (currentCell.isMine) gMarkedMines++;
        renderCellMarked(elCell, cellI, cellJ, false);
    }
    checkGameOver();
}


function renderCellMarked(elCell, cellI, cellJ, isCellMarked) {
    var strHTML = "";
    if (!isCellMarked) {
        strHTML = `<td data-i="${cellI}" data-j="${cellJ}" oncontextmenu="markCell(this,${cellI} ,${cellJ})"
        onclick="cellClicked(this,${cellI} ,${cellJ})"><span>${FLAG}</span></td>`;
    } else {
        strHTML += `<td data-i="${cellI}" data-j="${cellJ}"  oncontextmenu="markCell(this,${cellI} ,${cellJ})"
        onclick="cellClicked(this,${cellI} ,${cellJ})"></td>`;
    }
    elCell.innerHTML = strHTML;

}