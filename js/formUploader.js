import { sendData } from './api.js';


export function initUploader(form, pristine, openModal, closeModal, showSuccessMessage, showErrorMessage) {
  const submitButton = form.querySelector('.img-upload__submit');

  function blockSubmitButton() {
    submitButton.disabled = true;
    submitButton.textContent = 'Отправляю...';
  }

  function unblockSubmitButton() {
    submitButton.disabled = false;
    submitButton.textContent = 'Опубликовать';
  }

  form.addEventListener('submit', (evt) => {
    evt.preventDefault();

    if (!pristine.validate()) {return;}

    blockSubmitButton();
    const formData = new FormData(form);

    sendData(formData)
      .then(() => {
        closeModal();
        showSuccessMessage();
      })
      .catch(() => {
        showErrorMessage();
      })
      .finally(() => {
        unblockSubmitButton();
      });
  });
}
