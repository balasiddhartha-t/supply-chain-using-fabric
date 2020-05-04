const sort = (array, field) => {
  if (!array.length) return [];
  const key = Object.keys(array[0])[field];
  return array.sort((a, b) => {
    return b[key] > a[key] ? -1 : 1;
  });
};

export default sort;
