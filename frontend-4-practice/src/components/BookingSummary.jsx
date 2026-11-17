import { formatDate } from "../utils/date.js";

export default function BookingSummary({ year, month, selectedDay, selectedTime }) {
  let dateText = "Выберите доступную дату";
  if (selectedDay !== null) {
    dateText = formatDate(year, month, selectedDay) + " · " +
      (selectedTime || "Выберите время");
  }

  return (
    <div className="booking-end">
      <section className="summary" aria-labelledby="chosen">
        <h2 className="label" id="chosen">Выбрано</h2>
        <p className="summary-text">
          Марина · Комплекс стрижка + борода · 60 мин · 2200 ₽
        </p>
        <p className="summary-text" id="booking-date" aria-live="polite">
          {dateText}
        </p>
      </section>
      <div className="actions">
        <button className="action" type="button">Назад</button>
        <button className="action selected" type="button">Далее</button>
      </div>
    </div>
  );
}
