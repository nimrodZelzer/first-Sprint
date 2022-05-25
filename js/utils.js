

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



