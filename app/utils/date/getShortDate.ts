function getShortDate(date: string): string {
  let newDate = new Date(date);

  let day = newDate.getDate().toString().padStart(2, "0");
  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let month = months[newDate.getMonth()];
  let year = newDate.getFullYear();

  return `${day} ${month}`;
}

export default getShortDate;
