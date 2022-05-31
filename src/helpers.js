const weekDays = [
  "Søndag",
  "Mandag",
  "Tirsdag",
  "Onsdag",
  "Torsdag",
  "Fredag",
  "Lørdag",
];

const monthNames = [
  "Januar",
  "Februar",
  "Mars",
  "April",
  "Mai",
  "Juni",
  "Juli",
  "August",
  "September",
  "Oktober",
  "November",
  "Desember",
];

export function formatLabelDate(date) {
  const dateObj = new Date(date);
  const month = dateObj.getMonth();
  const day = dateObj.getDate();
  const dateDay = dateObj.getDay();
  const year = dateObj.getFullYear();
  return `${day} ${monthNames[month]}`.trim(" ");
}

export function formatToolTipDate(label) {
  const dateObj = new Date(label);
  const month = dateObj.getMonth();
  const day = dateObj.getDate();
  const dateDay = dateObj.getDay();
  const year = dateObj.getFullYear();
  return `${weekDays[dateDay]}, ${day}, ${monthNames[month]} ${year}`;
}
