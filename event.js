const colors = ["#1abc9c", "#3498db", "#9b59b6", "#f39c12", "#e74c3c"];

const h2 = document.querySelector("h2");
const body = document.querySelector("body");

const BIG_SCREEN = "bigScreen";
const MEDIUM_SCREEN = "mediumScreen";
const SMALL_SCREEN = "smallScreen";

// body.style.backgroundColor = "pink";

const superEventHandler = {
  mouseEnterHandler() {
    h2.textContent = "The mouse is here!";
    h2.style.color = colors[0];
  },

  mouseLeaveHandler() {
    h2.textContent = "The mouse is gone!";
    h2.style.color = colors[1];
  },

  resizeHandler() {
    h2.textContent = "You just resized!";
    h2.style.color = colors[2];

    const width = window.innerWidth;
    if (width > 1000) {
      body.classList.add(BIG_SCREEN);
      body.classList.remove(MEDIUM_SCREEN);
    } else if (width <= 1140 && width >= 700) {
      body.classList.add(MEDIUM_SCREEN);
      body.classList.remove(BIG_SCREEN, SMALL_SCREEN);
    } else {
      body.classList.remove(MEDIUM_SCREEN);
      body.classList.add(SMALL_SCREEN);
    }
  },

  rightClickHandler() {
    h2.textContent = "That was a right click!";
    h2.style.color = colors[4];
  },
};

h2.addEventListener("mouseenter", superEventHandler.mouseEnterHandler);

h2.addEventListener("mouseleave", superEventHandler.mouseLeaveHandler);

window.addEventListener("resize", superEventHandler.resizeHandler);

window.addEventListener("contextmenu", superEventHandler.rightClickHandler);
