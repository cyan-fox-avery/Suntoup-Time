/*
Suntoup Standard Time

1 Suntoup second = 1 Earth second
50 seconds = 1 Suntoup minute
50 minutes = 1 Suntoup hour
40 hours = 1 Suntoup day

100,000 seconds per Suntoup day.
*/

// Temporary epoch.
// We can replace this later with Matt's chosen starting point.
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

function createClockMarkers() {
  const markerContainer =
    document.getElementById("clock-markers");

  markerContainer.innerHTML = "";

  const totalMarkers =
    hoursPerDay * 5;

  for (
    let markerNumber = 0;
    markerNumber < totalMarkers;
    markerNumber++
  ) {
    const marker =
      document.createElement("div");

    const rotation =
      markerNumber * (360 / totalMarkers);

    marker.className = "clock-marker";

    marker.style.setProperty(
      "--rotation",
      `${rotation}deg`
    );

    const isHourMarker =
      markerNumber % 5 === 0;

    if (isHourMarker) {
      marker.classList.add("major");

      const hourNumber =
        markerNumber === 0
          ? hoursPerDay
          : markerNumber / 5;

      const shouldShowNumber =
        hourNumber % 2 === 0;

      if (shouldShowNumber) {
        const number =
          document.createElement("span");

        number.className = "clock-number";
        number.textContent = hourNumber;

        marker.appendChild(number);
      }
    }

    markerContainer.appendChild(marker);
  }
}

function updateClock() {
  const now = new Date();

  const elapsedMilliseconds =
    now - suntoupEpoch;

  const elapsedSeconds =
    elapsedMilliseconds / 1000;

  const secondsToday =
    ((elapsedSeconds % secondsPerDay)
      + secondsPerDay)
      % secondsPerDay;

  const wholeSecondsToday =
    Math.floor(secondsToday);

  const suntoupHours =
    Math.floor(
      wholeSecondsToday / secondsPerHour
    );

  const secondsRemainingAfterHours =
    wholeSecondsToday % secondsPerHour;

  const suntoupMinutes =
    Math.floor(
      secondsRemainingAfterHours
      / secondsPerMinute
    );

  const suntoupSeconds =
    secondsRemainingAfterHours
    % secondsPerMinute;

  document.getElementById("suntoup-time").textContent =
    `${pad(suntoupHours)}:` +
    `${pad(suntoupMinutes)}:` +
    `${pad(suntoupSeconds)}`;

  const secondProgress =
    (secondsToday % secondsPerMinute)
    / secondsPerMinute;

  const minuteProgress =
    (secondsToday % secondsPerHour)
    / secondsPerHour;

  const hourProgress =
    secondsToday / secondsPerDay;

  document.getElementById("second-hand").style.transform =
    `translateX(-50%) rotate(${secondProgress * 360}deg)`;

  document.getElementById("minute-hand").style.transform =
    `translateX(-50%) rotate(${minuteProgress * 360}deg)`;

  document.getElementById("hour-hand").style.transform =
    `translateX(-50%) rotate(${hourProgress * 360}deg)`;

  requestAnimationFrame(updateClock);
}

createClockMarkers();
updateClock();