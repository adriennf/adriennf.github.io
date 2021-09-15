const timer = document.getElementById("display");

let ms = 0;
let min = 0;
let sec = 0;
let stoptime = true;

let start = document.querySelector(".start");
start.onclick = startTimer

function startTimer() {
  if (stoptime == true) {
    stoptime = false;
    timerCycle();
  }
}

function stopButton() {
  if (stoptime == false) {
    stoptime = true;
  }
}

function timerCycle() {
  if (stoptime == false) {
    sec = parseInt(sec);
    min = parseInt(min);
    ms = parseInt(ms);

    ms = ms + 1;

    if (ms == 60) {
      sec = sec + 1;
      ms = 0;
    }

    if (sec == 60) {
      min = min + 1;
      sec = 0;
    }
    if (ms < 10 || ms == 0) {
      ms = "0" + ms;
    }
    if (sec < 10 || sec == 0) {
      sec = "0" + sec;
    }
    if (min < 10 || min == 0) {
      min = "0" + min;
    }
    timer.innerHTML = min + ":" + sec + ":" + ms;

    setTimeout("timerCycle()", 10);
  }
}

function resetButton() {
  timer.innerHTML = "00:00:00";
}

function resetButton() {
  timer.innerHTML = "00:00:00";
  stoptime = true;
  ms = 0;
  sec = 0;
  min = 0;
}