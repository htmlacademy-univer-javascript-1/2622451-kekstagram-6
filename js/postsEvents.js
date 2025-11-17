import { openBigPicture } from './bigPicture.js';
import { randomPosts } from './data.js';

const container = document.querySelector('.pictures');

container.addEventListener('click', (evt) => {
  const thumbnail = evt.target.closest('.picture');
  const id = thumbnail.dataset.index;
  const photo = randomPosts[id];
  openBigPicture(photo);
});
