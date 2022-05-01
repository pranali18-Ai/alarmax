import "./styles.css";

var alarmString = null;

// Select HTML5 Audio element
const alarmAudio = document.getElementById("alarm-audio");

// Select DOM element with create-alarm id
const createAlarm = document.querySelector(".create-alarm");

// Select DOM element of active alarm container
const activeAlarm = document.getElementById("active-alarm");
const clearAlarm = document.getElementById("clear-alarm");

// Select DOM element of active alarm text
const alarmTextContainer = document.getElementById("alarm-text");

const alarmText = (time) => `Alarm set at time ${time}`;

// Initialize alarm sound
alarmAudio.src = "http://soundbible.com/grab.php?id=1252&type=mp3";
alarmAudio.load();

// Handle Create Alarm submit
const handleSubmit = (event) => {
  // Prevent default action of reloading the page
  event.preventDefault();
  const { hour, sec, min, zone } = document.forms[0];
  alarmString = getTimeString({
    hours: hour.value,
    seconds: sec.value,
    minutes: min.value,
    zone: zone.value
  });
  // Reset form after submit
  document.forms[0].reset();
  // Hide create alarm
  createAlarm.style.display = "none";
  // show active alarm with text
  activeAlarm.style.display = "block";
  alarmTextContainer.innerHTML = alarmText(alarmString);
};

const handleClear = () => {
  alarmString = "";
  activeAlarm.style.display = "none";
  createAlarm.style.display = "block";
};

// Trigger handleClear on button click
clearAlarm.addEventListener("click", handleClear);
// Attach submit event to the form
document.forms[0].addEventListener("submit", handleSubmit);

// Function to check if alarm needs to be triggered
const checkAlarm = (timeString) => {
  if (alarmString === timeString) {
    alarmAudio.play();
  }
};

// Function to convert time to string value
const getTimeString = ({ hours, minutes, seconds, zone }) => {
  if (minutes / 10 < 1) {
    minutes = "0" + minutes;
  }
  if (seconds / 10 < 1) {
    seconds = "0" + seconds;
  }
  return `${hours}:${minutes}:${seconds} ${zone}`;
};

// Function to display current time on screen
const renderTime = () => {
  var currentTime = document.getElementById("current-time");
  const currentDate = new Date();
  var hours = currentDate.getHours();
  var minutes = currentDate.getMinutes();
  var seconds = currentDate.getSeconds();
  var zone = hours >= 12 ? "PM" : "AM";
  if (hours > 12) {
    hours = hours % 12;
  }
  const timeString = getTimeString({ hours, minutes, seconds, zone });
  checkAlarm(timeString);
  currentTime.innerHTML = timeString;
};

// Update time every second
setInterval(renderTime, 1000);