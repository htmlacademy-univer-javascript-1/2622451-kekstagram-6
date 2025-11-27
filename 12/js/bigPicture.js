import { renderComments } from './bigPictureComments.js';
import { randomPosts } from './data.js';

const bigPicture = document.querySelector('.big-picture');
const body = document.body;

const bigImg = bigPicture.querySelector('.big-picture__img img');
const likesCount = bigPicture.querySelector('.likes-count');
const commentsCount = bigPicture.querySelector('.comments-count');
const commentsList = bigPicture.querySelector('.social__comments');
const socialCaption = bigPicture.querySelector('.social__caption');

const closeButton = bigPicture.querySelector('.big-picture__cancel');

const fillBigPicture = (photo) => {
  bigImg.src = photo.url;
  likesCount.textContent = photo.likes;
  commentsCount.textContent = photo.comments.length;
  socialCaption.textContent = photo.description;

  commentsList.innerHTML = '';
};

const onDocumentKeydown = (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closeBigPicture();
  }
};

function onButtonKeydown(evt) {
  if (evt.key === 'Enter') {
    evt.preventDefault();
    closeBigPicture();
  }
}

function closeBigPicture() {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');

  document.removeEventListener('keydown', onDocumentKeydown);
  closeButton.removeEventListener('click', closeBigPicture);
  closeButton.removeEventListener('keydown', onButtonKeydown);
}

function openBigPicture(photo) {
  fillBigPicture(photo);
  renderComments(photo.comments);
  bigPicture.classList.remove('hidden');
  body.classList.add('modal-open');

  document.addEventListener('keydown', onDocumentKeydown);
  closeButton.addEventListener('click', closeBigPicture);
  closeButton.addEventListener('keydown', onButtonKeydown);
}

const container = document.querySelector('.pictures');
container.addEventListener('click', (evt) => {
  const thumbnail = evt.target.closest('.picture');

  const id = thumbnail.dataset.index;
  const photo = randomPosts[id];
  if (photo) {
    openBigPicture(photo);
  }
});
