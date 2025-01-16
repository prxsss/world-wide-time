import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import MicroModal from 'micromodal';
import './styles/style.css';

dayjs.extend(utc);
dayjs.extend(timezone);

const changeTimezoneForm = document.querySelector('.change-timezone-form');
const allTimeZone = Intl.supportedValuesOf('timeZone');
const changeTimezoneBtn = document.querySelector(
  'i[data-icon="change-timezone"]'
);
const modal1 = document.getElementById('modal-1');
const modalOverlay = document.querySelector('.modal-overlay');
const timezoneList = document.getElementById('timezone-list');
let timeZone = dayjs.tz.guess();

MicroModal.init({
  openClass: 'is-open',
  disableScroll: true,
});

function setTimeZone(tz) {
  dayjs.tz.setDefault(tz);
}

function displayTime() {
  document.querySelector('.timezone').textContent = timeZone;

  const currentTime = dayjs.tz().format('HH:mm:ss');
  document.querySelector('.time').textContent = currentTime;

  const currentDate = dayjs.tz().format('dddd, D MMMM, YYYY');
  document.querySelector('.date').textContent = currentDate;
}

allTimeZone.forEach((timeZone) => {
  const optionTag = document.createElement('option');
  optionTag.value = timeZone;
  optionTag.textContent = timeZone;

  document.querySelector('.timezone-selection').appendChild(optionTag);
});

timezoneList.firstElementChild.selected = true;

setTimeZone(timeZone);
displayTime();
setInterval(displayTime, 1000);

changeTimezoneBtn.addEventListener('click', () => {
  modal1.style.display = 'block';
});

modalOverlay.addEventListener('click', (event) => {
  if (event.target.hasAttribute('data-micromodal-close')) {
    modal1.style.display = 'none';
  }
});

changeTimezoneForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const timeZoneSelection = changeTimezoneForm.querySelector(
    '.timezone-selection'
  );

  if (timeZoneSelection.value === '') {
    return alert('Please select a timezone');
  }

  timeZone = timeZoneSelection.value;
  setTimeZone(timeZone);
  displayTime();
  setInterval(displayTime, 1000);

  modal1.style.display = 'none';
});
