const datePattern = /^([0-9]{2})\.([0-9]{2})\.([0-9]{4})$/;

export const splitDate = (date) => {
  const result = date.match(datePattern);
  if (result == null) {
    return null;
  }
  const [day, month, year] = result.slice(1);
  return { day: +day, month: +month, year: +year };
};

export const dateCmp = (lhs, rhs) => {
  return lhs.year - rhs.year || lhs.month - rhs.month || lhs.day - rhs.day;
};

export const insertAt = (array, index, value) => {
  return array.slice(0, index).concat([value]).concat(array.slice(index));
};

export const removeAt = (array, index) => {
  return array.slice(0, index).concat(array.slice(index + 1));
}

export const replaceAt = (array, index, value) => {
  return array.slice(0, index).concat([value]).concat(array.slice(index + 1));
}
