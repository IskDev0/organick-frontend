function getDateFull(date: string): string {
  let newDate = new Date(date);

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let day = newDate.getDate();
  let month = months[newDate.getMonth()];
  let year = newDate.getFullYear();

  return `${month} ${day}, ${year}`;
}

export default getDateFull;
