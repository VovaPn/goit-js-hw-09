// Описаний в документації
import flatpickr from "flatpickr";
// Додатковий імпорт стилів
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

let getEl = selector => document.querySelector(selector);
const startBtn = getEl('button');
const input = getEl('#datetime-picker');
const days = getEl('span[data-days]');
const hours = getEl('span[data-hours]');
const minutes = getEl('span[data-minutes]');
const seconds = getEl('span[data-seconds]');
let timerTime = 0;

startBtn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
    onClose(selectedDates) {
      if (selectedDates[0].getTime() <= new Date().getTime())
      {
        Notiflix.Notify.failure('Please choose a date in the future');
        startBtn.disabled = true;
      }
        else {
            startBtn.disabled = false;
            timerTime= selectedDates[0].getTime();
      }
  },
};
const fp = flatpickr(input, options);
function pad(value) {
  return String(value).padStart(2,'0')
}
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  // Remaining days
  const days = pad(Math.floor(ms / day));
  // Remaining hours
  const hours = pad(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = pad(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second));
  return { days, hours, minutes, seconds };
}

startBtn.addEventListener('click', () => {
  startBtn.disabled = true;
  
  const interval = setInterval(() =>
  {
    const timeObject = convertMs(timerTime - new Date().getTime());
    days.textContent = timeObject.days;
    hours.textContent = timeObject.hours;
    minutes.textContent = timeObject.minutes;
     seconds.textContent = timeObject.seconds;
     if (days.textContent === '00' &&
       hours.textContent === '00' &&
       minutes.textContent === '00' &&
       seconds.textContent === '00')
     {
       clearInterval(interval);
       Notiflix.Notify.success('Time you enjoy wasting is not wasted time.');
     }   
   }, 1000);
});