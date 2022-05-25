

function renderCell(location, value) {
    var cellSelector = '.' + getClassName(location)
    var elCell = document.querySelector(cellSelector);
    elCell.innerHTML = value;
}

function boardSize() {
    elRadios = [];
    elRadios = document.querySelectorAll(`[name="game-size"]`)
    for (var i = 0; i < elRadios.length; i++) {
        if (elRadios[i].checked) {
            gNumAmount = elRadios[i].id;
            init();
        }
        console.log("id", gNumAmount)
    }
}

function createRandomMines() {
    var randomMines = [];
    var location = {
        i: 3,
        j: 5
    };
    var randomMines;
    console.log(location);
    for (var i = 0; i < gLevel.SIZE; i++) {
        for (var j = 0; j < gLevel.SIZE; j++) {
            if (!gBoard[i][j].isShown) {
                location = {
                    i: i,
                    j: j
                };
                randomMines.push(location);
            }
        }
    }
    if (randomMines.length < 1) return; // no random cell
    for (var i = 0; i < gLevel.MINES; i++) {
        var j = 16;
        var rand = getRandomInt(0, j--);
        gBoard[randomMines[rand].i][randomMines[rand].j].isMine = true;
        console.log(gBoard[randomMines[i].i][randomMines[i].j]);
    }
}


function timeToString(time) {
    var diffInHrs = time / 3600000;
    var hh = Math.floor(diffInHrs);

    var diffInMin = (diffInHrs - hh) * 60;
    var mm = Math.floor(diffInMin);

    var diffInSec = (diffInMin - mm) * 60;
    var ss = Math.floor(diffInSec);

    var diffInMs = (diffInSec - ss) * 100;
    var ms = Math.floor(diffInMs);

    var formattedMM = mm.toString().padStart(2, "0");
    var formattedSS = ss.toString().padStart(2, "0");
    var formattedMS = ms.toString().padStart(2, "0");

    return `${formattedMM}:${formattedSS}:${formattedMS}`;
}


function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}
