export const detectDay = (time = new Date()) => {
  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const numb = time.getDay();
  return {
    day: daysOfWeek[numb],
    date: time.getDate(),
  };
};
export const capitalizeString = (string: string): string => {
  const words = string.split(' ');
  const newString = words
    .map((word) => {
      return word[0].toUpperCase() + word.substring(1);
    })
    .join(' ');
  return newString;
};

export const convertFeToCel = (tem: number): number => {
  return +((tem - 32) / 1.8).toFixed(1);
};
export const convertKelvinToCel = (temp: number): number => {
  return +(temp - 273.15).toFixed(1);
};
