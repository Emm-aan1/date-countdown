const inputContainer = document.getElementById('input-container');
const countDownForm = document.getElementById('countdownform');
const dateEl = document.getElementById('date-picker');

// count down
const countDownEl = document.getElementById('countdown');
const countDownElTitle = document.getElementById('countdown-title');
const countDownBtn = document.getElementById('countdown-button');
const timeEl = document.querySelectorAll('span');

// complete count down
const completeEl = document.getElementById('complete');
const completeInfo = document.getElementById('complete-info');
const completeBtn = document.getElementById('complete-button');

// global access variables
let countDownTitle = '';
let countDownDate = '';
let countDownValue = Date;
let countDownActive;
let savedCountDown;

// create time counts
const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;

// set date input
const today = new Date().toISOString().split('T')[0];
dateEl.setAttribute('min', today);

// populate count down
function updateDOM() {
  countDownActive = setInterval(() => {
    const now = new Date().getTime();
    const distance = countDownValue - now;

    const days = Math.floor(distance / day);
    const hours = Math.floor((distance % day) / hour);
    const minutes = Math.floor((distance % hour) / minute);
    const seconds = Math.floor((distance % minute) / second);

    // hide input
    inputContainer.hidden = true;

    //  if count down ends
    if (distance < 0) {
      countDownEl.hidden = true;
      clearInterval(countDownActive);
      completeInfo.textContent = `${countDownTitle} finished on ${countDownDate}`;
      completeEl.hidden = false;
    } else {
      // show count down    
      countDownElTitle.textContent = `${countDownTitle}`;
      timeEl[0].textContent = `${days}`;
      timeEl[1].textContent = `${hours}`;
      timeEl[2].textContent = `${minutes}`;
      timeEl[3].textContent = `${seconds}`;

      completeEl.hidden = true;
      countDownEl.hidden = false;
    }
  }, 1000)

}

// take values from input
function updatecountdown(e) {
  e.preventDefault();
  countDownTitle = e.srcElement[0].value;
  countDownDate = e.srcElement[1].value;
  savedCountDown = {
    title: countDownTitle,
    date: countDownDate,
  };
  localStorage.setItem('countdown', JSON.stringify(savedCountDown));

  // check for valid date
  if (countDownDate === '') {
    alert('Please Select a Date');
  } else {
    // get number version of current date
    countDownValue = new Date(countDownDate).getTime();
    updateDOM();
  }
}

// reset all values
function reset() {
  // hide count down and show input
  countDownEl.hidden = true;
  inputContainer.hidden = false;
  completeEl.hidden = true

  // stop the count down
  clearInterval(countDownActive);

  // reset values
  countDownTitle = '';
  countDownDate = '';
  localStorage.removeItem('countdown');
}

// restore previous count down from local storage
function restoreCountdown() {
  if (localStorage.getItem('countdown')) {
    inputContainer.hidden = true;
    savedCountDown = JSON.parse(localStorage.getItem('countdown'));
    countDownTitle = savedCountDown.title;
    countDownDate = savedCountDown.date;
    countDownValue = new Date(countDownDate).getTime();
    updateDOM();
  }
}

// event listener
countDownForm.addEventListener('submit', updatecountdown);
countDownBtn.addEventListener('click', reset);
completeBtn.addEventListener('click', reset)

// on load
restoreCountdown();