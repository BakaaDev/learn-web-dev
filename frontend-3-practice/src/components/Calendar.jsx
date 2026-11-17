import { buildCalendarGrid, compareDates } from "../utils/date.js";

const MONTHS = [
  "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь",
  "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь",
];
const WEEKDAYS = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];

export default function Calendar({
  year, month, today, selectedDay, onDayClick, onMonthChange,
}) {
  const cells = buildCalendarGrid(year, month).flat();

  return (
    <section className="card calendar" aria-labelledby="month">
      <div className="month-row">
        <h2 className="card-title" id="month">{MONTHS[month]} {year}</h2>
        <div className="arrows">
          <button
            className="arrow"
            id="previous-month"
            type="button"
            aria-label="Предыдущий месяц"
            onClick={() => onMonthChange(-1)}
          >
            ‹
          </button>
          <button
            className="arrow"
            id="next-month"
            type="button"
            aria-label="Следующий месяц"
            onClick={() => onMonthChange(1)}
          >
            ›
          </button>
        </div>
      </div>

      <div className="days">
        {WEEKDAYS.map((day) => (
          <span className="weekday" key={day}>{day}</span>
        ))}

        {cells.map((cell, index) => {
          const cellDate = { year: year, month: month, day: cell.day };
          const disabled = cell.otherMonth || compareDates(cellDate, today) < 0;
          const selected = !disabled && cell.day === selectedDay;
          let classes = "day";
          if (disabled) classes += " muted";
          if (selected) classes += " selected";

          return (
            <button
              className={classes}
              key={index}
              type="button"
              disabled={disabled}
              aria-pressed={selected}
              onClick={() => onDayClick(cell.day)}
            >
              {cell.day}
            </button>
          );
        })}
      </div>
    </section>
  );
}
