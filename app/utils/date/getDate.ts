function getDate(date:string): string {
  let newDate = new Date(date);

  let day = newDate.getDate().toString().padStart(2, '0');
  let month = (newDate.getMonth() + 1).toString().padStart(2, '0');
  let year = newDate.getFullYear();

  return `${day}.${month}.${year}`;
}

export default getDate