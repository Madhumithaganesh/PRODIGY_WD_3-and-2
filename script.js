let startTime;
let running = false;
let lapStartTime;
let lapTimes = [];

const display = document.getElementById('display');
const startStopButton = document.getElementById('startStopButton');
const lapButton = document.getElementById('lapButton');
const resetButton = document.getElementById('resetButton');
const lapList = document.getElementById('lapList');

function formatTime(milliseconds) {
  const date = new Date(milliseconds);
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const seconds = date.getSeconds().toString().padStart(2, '0');
  const millisecondsFormatted = date.getMilliseconds().toString().slice(0, 2);
  return `${minutes}:${seconds}:${millisecondsFormatted}`;
}

function startStop() {
  if (!running) {
    running = true;
    startStopButton.textContent = 'Stop';
    startTime = Date.now() - (lapStartTime ? Date.now() - lapStartTime : 0);
    lapStartTime = Date.now();
    updateDisplay();
    timerInterval = setInterval(updateDisplay, 10);
  } else {
    running = false;
    startStopButton.textContent = 'Start';
    clearInterval(timerInterval);
  }
}

function lap() {
  if (running) {
    const lapTime = Date.now() - lapStartTime;
    lapTimes.push(formatTime(lapTime));
    lapStartTime = Date.now();
    updateLapList();
  }
}

function reset() {
  running = false;
  clearInterval(timerInterval);
  startStopButton.textContent = 'Start';
  display.textContent = '00:00:00';
  lapTimes = [];
  lapList.innerHTML = '';
}

function updateDisplay() {
  const currentTime = Date.now() - startTime;
  display.textContent = formatTime(currentTime);
}

function updateLapList() {
  lapList.innerHTML = '';
  lapTimes.forEach((lapTime, index) => {
    const li = document.createElement('li');
    li.textContent = `Lap ${index + 1}: ${lapTime}`;
    lapList.appendChild(li);
  });
}

startStopButton.addEventListener('click', startStop);
lapButton.addEventListener('click', lap);
resetButton.addEventListener('click', reset);

