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

const isMeetingInWorkDay = function(dayStart, dayEnd, meetingStart, meetingDuration){
  function toMinutes(timeStr) {
    const [hours, minutes] = timeStr.split(':').map(Number);
    return hours * 60 + minutes;
  }
  const startWorkMin = toMinutes(dayStart);
  const endWorkMin = toMinutes(dayEnd);
  const startMeetingMin = toMinutes(meetingStart);
  const endMeetingMin = startMeetingMin + meetingDuration;
  return startMeetingMin >= startWorkMin && endMeetingMin <= endWorkMin;
}

console.log(isMeetingInWorkDay('08:00', '17:30', '14:00', 90)); // true
console.log(isMeetingInWorkDay('8:0', '10:0', '8:0', 120));     // true
console.log(isMeetingInWorkDay('08:00', '14:30', '14:00', 90)); // false
console.log(isMeetingInWorkDay('14:00', '17:30', '08:0', 90));  // false
console.log(isMeetingInWorkDay('8:00', '17:30', '08:00', 900)); // false
