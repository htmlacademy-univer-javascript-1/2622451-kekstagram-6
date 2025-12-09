import { initValidator } from './formValidator.js';
import { initUploader } from './formUploader.js';
import { initImageEditor, destroyImageEditor } from './imageEditor.js';

const body = document.body;
const form = document.querySelector('.img-upload__form');
const fileInput = form.querySelector('.img-upload__input');
const overlay = document.querySelector('.img-upload__overlay');
const closeButton = overlay.querySelector('.img-upload__cancel');

const previewImage = overlay.querySelector('.img-upload__preview img');
const effectsPreview = overlay.querySelectorAll('.effects__preview');
const textHashtags = form.querySelector('.text__hashtags');
const textDescription = form.querySelector('.text__description');

let currentObjectURL = null;

function setPreviewFromFile(file) {
  if (currentObjectURL) {URL.revokeObjectURL(currentObjectURL);}
  if (!file) {return;}

  currentObjectURL = URL.createObjectURL(file);
  previewImage.src = currentObjectURL;
  previewImage.alt = file.name || 'uploaded image';

  effectsPreview.forEach((el) => {
    el.style.backgroundImage = `url(${currentObjectURL})`;
  });
}

function openModal() {
  overlay.classList.remove('hidden');
  body.classList.add('modal-open');
  removeInitialListeners();
  addModalListeners();
  initImageEditor(form);
}

function closeModal() {
  overlay.classList.add('hidden');
  body.classList.remove('modal-open');
  destroyImageEditor();
  form.reset();
  fileInput.value = '';
  removeModalListeners();
  addInitialListeners();
}

function onFileInputChange() {
  const file = fileInput.files && fileInput.files[0];
  if (!file || !file.type.startsWith('image/')) {return;}

  setPreviewFromFile(file);
  openModal();
}

function onCloseButtonClick() { closeModal(); }
function onDocumentKeydown(evt) { if (evt.key === 'Escape') {closeModal();} }
function stopEsc(evt) { if (evt.key === 'Escape') {evt.stopPropagation();} }

function addModalListeners() {
  closeButton.addEventListener('click', onCloseButtonClick);
  document.addEventListener('keydown', onDocumentKeydown);
  textHashtags.addEventListener('keydown', stopEsc);
  textDescription.addEventListener('keydown', stopEsc);
}

function removeModalListeners() {
  closeButton.removeEventListener('click', onCloseButtonClick);
  document.removeEventListener('keydown', onDocumentKeydown);
  textHashtags.removeEventListener('keydown', stopEsc);
  textDescription.removeEventListener('keydown', stopEsc);
}

function addInitialListeners() { fileInput.addEventListener('change', onFileInputChange); }
function removeInitialListeners() { fileInput.removeEventListener('change', onFileInputChange); }

addInitialListeners();

const pristine = initValidator(form);

function createMessageFromTemplate(idSelector, classSelector) {
  const template = document.querySelector(idSelector);
  if (!template) {return null;}
  return template.content.querySelector(classSelector).cloneNode(true);
}

export function showSuccessMessage() {
  const successNode = createMessageFromTemplate('#success', '.success');
  if (!successNode) {return;}

  document.body.append(successNode);

  const successButton = successNode.querySelector('.success__button');

  function removeMessage() {
    successNode.remove();
    document.removeEventListener('keydown', onEsc);
    successNode.removeEventListener('click', onOutsideClick);
    successButton.removeEventListener('click', onButtonClick);
  }

  function onEsc(evt) { if (evt.key === 'Escape') {removeMessage();} }
  function onOutsideClick(evt) { if (evt.target === successNode) {removeMessage();} }
  function onButtonClick() { removeMessage(); }

  successButton.addEventListener('click', onButtonClick);
  document.addEventListener('keydown', onEsc);
  successNode.addEventListener('click', onOutsideClick);
}

export function showErrorMessage(message) {
  const errorNode = createMessageFromTemplate('#error', '.error');
  if (!errorNode) {return;}

  const title = errorNode.querySelector('.error__title');
  if (title && message) {title.textContent = message;}

  document.body.append(errorNode);

  const errorButton = errorNode.querySelector('.error__button');

  function removeMessage() {
    errorNode.remove();
    document.removeEventListener('keydown', onEsc);
    errorNode.removeEventListener('click', onOutsideClick);
    errorButton.removeEventListener('click', onButtonClick);
  }

  function onEsc(evt) { if (evt.key === 'Escape') {removeMessage();} }
  function onOutsideClick(evt) { if (evt.target === errorNode) {removeMessage();} }
  function onButtonClick() { removeMessage(); }

  errorButton.addEventListener('click', onButtonClick);
  document.addEventListener('keydown', onEsc);
  errorNode.addEventListener('click', onOutsideClick);
}

initUploader(form, pristine, openModal, closeModal, showSuccessMessage, showErrorMessage);
