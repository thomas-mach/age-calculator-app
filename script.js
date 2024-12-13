const form = document.getElementById("form");
const button = document.getElementById("button");
const day = document.getElementById("day");
const month = document.getElementById("month");
const year = document.getElementById("year");
const errorDay = document.getElementById("error-day");
const errorMonth = document.getElementById("error-month");
const errorYear = document.getElementById("error-year");
const labelDay = document.getElementById("label-day");
const labelMonth = document.getElementById("label-month");
const labelYear = document.getElementById("label-year");
const years = document.getElementById("years");
const months = document.getElementById("months");
const days = document.getElementById("days");

button.addEventListener("click", function (e) {
  e.preventDefault();
  dateCalc();
});

function dayValidate() {
  resetError(day, labelDay, errorDay);
  if (!day.value) {
    applayError(day, labelDay, errorDay, "This field is required");
  } else if (!/^(0[1-9]|1[0-9]|2[0-9]|3[01])$/.test(day.value)) {
    applayError(day, labelDay, errorDay, "Must by a valid day");
  } else {
    return day.value;
  }
}

function monthValidate() {
  resetError(month, labelMonth, errorMonth);
  if (!month.value) {
    applayError(month, labelMonth, errorMonth, "This field is required");
  } else if (!/^(0[1-9]|1[0-2])$/.test(month.value)) {
    applayError(month, labelMonth, errorMonth, "Must by a valid month");
  } else {
    return month.value;
  }
}

function yearValidate() {
  resetError(year, labelYear, errorYear);
  const currentYear = new Date().getFullYear().toString();

  if (!year.value) {
    applayError(year, labelYear, errorYear, "This field is required");
  } else if (!/^(19[0-9]{2}|20[0-4][0-9]|2050)$/.test(year.value)) {
    applayError(year, labelYear, errorYear, "Must by a valid year");
  } else if (year.value >= currentYear) {
    applayError(year, labelYear, errorYear, "Must by in the past");
  } else {
    return year.value;
  }
}

function isValidDate(yearElement, monthOfYear, dayOfMonth) {
  const date = new Date(yearElement, monthOfYear - 1, dayOfMonth);

  if (
    !(
      date.getFullYear() === yearElement &&
      date.getMonth() === monthOfYear - 1 &&
      date.getDate() === dayOfMonth
    )
  ) {
    applayError(day, labelDay, errorDay, "Must by a valid date");
    applayError(month, labelMonth, errorMonth);
    applayError(year, labelYear, errorYear);
  } else return true;
}

function applayError(input, label, errorItem, message = "") {
  input.classList.add("input-error-style");
  label.classList.add("label-error-style");
  errorItem.textContent = message;
}

function resetError(input, label, errorItem) {
  input.classList.remove("input-error-style");
  label.classList.remove("label-error-style");
  errorItem.textContent = "";
}

function dateCalc() {
  const dayValue = dayValidate();
  const monthValue = monthValidate();
  const yearValue = yearValidate();

  if (
    dayValue &&
    monthValue &&
    yearValue &&
    isValidDate(Number(yearValue), Number(monthValue), Number(dayValue))
  ) {
    const initialDate = `${yearValue}/${monthValue}/${dayValue}`;

    const initialDateObj = new Date(initialDate);
    const today = new Date();

    let passedYears = today.getFullYear() - initialDateObj.getFullYear();
    let passedMonths = today.getMonth() - initialDateObj.getMonth();
    let passedDays = today.getDate() - initialDateObj.getDate();

    if (passedMonths < 0) {
      passedMonths += 12;
      passedYears--;
    }

    if (passedDays < 0) {
      const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
      passedDays += lastMonth.getDate();
      passedMonths--;
      if (passedMonths < 0) {
        passedMonths += 12;
        passedYears--;
      }
    }

    renderData(passedYears, passedMonths, passedDays);
  }
}

function renderData(passedYears, passedMonths, passedDays) {
  years.textContent = passedYears;
  months.textContent = passedMonths;
  days.textContent = passedDays;
}
