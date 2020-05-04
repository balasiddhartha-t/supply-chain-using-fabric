const epochToTime = time => {
  const d = new Date(0);
  d.setUTCMilliseconds(parseInt(time, 10));
  const date = `${d.getDate()}-${d.getMonth() +
    1}-${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}`;
  return date;
};

const getHtmlDate = time => {
  const d = new Date(0);
  d.setUTCMilliseconds(Number(time));
  const year = d.getFullYear();
  const month = d.getMonth() + 1;
  const day = d.getDate();
  const date = `${year}-${month > 9 ? month : `0${month}`}-${day > 9 ? day : `0${day}`}`;
  return date;
};

export { epochToTime, getHtmlDate };
