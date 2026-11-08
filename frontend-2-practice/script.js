// 1. ДАННЫЕ
const SLOTS = [
  { time: "10:00", available: true },
  { time: "11:00", available: false },
  { time: "12:00", available: true },
  { time: "13:00", available: false },
  { time: "14:00", available: true },
  { time: "15:00", available: true },
  { time: "16:00", available: true },
  { time: "17:00", available: true },
];

const now = new Date();
const today = {
  year: now.getFullYear(),
  month: now.getMonth(),
  day: now.getDate(),
};

const MONTHS = [
  "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь",
  "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь",
];
const WEEKDAYS = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];

// 2. СОСТОЯНИЕ
const state = {
  year: today.year,
  month: today.month,
  selectedDay: today.day,
  selectedTime: null,
  slots: [],
};

// 3. ЧИСТЫЕ ФУНКЦИИ
// Функция построения календаря из заготовки задания.
function buildCalendarGrid(year, month) {
  const firstDay = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const startDayOfWeek = firstDay.getDay();
  const offset = startDayOfWeek === 0 ? 6 : startDayOfWeek - 1;
  const prevMonthLastDay = new Date(year, month, 0).getDate();
  const cells = [];

  for (let i = offset - 1; i >= 0; i--) {
    cells.push({ day: prevMonthLastDay - i, otherMonth: true });
  }
  for (let day = 1; day <= daysInMonth; day++) {
    cells.push({ day: day, otherMonth: false });
  }
  const totalCells = Math.ceil(cells.length / 7) * 7;
  let nextDay = 1;
  while (cells.length < totalCells) {
    cells.push({ day: nextDay, otherMonth: true });
    nextDay++;
  }

  const weeks = [];
  for (let i = 0; i < cells.length; i += 7) {
    weeks.push(cells.slice(i, i + 7));
  }
  return weeks;
}

function compareDates(a, b) {
  const first = new Date(a.year, a.month, a.day);
  const second = new Date(b.year, b.month, b.day);
  if (first < second) return -1;
  if (first > second) return 1;
  return 0;
}

// Учебные данные: на чётных и нечётных днях занято разное время.
function getSlotsForDay(day) {
  return SLOTS.map(function (slot) {
    let available = slot.available;
    if (day % 2 !== 0) {
      available = slot.time !== "12:00" && slot.time !== "16:00";
    }
    return { time: slot.time, available: available };
  });
}

// 4. ОТРИСОВКА И ОБРАБОТЧИКИ
function renderCalendar() {
  document.querySelector("#month").textContent =
    MONTHS[state.month] + " " + state.year;

  let html = "";
  WEEKDAYS.forEach(function (day) {
    html += `<span class="weekday">${day}</span>`;
  });

  const weeks = buildCalendarGrid(state.year, state.month);
  weeks.forEach(function (week) {
    week.forEach(function (cell) {
      const cellDate = { year: state.year, month: state.month, day: cell.day };
      const disabled = cell.otherMonth || compareDates(cellDate, today) < 0;
      const selected = !disabled && cell.day === state.selectedDay;
      let classes = "day";
      if (disabled) classes += " muted";
      if (selected) classes += " selected";

      html += `<button class="${classes}" type="button"
        data-day="${cell.day}" aria-pressed="${selected}"
        ${disabled ? "disabled" : ""}>${cell.day}</button>`;
    });
  });

  document.querySelector(".days").innerHTML = html;
  document.querySelectorAll(".day:not(:disabled)").forEach(function (button) {
    button.addEventListener("click", onDayClick);
  });
}

function renderSlots() {
  let html = "";
  if (state.selectedDay === null) {
    html = '<p class="empty-message">Выберите доступную дату</p>';
  } else {
    state.slots.forEach(function (slot) {
      const selected = slot.time === state.selectedTime;
      let classes = "slot";
      if (!slot.available) classes += " busy";
      if (selected) classes += " selected";

      html += `<button class="${classes}" type="button"
        data-time="${slot.time}" aria-pressed="${selected}"
        ${slot.available ? "" : "disabled"}>${slot.time}
        ${slot.available ? "" : '<small class="busy-text">Занято</small>'}
      </button>`;
    });
  }

  document.querySelector(".times").innerHTML = html;
  document.querySelectorAll(".slot:not(:disabled)").forEach(function (button) {
    button.addEventListener("click", onTimeClick);
  });
}

function renderSummary() {
  const summary = document.querySelector("#booking-date");
  if (state.selectedDay === null) {
    summary.textContent = "Выберите доступную дату";
    return;
  }

  const date = new Date(state.year, state.month, state.selectedDay);
  const dateText = date.toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  });
  summary.textContent = dateText + " · " + (state.selectedTime || "Выберите время");
}

function render() {
  renderCalendar();
  renderSlots();
  renderSummary();
}

function onDayClick(event) {
  state.selectedDay = parseInt(event.currentTarget.dataset.day, 10);
  state.selectedTime = null;
  state.slots = getSlotsForDay(state.selectedDay);
  render();
}

function onTimeClick(event) {
  state.selectedTime = event.currentTarget.dataset.time;
  renderSlots();
  renderSummary();
}

function changeMonth(offset) {
  // Date сам меняет год при переходе через декабрь или январь.
  const date = new Date(state.year, state.month + offset, 1);
  state.year = date.getFullYear();
  state.month = date.getMonth();
  state.selectedTime = null;

  const lastDay = new Date(state.year, state.month + 1, 0).getDate();
  const lastDate = { year: state.year, month: state.month, day: lastDay };
  if (compareDates(lastDate, today) < 0) {
    state.selectedDay = null;
    state.slots = [];
  } else {
    const isCurrentMonth = state.year === today.year && state.month === today.month;
    state.selectedDay = isCurrentMonth ? today.day : 1;
    state.slots = getSlotsForDay(state.selectedDay);
  }
  render();
}

// 5. ИНИЦИАЛИЗАЦИЯ
function init() {
  state.slots = getSlotsForDay(state.selectedDay);
  render();

  document.querySelector("#previous-month").addEventListener("click", function () {
    changeMonth(-1);
  });
  document.querySelector("#next-month").addEventListener("click", function () {
    changeMonth(1);
  });
}

document.addEventListener("DOMContentLoaded", init);
