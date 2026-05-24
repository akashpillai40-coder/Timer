const hoursInput = document.getElementById("hours");
const minutesInput = document.getElementById("minutes");
const secondsInput = document.getElementById("seconds");

const startBtn = document.getElementById("start-btn");
const activeTimers = document.getElementById("active-timers");

const alarm = new Audio("alarm.mp3");

let timers = [];

startBtn.addEventListener("click", createTimer);

function createTimer() {
  const hours = Number(hoursInput.value) || 0;
  const minutes = Number(minutesInput.value) || 0;
  const seconds = Number(secondsInput.value) || 0;

  const totalSeconds = hours * 3600 + minutes * 60 + seconds;

  if (totalSeconds <= 0) {
    alert("Please enter valid time");
    return;
  }

  const timer = {
    id: Date.now(),
    totalSeconds,
    intervalId: null,
    finished: false
  };

  timers.push(timer);

  renderTimer(timer);

  startCountdown(timer);

  hoursInput.value = "";
  minutesInput.value = "";
  secondsInput.value = "";
}

function renderTimer(timer) {
  const timerDiv = document.createElement("div");

  timerDiv.classList.add("timer-card");
  timerDiv.setAttribute("id", timer.id);

  timerDiv.innerHTML = `
    <p>Time Left :</p>
    <h3 class="timer-time">${formatTime(timer.totalSeconds)}</h3>
    <button onclick="stopTimer(${timer.id})">Stop Timer</button>
  `;

  activeTimers.appendChild(timerDiv);
}

function startCountdown(timer) {
  timer.intervalId = setInterval(() => {
    timer.totalSeconds--;

    const timerDiv = document.getElementById(timer.id);

    if (timer.totalSeconds <= 0) {
      clearInterval(timer.intervalId);

      timer.finished = true;

      timerDiv.classList.add("finished");

      timerDiv.innerHTML = `
        <h2>Timer Is Up!</h2>
      `;

      alarm.play();

      return;
    }

    const timeElement = timerDiv.querySelector(".timer-time");

    if (timeElement) {
      timeElement.textContent = formatTime(timer.totalSeconds);
    }

  }, 1000);
}

function stopTimer(id) {
  const timer = timers.find((t) => t.id === id);

  if (!timer) return;

  clearInterval(timer.intervalId);

  timers = timers.filter((t) => t.id !== id);

  const timerDiv = document.getElementById(id);

  if (timerDiv) {
    timerDiv.remove();
  }
}

function formatTime(totalSeconds) {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return `${pad(hours)} : ${pad(minutes)} : ${pad(seconds)}`;
}

function pad(value) {
  return value.toString().padStart(2, "0");
}