const getData = () => fetch(
  'https://29.javascript.htmlacademy.pro/kekstagram/data')
  .then((response) => response.json());

const sendData = (body) => fetch(
  'https://29.javascript.htmlacademy.pro/kekstagram',
  {
    method: 'POST',
    body,
  })
  .then((response) => {
    if (!response.ok) {
      throw new Error();
    }
  })
  .catch(() => {
    throw new Error('Не удалось отправить форму. Попробуйте ещё раз');
  });

export {getData, sendData};
