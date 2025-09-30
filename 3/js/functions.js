const areStringBigger = function(string, targetLen){
  return !(string.length > targetLen);
};
// Cтрока короче 20 символов
areStringBigger('проверяемая строка', 20); // true
// Длина строки ровно 18 символов
areStringBigger('проверяемая строка', 18); // true
// Строка длиннее 10 символов
areStringBigger('проверяемая строка', 10); // false

const areStringPolyndrome = function(string){
  return string.replaceAll(' ', '').toLowerCase().split('').reverse().join('') === string.replaceAll(' ', '').toLowerCase();
};
// Строка является палиндромом
areStringPolyndrome('топот'); // true
// Несмотря на разный регистр, тоже палиндром
areStringPolyndrome('ДовОд'); // true
// Это не палиндром
areStringPolyndrome('Кекс');  // false
// Это палиндром
areStringPolyndrome('Лёша на полке клопа нашёл '); // true
