const DATA_URL = 'https://29.javascript.htmlacademy.pro/kekstagram/data';
const SEND_URL = 'https://29.javascript.htmlacademy.pro/kekstagram';

const checkResponse = (response) => {
  if (!response.ok) {
    throw new Error('Ошибка сети');
  }
  return response;
};

const getData = () =>
  fetch(DATA_URL)
    .then(checkResponse)
    .then((response) => response.json());

const sendData = (body) =>
  fetch(SEND_URL, {
    method: 'POST',
    body,
  })
    .then(checkResponse)
    .catch(() => {
      throw new Error('Не удалось отправить форму. Попробуйте ещё раз');
    });

export { getData, sendData };
