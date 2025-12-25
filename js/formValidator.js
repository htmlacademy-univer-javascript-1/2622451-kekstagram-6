import '../pristine/pristine.min.js';

const TAG_REGEX = /^(?:#[\p{L}\p{N}]{1,19})(?:\s+#[\p{L}\p{N}]{1,19})*$/u;

export function initValidator(form) {
  const textHashtags = form.querySelector('.text__hashtags');
  const textDescription = form.querySelector('.text__description');

  const pristine = new Pristine(form, {
    classTo: 'img-upload__field-wrapper',
    errorClass: 'img-upload__field-wrapper--invalid',
    successClass: 'img-upload__field-wrapper--valid',
    errorTextParent: 'img-upload__field-wrapper',
    errorTextClass: 'img-upload__error'
  });

  pristine.addValidator(
    textHashtags,
    (value) => {
      if (!value) {return true;}
      return value.trim().split(/\s+/).every((tag) => TAG_REGEX.test(tag));
    },
    'Хэш-тег должен начинаться с # и содержать только буквы и цифры, не более 20 символов'
  );

  pristine.addValidator(
    textHashtags,
    (value) => {
      if (!value) {return true;}
      const tags = value.toLowerCase().trim().split(/\s+/).filter(Boolean);
      return new Set(tags).size === tags.length;
    },
    'Один и тот же хэш-тег не может быть использован дважды'
  );

  pristine.addValidator(
    textHashtags,
    (value) => {
      if (!value) {return true;}
      const tags = value.trim().split(/\s+/).filter(Boolean);
      return tags.length <= 5;
    },
    'Нельзя указать больше пяти хэш-тегов'
  );

  pristine.addValidator(
    textDescription,
    (value) => value.length <= 140,
    'Комментарий не должен превышать 140 символов'
  );

  return pristine;
}
