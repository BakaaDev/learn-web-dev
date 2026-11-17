import { useEffect, useState } from "react";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import StepIndicator from "./components/StepIndicator.jsx";
import Calendar from "./components/Calendar.jsx";
import TimeSlots from "./components/TimeSlots.jsx";
import BookingSummary from "./components/BookingSummary.jsx";
import { compareDates } from "./utils/date.js";
import { fetchToday } from "./api.js";

function App() {
  const [today, setToday] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(null);
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  // При открытии страницы получаем «сегодня» с сервера.
  useEffect(() => {
    let active = true;

    async function loadToday() {
      try {
        const data = await fetchToday();
        if (!active) return;
        setToday(data);
        setCurrentMonth({ year: data.year, month: data.month });
        setSelectedDay(data.day);
      } catch (err) {
        if (active) setError(err.message);
      } finally {
        if (active) setLoading(false);
      }
    }

    loadToday();
    return () => {
      active = false;
    };
  }, []);

  function handleDayClick(day) {
    setSelectedDay(day);
    setSelectedTime(null);
  }

  function handleMonthChange(offset) {
    const date = new Date(currentMonth.year, currentMonth.month + offset, 1);
    const year = date.getFullYear();
    const month = date.getMonth();
    const lastDay = new Date(year, month + 1, 0).getDate();

    setCurrentMonth({ year: year, month: month });
    setSelectedTime(null);

    if (compareDates({ year: year, month: month, day: lastDay }, today) < 0) {
      setSelectedDay(null);
    } else {
      const isCurrentMonth = year === today.year && month === today.month;
      setSelectedDay(isCurrentMonth ? today.day : 1);
    }
  }

  return (
    <div className="page">
      <Header />
      <StepIndicator />

      <main className="wrap booking">
        <div className="heading">
          <p className="label">Шаг 3 из 5</p>
          <h1 className="title">Выберите дату и время</h1>
        </div>

        {loading ? (
          <p className="status-message" role="status">Загрузка календаря…</p>
        ) : error ? (
          <p className="status-message error" role="alert">
            Не удалось загрузить календарь: {error}
          </p>
        ) : (
          <>
            <div className="columns">
              <Calendar
                year={currentMonth.year}
                month={currentMonth.month}
                today={today}
                selectedDay={selectedDay}
                onDayClick={handleDayClick}
                onMonthChange={handleMonthChange}
              />
              {/* Новая дата — новый компонент со своей загрузкой слотов. */}
              <TimeSlots
                key={`${currentMonth.year}-${currentMonth.month}-${selectedDay}`}
                year={currentMonth.year}
                month={currentMonth.month}
                selectedDay={selectedDay}
                selectedTime={selectedTime}
                onTimeClick={setSelectedTime}
              />
            </div>

            <BookingSummary
              year={currentMonth.year}
              month={currentMonth.month}
              selectedDay={selectedDay}
              selectedTime={selectedTime}
            />
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default App;
