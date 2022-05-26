var gTimerInterval;


function getCellSelector(i, j) {
    return `[data-i="${i}"][data-j="${j}"]`;

}

function createCell() {
    var cell = {
        minesAroundCount: 0,
        isShown: false,
        isMine: false,
        isMarked: false
    }
    return cell;
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


function startWatch() {
    var elapsedTime = 0;
    var startTime = Date.now() - elapsedTime;
    var elStopWatch = document.querySelector(".stop-watch");
    gTimerInterval = setInterval(function printTime() {
        elapsedTime = Date.now() - startTime;
        elStopWatch.innerText = timeToString(elapsedTime);
    }, 10);
}

function preventLeftClick() {
    window.addEventListener('contextmenu', (event) => {
        event.preventDefault()
    })
}

