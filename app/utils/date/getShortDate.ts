function getShortDate(date: string): string {
  let newDate = new Date(date);

  return newDate.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

export default getShortDate;
