const selectElement = document.querySelector("select");

const COUNTRY_LS = "Country";

const chooseCountry = function (e) {
  const selectedCountry = e.target.value;

  localStorage.setItem(COUNTRY_LS, selectedCountry);
};

const renderCountry = function () {
  const getCountry = localStorage.getItem(COUNTRY_LS);

  if (getCountry) {
    // selectElement.value = getCountry;

    const option = document.querySelector(`option[value=${getCountry}]`);

    option.selected = true;
  }
};

function init() {
  selectElement.addEventListener("change", chooseCountry);
  renderCountry();
}

init();

/*
const select = document.querySelector("select");

function handleChange() {
  const selected = select.value;
  localStorage.setItem("country", selected);
}

function loadCountries() {
  const selected = localStorage.getItem("country");
  if (selected) {
    const option = document.querySelector(`option[value="${selected}"]`);
    option.selected = true;
  }
}

loadCountries();
select.addEventListener("change", handleChange);
 */
