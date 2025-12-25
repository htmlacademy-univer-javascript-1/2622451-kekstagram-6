const commentsList = document.querySelector('.social__comments');
const commentCount = document.querySelector('.social__comment-count');
const loadMoreButton = document.querySelector('.comments-loader');

const COMMENTS_BATCH_SIZE = 5;

let loadedCount = 0;
let currentComments = [];
let onLoadMoreClick = null;

function loadNextBatch() {
  const nextBatch = currentComments.slice(
    loadedCount,
    loadedCount + COMMENTS_BATCH_SIZE
  );

  nextBatch.forEach((comment) => {
    const li = document.createElement('li');
    li.classList.add('social__comment');

    const img = document.createElement('img');
    img.classList.add('social__picture');
    img.src = comment.avatar;
    img.alt = comment.name;
    img.width = 35;
    img.height = 35;

    const text = document.createElement('p');
    text.classList.add('social__text');
    text.textContent = comment.message;

    li.append(img, text);

    commentsList.appendChild(li);
  });

  loadedCount += nextBatch.length;

  commentCount.innerHTML = `
    <span class="social__comment-shown-count">${loadedCount}</span> из
    <span class="social__comment-total-count">${currentComments.length}</span>
    комментариев
  `;

  loadMoreButton.classList.toggle(
    'hidden',
    loadedCount >= currentComments.length
  );
}

export function renderComments(comments) {
  currentComments = comments;
  loadedCount = 0;

  commentsList.innerHTML = '';
  loadMoreButton.classList.remove('hidden');

  if (onLoadMoreClick) {
    loadMoreButton.removeEventListener('click', onLoadMoreClick);
  }

  onLoadMoreClick = loadNextBatch;
  loadMoreButton.addEventListener('click', onLoadMoreClick);

  loadNextBatch();
}

export function clearComments() {
  if (onLoadMoreClick) {
    loadMoreButton.removeEventListener('click', onLoadMoreClick);
    onLoadMoreClick = null;
  }

  commentsList.innerHTML = '';
  loadedCount = 0;
}

