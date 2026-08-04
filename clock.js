/*
Suntoup Standard Time

1 Suntoup second = 1 Earth second
50 seconds = 1 minute
50 minutes = 1 hour
40 hours = 1 day

100,000 seconds per Suntoup day.
*/

// Temporary epoch.
// This can be changed later.
const suntoupEpoch = new Date("2026-08-04T00:00:00-04:00");

const secondsPerMinute = 50;
const minutesPerHour = 50;
const hoursPerDay = 40;

const secondsPerHour =
  secondsPerMinute * minutesPerHour;

const secondsPerDay =
  secondsPerHour * hoursPerDay;

function pad(number) {
  return String(number).padStart(2, "0");
}

function updateClocks() {
  const now = new Date();

  const earthTime =
    `${pad(now.getHours())}:` +
    `${pad(now.getMinutes())}:` +
    `${pad(now.getSeconds())}`;

  document.getElementById("earth-time").textContent =
    earthTime;

  const elapsedSeconds =
    Math.floor((now - suntoupEpoch) / 1000);

  const completedDays =
    Math.floor(elapsedSeconds / secondsPerDay);

  let secondsToday =
    ((elapsedSeconds % secondsPerDay) + secondsPerDay)
    % secondsPerDay;

  const suntoupHours =
    Math.floor(secondsToday / secondsPerHour);

  secondsToday %= secondsPerHour;

  const suntoupMinutes =
    Math.floor(secondsToday / secondsPerMinute);

  const suntoupSeconds =
    secondsToday % secondsPerMinute;

  document.getElementById("suntoup-day").textContent =
    `Day ${completedDays + 1}`;

  document.getElementById("suntoup-time").textContent =
    `${pad(suntoupHours)}:` +
    `${pad(suntoupMinutes)}:` +
    `${pad(suntoupSeconds)}`;
}

updateClocks();

setInterval(updateClocks, 250);