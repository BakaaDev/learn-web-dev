// Учебная база данных. Эти данные страница получает только через API.
const now = new Date();

export const database = {
  today: {
    day: now.getDate(),
    month: now.getMonth(),
    year: now.getFullYear(),
  },

  // Сохраняем время из макета. В чётные и нечётные дни занятость разная.
  slotsEvenDay: [
    { time: "10:00", available: true },
    { time: "11:00", available: false },
    { time: "12:00", available: true },
    { time: "13:00", available: false },
    { time: "14:00", available: true },
    { time: "15:00", available: true },
    { time: "16:00", available: true },
    { time: "17:00", available: true },
  ],

  slotsOddDay: [
    { time: "10:00", available: true },
    { time: "11:00", available: true },
    { time: "12:00", available: false },
    { time: "13:00", available: true },
    { time: "14:00", available: true },
    { time: "15:00", available: true },
    { time: "16:00", available: false },
    { time: "17:00", available: true },
  ],
};
