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

// Учебные данные: на чётных и нечётных днях занято разное время.
export function getSlotsForDay(day) {
  return SLOTS.map(function (slot) {
    let available = slot.available;
    if (day % 2 !== 0) {
      available = slot.time !== "12:00" && slot.time !== "16:00";
    }
    return { time: slot.time, available: available };
  });
}
