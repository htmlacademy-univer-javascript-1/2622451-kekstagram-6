import { renderComments } from './bigPictureComments.js';

const bigPicture = document.querySelector('.big-picture');
const body = document.body;

const bigImg = bigPicture.querySelector('.big-picture__img img');
const likesCount = bigPicture.querySelector('.likes-count');
const commentsCount = bigPicture.querySelector('.comments-count');
const commentsList = bigPicture.querySelector('.social__comments');
const socialCaption = bigPicture.querySelector('.social__caption');

const closeButton = bigPicture.querySelector('.big-picture__cancel');

const fillBigPicture = (photoData) => {
  bigImg.src = photoData.url;
  likesCount.textContent = photoData.likes;
  commentsCount.textContent = photoData.comments.length;
  socialCaption.textContent = photoData.description;

  commentsList.innerHTML = '';
};

const onDocumentKeydown = (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closeBigPicture();
  }
};

const onButtonKeydown = (evt) => {
  if (evt.key === 'Enter') {
    evt.preventDefault();
    closeBigPicture();
  }
};

function closeBigPicture(){
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');

  document.removeEventListener('keydown', onDocumentKeydown);
  closeButton.removeEventListener('click', closeBigPicture);
  closeButton.removeEventListener('keydown', onButtonKeydown);
}

const openBigPicture = (photoData) => {
  fillBigPicture(photoData);
  renderComments(photoData.comments);

  bigPicture.classList.remove('hidden');
  body.classList.add('modal-open');

  document.addEventListener('keydown', onDocumentKeydown);
  closeButton.addEventListener('click', closeBigPicture);
  closeButton.addEventListener('keydown', onButtonKeydown);
};

const initiateBigPicture = (getCurrentPosts) => {
  const container = document.querySelector('.pictures');

  container.addEventListener('click', (evt) => {
    const thumbnail = evt.target.closest('.picture');
    if (!thumbnail) {
      return;
    }

    const index = Number(thumbnail.dataset.index);
    const currentPosts = getCurrentPosts();
    const photoData = currentPosts[index];

    if (photoData) {
      openBigPicture(photoData);
    }
  });
};

export { initiateBigPicture };
