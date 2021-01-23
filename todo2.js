const toDoForm = document.querySelector(".toDoForm");
const toDoInput = toDoForm.querySelector(".toDoInput");

//// Pending & Finished /////////////////////
const toDoListContainer = document.querySelector(".toDoLists");
const listPending = document.querySelector(".toDoList__pending");
const listFinished = document.querySelector(".toDoList__finished");

////////////////////////////////////////
const PENDING_LS = "Pending";
const FINISHED_LS = "Finished";
/////////////// Coding ///////////////////////////////

let toDosPending = [];
let toDosFinished = [];

const saveToDo = function (key, toDoArray) {
  localStorage.setItem(key, JSON.stringify(toDoArray));
};

const paintTodo = function (text, listName) {
  const id = Math.random();
  const toDoObj = {
    text: text,
    id: id,
  };
  const html = `
          <li id="${id}" >
            <button class="btnDelete">❌</button>
            <button class="btn${
              listName === "pending" ? "Finished" : "Pending"
            }">${listName === "pending" ? `✅` : `⏫`}</button>
            <span>${text}</span>
          </li>
  `;

  if (listName === "pending") {
    listPending.insertAdjacentHTML("beforeend", html);

    toDosPending.push(toDoObj);
  }

  if (listName === "finished") {
    listFinished.insertAdjacentHTML("beforeend", html);

    toDosFinished.push(toDoObj);
  }

  ////// delete button ///////
  const btnsDelete = document.querySelectorAll(".btnDelete");
  btnsDelete.forEach((btn) => btn.addEventListener("click", removeList));

  ////// remove to finished ////////
  const btnsFinished = document.querySelectorAll(".btnFinished");
  btnsFinished.forEach((btn) => btn.addEventListener("click", moveToFinished));

  ////// move to pending ///////////
  const btnsPending = document.querySelectorAll(".btnPending");
  btnsPending.forEach((btn) => btn.addEventListener("click", moveToPending));
};

//////////////////////////////////////////////////////////
const moveToPending = function (e) {
  const moved = removeList(e);
  paintTodo(moved.text, "pending");

  console.log("toDosPending[]: ", toDosPending);
  localStorage.removeItem(PENDING_LS);
  saveToDo(PENDING_LS, toDosPending);
};

const moveToFinished = function (e) {
  const moved = removeList(e);
  console.log(moved);
  paintTodo(moved.text, "finished");

  console.log("toDosfinished[]: ", toDosFinished);
  localStorage.removeItem(FINISHED_LS);
  saveToDo(FINISHED_LS, toDosFinished);
};

////////////////////////////////////////////////////////
let clickeds = [];

const removeList = function (e) {
  const btn = e.target;
  const li = btn.parentNode;
  const ul = li.parentNode;
  const listName = ul.className;

  let clicked;

  if (listName.includes("pending")) {
    const filteredPending = toDosPending.filter((todo) => +todo.id !== +li.id);
    ul.removeChild(li);
    clicked = toDosPending.find((todo) => +todo.id === +li.id);

    toDosPending = filteredPending;
    saveToDo(PENDING_LS, toDosPending);
  }

  if (listName.includes("finished")) {
    const filteredFinished = toDosFinished.filter(
      (todo) => +todo.id !== +li.id
    );
    ul.removeChild(li);
    clicked = toDosFinished.find((todo) => +todo.id === +li.id);
    toDosFinished = filteredFinished;
    saveToDo(FINISHED_LS, toDosFinished);
  }

  return clicked;
};

//////////////////////////////////////////////////////////////
const submitEvent = function (e) {
  e.preventDefault();
  const currentText = toDoInput.value;
  paintTodo(currentText, "pending");
  saveToDo(PENDING_LS, toDosPending);
  toDoInput.value = "";
};

const loadPendings = function () {
  const savedPendings = localStorage.getItem(PENDING_LS);

  if (savedPendings !== null) {
    const parsedPendings = JSON.parse(savedPendings);
    parsedPendings.forEach((todo) => {
      paintTodo(todo.text, "pending");
      saveToDo(PENDING_LS, toDosPending);
    });
  }
};

const loadFinished = function () {
  const savedFinished = localStorage.getItem(FINISHED_LS);

  if (savedFinished) {
    const parsedFinished = JSON.parse(savedFinished);
    parsedFinished.forEach((todo) => {
      paintTodo(todo.text, "finished");
      saveToDo(FINISHED_LS, toDosFinished);
    });
  }
};

function init() {
  loadPendings();
  loadFinished();
  toDoForm.addEventListener("submit", submitEvent);
}

init();
