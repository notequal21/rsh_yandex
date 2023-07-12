export function dateString() {
  // Получение текущей даты и времени
  const currentDateTime = new Date();

  // Получение компонентов даты и времени
  let year = currentDateTime.getFullYear();
  let month = ('0' + (currentDateTime.getMonth() + 1)).slice(-2);
  let day = ('0' + currentDateTime.getDate()).slice(-2);
  let hours = ('0' + currentDateTime.getHours()).slice(-2);
  let minutes = ('0' + currentDateTime.getMinutes()).slice(-2);
  let seconds = ('0' + currentDateTime.getSeconds()).slice(-2);

  // Форматирование даты и времени в строку
  let formattedDateTime =
    year +
    '-' +
    month +
    '-' +
    day +
    ' ' +
    hours +
    ':' +
    minutes +
    ':' +
    seconds;
  return formattedDateTime;
}
