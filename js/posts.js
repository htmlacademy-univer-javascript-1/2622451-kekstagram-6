import {randomPosts} from './data.js';

const postsContainer = document.querySelector('.pictures');
postsContainer.querySelector('.pictures__title').classList.remove('visually-hidden');
const fragment = document.createDocumentFragment();

randomPosts.forEach(({ url, description, likes, comments }) => {
  const pictureElement = document.createElement('a');
  pictureElement.href = '#';
  pictureElement.classList.add('picture');

  const img = document.createElement('img');
  img.classList.add('picture__img');
  img.src = url;
  img.alt = description;

  const info = document.createElement('p');
  info.classList.add('picture__info');

  const commentsSpan = document.createElement('span');
  commentsSpan.classList.add('picture__comments');
  commentsSpan.textContent = comments.length;

  const likesSpan = document.createElement('span');
  likesSpan.classList.add('picture__likes');
  likesSpan.textContent = likes;

  info.append(commentsSpan, likesSpan);
  pictureElement.append(img, info);

  fragment.appendChild(pictureElement);
});

postsContainer.appendChild(fragment);
