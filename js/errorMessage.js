const showLoadError = () => {
  const errorContainer = document.createElement('section');
  errorContainer.classList.add('data-error');

  const content = document.createElement('div');
  content.classList.add('data-error__content');

  const title = document.createElement('h2');
  title.classList.add('data-error__title');
  title.textContent = 'Не удалось загрузить данные';

  const text = document.createElement('p');
  text.classList.add('data-error__text');
  text.textContent = 'Попробуйте обновить страницу или зайти позже';

  content.append(title, text);
  errorContainer.append(content);
  document.body.append(errorContainer);
};

export { showLoadError };
