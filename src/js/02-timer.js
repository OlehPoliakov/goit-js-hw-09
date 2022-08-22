import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import 'flatpickr/dist/themes/dark.css';

let selectedTime = null;

const refs = {
  inputDate: document.querySelector('#datetime-picker'),
  startBtn: document.querySelector('button[data-start]'),
  daysFace: document.querySelector('span[data-days]'),
  hoursFace: document.querySelector('span[data-hours]'),
  minutesFace: document.querySelector('span[data-minutes]'),
  secondsFace: document.querySelector('span[data-seconds]'),
};

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

function pad(value) {
  return String(value).padStart(2, '0');
}

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: Date.now(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < Date.now()) {
      window.alert('Please choose a date in the future');
      selectedDates[0] = new Date();
    } else {
      refs.startBtn.disabled = false;
      selectedTime = selectedDates[0];
    }
  },
};

class Timer {
  constructor({ onTick }) {
    this.setInterval = null;
    this.isActiv = false;
    refs.startBtn.disabled = true;
    this.onTick = onTick;
  }

  startTimer() {
    if (this.isActiv) {
      return;
    }

    this.isActiv = true;

    this.interval = setInterval(() => {
      const currentTime = Date.now();
      const deltaTime = selectedTime - currentTime;
      const time = convertMs(deltaTime);

      

      this.onTick(time);

      if (deltaTime < 500) {
        clearInterval(this.interval);
      }
    }, 1000);
  }
};

function updateClockface({ days, hours, minutes, seconds }) {
  refs.daysFace.textContent = days;
  refs.hoursFace.textContent = hours;
  refs.minutesFace.textContent = minutes;
  refs.secondsFace.textContent = seconds;
}

refs.startBtn.addEventListener('click', () => {
  timer.start();
});

const timer = new Timer({
  onTick: updateClockface,
});

flatpickr(refs.inputDate, options);
refs.startBtn.addEventListener('click', () => timer.startTimer());