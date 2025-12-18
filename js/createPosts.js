import { debounce } from './utils.js';
import { initiateBigPicture } from './bigPicture.js';

const postsContainer = document.querySelector('.pictures');
const filtersContainer = document.querySelector('.img-filters');

let originalPosts = [];
let currentPosts = [];

const clearPosts = () => {
  postsContainer.querySelectorAll('.picture').forEach((el) => el.remove());
};

const createPosts = function(posts){
  postsContainer.querySelector('.pictures__title').classList.remove('visually-hidden');
  const fragment = document.createDocumentFragment();
  posts.forEach(({ comments, description, likes, url}, index) => {
    const pictureElement = document.createElement('a');
    pictureElement.dataset.index = index;
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
};

const renderPosts = (posts) => {
  currentPosts = posts;
  clearPosts();
  createPosts(posts);
};

const debouncedRenderPosts = debounce(renderPosts, 500);

const COUNT_OF_FILTER = 10;

const filterDefault = (posts) => posts.slice();

const filterDiscussed = (posts) =>
  posts
    .slice()
    .sort((a, b) => b.comments.length - a.comments.length);

const getRandomPosts = (posts, count) => {
  const shuffled = posts.slice().sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
};

const setActiveFilter = (activeButton) => {
  const buttons = filtersContainer.querySelectorAll('.img-filters__button');

  buttons.forEach((button) => {
    button.classList.toggle(
      'img-filters__button--active',
      button === activeButton
    );
  });
};

const onPostsLoaded = (posts) => {
  originalPosts = posts.slice();
  currentPosts = posts.slice();
  filtersContainer.classList.remove('img-filters--inactive');
  createPosts(originalPosts);
};

document.querySelector('#filter-default')
  .addEventListener('click', (evt) => {
    setActiveFilter(evt.target);
    debouncedRenderPosts(filterDefault(originalPosts));
  });

document.querySelector('#filter-random')
  .addEventListener('click', (evt) => {
    setActiveFilter(evt.target);
    debouncedRenderPosts(getRandomPosts(originalPosts, COUNT_OF_FILTER));
  });

document.querySelector('#filter-discussed')
  .addEventListener('click', (evt) => {
    setActiveFilter(evt.target);
    debouncedRenderPosts(filterDiscussed(originalPosts));
  });

initiateBigPicture(() => currentPosts);

export { onPostsLoaded };
