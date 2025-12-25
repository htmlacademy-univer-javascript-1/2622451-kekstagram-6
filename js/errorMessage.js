const showLoadError = () => {
  const errorContainer = document.createElement('section');
  errorContainer.classList.add('data-error');

  errorContainer.innerHTML = `
    <div class="data-error__content">
      <h2 class="data-error__title">Не удалось загрузить данные</h2>
      <p class="data-error__text">
        Попробуйте обновить страницу или зайти позже
      </p>
    </div>
  `;

  document.body.append(errorContainer);
};

export { showLoadError };
