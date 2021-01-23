const clockContainer = document.querySelector(".js-clock");
const dDay = clockContainer.querySelector(".js-clock__date");

const NINE_HOURS_MILLISECONDS = 32400000;

function getTime() {
  // Don't delete this.
  const xmasDay = new Date("2021-12-24:00:00:00+0900");
  const xmasDayGetTime = xmasDay.getTime();
  const singapore = new Date();
  const singaporeGetTime = singapore.getTime();
  const utc = singapore.getTime() + singapore.getTimezoneOffset() * 60000;
  const koreaGetTime = utc + NINE_HOURS_MILLISECONDS;

  const distance = xmasDayGetTime - koreaGetTime;

  const dd = Math.floor(distance / (1000 * 60 * 60 * 24));
  const h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const s = Math.floor((distance % (1000 * 60)) / 1000);

  dDay.textContent = `${dd < 10 ? `0${dd}` : `${dd}`}d ${
    h < 10 ? `0${h}` : `${h}`
  }h ${m < 10 ? `0${m}` : ` ${m}`}m ${s < 10 ? `0${s}` : `${s}`}s`;
  /*
  1초 :1000
  1분 : 1000 * 60
  1시간 : 1000 * 60 * 60
  1일 : 1000 * 60 * 60 * 24
  */
}

function init() {
  getTime();

  setInterval(getTime, 1000);
}
init();
