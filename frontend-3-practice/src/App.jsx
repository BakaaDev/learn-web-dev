import { useState } from "react";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import StepIndicator from "./components/StepIndicator.jsx";
import Calendar from "./components/Calendar.jsx";
import TimeSlots from "./components/TimeSlots.jsx";
import BookingSummary from "./components/BookingSummary.jsx";
import { compareDates, getToday } from "./utils/date.js";
import { getSlotsForDay } from "./data/slots.js";

function App() {
  // Состояние страницы: сегодняшняя дата, открытый месяц, выбранные день и время.
  const [today] = useState(getToday);
  const [currentMonth, setCurrentMonth] = useState({
    year: today.year,
    month: today.month,
  });
  const [selectedDay, setSelectedDay] = useState(today.day);
  const [selectedTime, setSelectedTime] = useState(null);

  // Слоты зависят от выбранного дня, поэтому вычисляем их из состояния.
  const slots = selectedDay === null ? [] : getSlotsForDay(selectedDay);

  function handleDayClick(day) {
    setSelectedDay(day);
    setSelectedTime(null);
  }

  function handleMonthChange(offset) {
    // Date сам меняет год при переходе через декабрь или январь.
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

        <div className="columns">
          <Calendar
            year={currentMonth.year}
            month={currentMonth.month}
            today={today}
            selectedDay={selectedDay}
            onDayClick={handleDayClick}
            onMonthChange={handleMonthChange}
          />
          <TimeSlots
            slots={slots}
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
      </main>

      <Footer />
    </div>
  );
}

export default App;
