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

const secondsPerHour =
  secondsPerMinute * minutesPerHour;

const secondsPerDay =
  secondsPerHour * 40;

function pad(number) {
  return String(number).padStart(2, "0");
}

function getEarthTimeZoneName(now) {
  const parts = new Intl.DateTimeFormat(undefined, {
    timeZoneName: "long"
  }).formatToParts(now);

  const timeZonePart =
    parts.find(part => part.type === "timeZoneName");

  return timeZonePart
    ? timeZonePart.value
    : "Local Time";
}

function updateClocks() {
  const now = new Date();

  const earthTime =
    `${pad(now.getHours())}:` +
    `${pad(now.getMinutes())}:` +
    `${pad(now.getSeconds())}`;

  document.getElementById("earth-time").textContent =
    earthTime;

  document.getElementById("earth-label").textContent =
    `${getEarthTimeZoneName(now)} (Earth)`;

  const elapsedSeconds =
    Math.floor((now - suntoupEpoch) / 1000);

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

  document.getElementById("suntoup-time").textContent =
    `${pad(suntoupHours)}:` +
    `${pad(suntoupMinutes)}:` +
    `${pad(suntoupSeconds)}`;
}

updateClocks();

setInterval(updateClocks, 250);