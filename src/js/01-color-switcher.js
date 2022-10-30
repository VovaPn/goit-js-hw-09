function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};

const startButton = document.querySelector('[data-start]');
const stopButton = document.querySelector('[data-stop]');
const body = document.querySelector('body');
let interval = 0;
stopButton.disabled = true;

startButton.addEventListener('click', () => {
  interval = setInterval(() =>
  { body.style.backgroundColor = getRandomHexColor() }, 1000);
    body.style.backgroundColor = getRandomHexColor();
    stopButton.disabled = false;
    startButton.disabled = true;
});
stopButton.addEventListener('click', () => {
    clearInterval(interval);
    startButton.disabled = false;
    stopButton.disabled = true;
})