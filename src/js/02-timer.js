import flatpickr from 'flatpickr';

import 'flatpickr/dist/flatpickr.min.css';

let selectedDates = null;

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
  defaultDate: new Date(),
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
  constructor({onTick}) {
    this.setInterval = null;
    this.isActiv = false;
    refs.startBtn.disabled = true;
    this.onTick = onTick;
  }

  start() {
    if (this.isActiv) {
      return;
    }

    // const selectedTime = Date.now();
    this.isActiv = true;

    this.interval = setInterval(() => {
      const currentTime = Date.now();
      const deltaTime = selectedTime - currentTime;
      const time = convertMs(deltaTime);
      if (deltaTime <= 0) {
        this.stopTimer();
      }
      this.onTick(time);
    }, 1000);
  };

  stop() {
    clearInterval(this.interval);
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
