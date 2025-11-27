import '../vendor/pristine/pristine.min.js';

const body = document.body;
const form = document.querySelector('.img-upload__form');
const fileInput = form.querySelector('.img-upload__input');

const overlay = document.querySelector('.img-upload__overlay');
const closeButton = overlay.querySelector('.img-upload__cancel');

const textHashtags = form.querySelector('.text__hashtags');
const textDescription = form.querySelector('.text__description');

function onFileInputChange() {
  if (fileInput.files && fileInput.files[0]) {
    openModal();
  }
}

function onCloseButtonClick() {
  closeModal();
}

function onDocumentKeydown(evt) {
  if (evt.key === 'Escape') {
    closeModal();
  }
}

function stopEsc(evt) {
  if (evt.key === 'Escape') {
    evt.stopPropagation();
  }
}

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

function openModal() {
  overlay.classList.remove('hidden');
  body.classList.add('modal-open');

  removeInitialListeners();
  addModalListeners();
}

function closeModal() {
  overlay.classList.add('hidden');
  body.classList.remove('modal-open');

  form.reset();
  fileInput.value = '';

  removeModalListeners();
  addInitialListeners();
}

function addInitialListeners() {
  fileInput.addEventListener('change', onFileInputChange);
}

function removeInitialListeners() {
  fileInput.removeEventListener('change', onFileInputChange);
}

addInitialListeners();

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--invalid',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__error'
});

function validateHashtags(value) {
  if (value.trim() === '') {return true;}

  const tags = value.toLowerCase().trim().split(/\s+/);
  const tagRegex = /^#[a-z0-9]{1,20}$/;

  if (tags.length > 5) {return false;}
  if (new Set(tags).size !== tags.length) {return false;}

  return tags.every((tag) => tagRegex.test(tag));
}

pristine.addValidator(
  textHashtags,
  validateHashtags,
  'Неверный формат хеш-тегов'
);

function validateDescription(value) {
  return value.length <= 140;
}

pristine.addValidator(
  textDescription,
  validateDescription,
  'Комментарий не должен превышать 140 символов'
);

form.addEventListener('submit', (evt) => {
  if (!pristine.validate()) {
    evt.preventDefault();
  }
});
