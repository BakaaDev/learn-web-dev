export default function TimeSlots({ slots, selectedTime, onTimeClick }) {
  return (
    <section className="card slots" aria-labelledby="available">
      <h2 className="card-title" id="available">Доступное время</h2>
      <div className="times">
        {slots.length === 0 ? (
          <p className="empty-message">Выберите доступную дату</p>
        ) : (
          slots.map((slot) => {
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
          })
        )}
      </div>
    </section>
  );
}
