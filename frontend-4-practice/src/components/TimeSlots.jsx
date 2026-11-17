import { useEffect, useState } from "react";
import { fetchSlots } from "../api.js";

export default function TimeSlots({
  year, month, selectedDay, selectedTime, onTimeClick,
}) {
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Запрашиваем время для выбранной даты.
  useEffect(() => {
    if (selectedDay === null) return;
    let active = true;

    async function loadSlots() {
      try {
        const data = await fetchSlots({ year: year, month: month, day: selectedDay });
        if (active) setSlots(data.slots);
      } catch (err) {
        if (active) setError(err.message);
      } finally {
        if (active) setLoading(false);
      }
    }

    loadSlots();
    // Если пользователь уже сменил дату, старый ответ не используем.
    return () => {
      active = false;
    };
  }, [year, month, selectedDay]);

  let content;
  if (selectedDay === null) {
    content = <p className="status-message">Выберите доступную дату</p>;
  } else if (loading) {
    content = <p className="status-message" role="status">Загрузка времени…</p>;
  } else if (error) {
    content = (
      <p className="status-message error" role="alert">
        Не удалось загрузить время: {error}
      </p>
    );
  } else if (slots.length === 0) {
    content = <p className="status-message">На эту дату нет времени для записи</p>;
  } else {
    content = slots.map((slot) => {
      const selected = slot.time === selectedTime;
      let classes = "slot";
      if (!slot.available) classes += " busy";
      if (selected) classes += " selected";

      return (
        <button
          className={classes}
          key={slot.time}
          type="button"
          disabled={!slot.available}
          aria-pressed={selected}
          onClick={() => onTimeClick(slot.time)}
        >
          {slot.time}
          {!slot.available && <small className="busy-text">Занято</small>}
        </button>
      );
    });
  }

  return (
    <section className="card slots" aria-labelledby="available">
      <h2 className="card-title" id="available">Доступное время</h2>
      <div className="times">{content}</div>
    </section>
  );
}
