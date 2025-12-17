import '../nouislider/nouislider.js';

let state = {
  form: null,
  preview: null,
  scaleSmaller: null,
  scaleBigger: null,
  scaleValue: null,
  effectsContainer: null,
  effectLevel: null,
  effectLevelSlider: null,
  effectLevelValue: null,
  sliderInstance: null,

  onScaleSmaller: null,
  onScaleBigger: null,
  onEffectChange: null,
  onSliderUpdate: null,
};

export function initImageEditor(form) {
  state.form = form;
  state.preview = document.querySelector('.img-upload__preview img');
  state.scaleSmaller = form.querySelector('.scale__control--smaller');
  state.scaleBigger = form.querySelector('.scale__control--bigger');
  state.scaleValue = form.querySelector('.scale__control--value');

  state.effectsContainer = form.querySelector('.effects');
  state.effectLevel = form.querySelector('.img-upload__effect-level');
  state.effectLevelSlider = form.querySelector('.effect-level__slider');
  state.effectLevelValue = form.querySelector('.effect-level__value');

  const SCALE_STEP = 25;
  const SCALE_MIN = 25;
  const SCALE_MAX = 100;

  function applyScale() {
    const value = parseInt(state.scaleValue.value, 10);
    state.preview.style.transform = `scale(${value / 100})`;
  }

  state.scaleValue.value = '100%';

  state.onScaleSmaller = function () {
    let value = parseInt(state.scaleValue.value, 10);
    value = Math.max(SCALE_MIN, value - SCALE_STEP);
    state.scaleValue.value = `${value}%`;
    applyScale();
  };

  state.onScaleBigger = function () {
    let value = parseInt(state.scaleValue.value, 10);
    value = Math.min(SCALE_MAX, value + SCALE_STEP);
    state.scaleValue.value = `${value}%`;
    applyScale();
  };

  state.scaleSmaller.addEventListener('click', state.onScaleSmaller);
  state.scaleBigger.addEventListener('click', state.onScaleBigger);

  const EFFECTS = {
    none: { filter: () => 'none', min: 0, max: 100, start: 100, step: 1 },
    chrome: { filter: (v) => `grayscale(${v})`, min: 0, max: 1, start: 1, step: 0.1 },
    sepia: { filter: (v) => `sepia(${v})`, min: 0, max: 1, start: 1, step: 0.1 },
    marvin: { filter: (v) => `invert(${v}%)`, min: 0, max: 100, start: 100, step: 1 },
    phobos: { filter: (v) => `blur(${v}px)`, min: 0, max: 3, start: 3, step: 0.1 },
    heat: { filter: (v) => `brightness(${v})`, min: 1, max: 3, start: 3, step: 0.1 }
  };

  noUiSlider.create(state.effectLevelSlider, {
    range: { min: 0, max: 100 },
    start: 100,
    step: 1,
    connect: 'lower'
  });

  state.effectLevel.classList.add('hidden');

  state.sliderInstance = state.effectLevelSlider.noUiSlider;

  state.onSliderUpdate = () => {
    const effectName = state.form.querySelector('.effects__radio:checked').value;
    const value = Number(state.sliderInstance.get());

    state.effectLevelValue.value = value;

    if (effectName === 'none') {
      state.preview.style.filter = '';
      return;
    }
    state.preview.style.filter = EFFECTS[effectName].filter(value);
  };

  state.sliderInstance.on('update', state.onSliderUpdate);

  state.onEffectChange = function (evt) {
    const effectName = evt.target.value;
    const effect = EFFECTS[effectName];

    if (effectName === 'none') {
      state.effectLevel.classList.add('hidden');
      state.preview.style.filter = '';
      return;
    }

    state.effectLevel.classList.remove('hidden');

    state.sliderInstance.updateOptions({
      range: { min: effect.min, max: effect.max },
      start: effect.start,
      step: effect.step
    });

    state.effectLevelValue.value = effect.start;
    state.preview.style.filter = effect.filter(effect.start);
  };

  state.effectsContainer.addEventListener('change', state.onEffectChange);
}

export function destroyImageEditor() {
  if (!state.form) {return;}

  if (state.scaleSmaller && state.onScaleSmaller)
  {state.scaleSmaller.removeEventListener('click', state.onScaleSmaller);}

  if (state.scaleBigger && state.onScaleBigger)
  {state.scaleBigger.removeEventListener('click', state.onScaleBigger);}

  if (state.effectsContainer && state.onEffectChange)
  {state.effectsContainer.removeEventListener('change', state.onEffectChange);}

  if (state.sliderInstance && state.onSliderUpdate)
  {state.sliderInstance.off('update', state.onSliderUpdate);}

  if (state.sliderInstance) {
    state.sliderInstance.destroy();
  }

  if (state.preview) {
    state.preview.style.transform = '';
    state.preview.style.filter = '';
  }

  state = {
    form: null,
    preview: null,
    scaleSmaller: null,
    scaleBigger: null,
    scaleValue: null,
    effectsContainer: null,
    effectLevel: null,
    effectLevelSlider: null,
    effectLevelValue: null,
    sliderInstance: null,
    onScaleSmaller: null,
    onScaleBigger: null,
    onEffectChange: null,
    onSliderUpdate: null,
  };
}
