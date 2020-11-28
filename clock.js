const clockContainer = document.querySelector(".js-clock"),
  clockDate = clockContainer.querySelector(".js-clock__date"),
  clockTitle = clockContainer.querySelector(".js-clock__time");

function getTime() {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDay();
  const minutes = date.getMinutes();
  const hours = date.getHours();
  const seconds = date.getSeconds();

  clockDate.innerText = `${day}.${month}.${year}`;

  clockTitle.innerText = `${hours < 10 ? `0${hours}` : `${hours}`}:${
    minutes < 10 ? `0${minutes}` : `${minutes}`
  }:${seconds < 10 ? `0${seconds}` : `${seconds}`}`;
}

function init() {
  getTime();
  setInterval(getTime, 1000);
}
init();
