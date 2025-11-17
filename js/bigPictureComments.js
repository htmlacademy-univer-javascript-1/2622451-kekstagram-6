const commentsList = document.querySelector('.social__comments');
const commentCount = document.querySelector('.social__comment-count');
const loadMoreButton = document.querySelector('.comments-loader');

const COMMENTS_BATCH_SIZE = 5;

export function renderComments(comments) {

  let loadedCount = 0;

  commentsList.innerHTML = '';

  function loadNextBatch() {
    loadMoreButton.classList.remove('hidden');

    const nextBatch = comments.slice(loadedCount, loadedCount + COMMENTS_BATCH_SIZE);

    nextBatch.forEach((comment) => {
      const li = document.createElement('li');
      li.classList.add('social__comment');

      li.innerHTML = `
        <img class="social__picture" src="${comment.avatar}" alt="${comment.name}" width="35" height="35">
        <p class="social__text">${comment.message}</p>
      `;

      commentsList.appendChild(li);
    });

    loadedCount += nextBatch.length;

    commentCount.textContent = `${loadedCount} из ${comments.length} комментариев`;

    if (loadedCount >= comments.length) {
      loadMoreButton.classList.add('hidden');
    }
  }

  loadNextBatch();

  loadMoreButton.addEventListener('click', loadNextBatch);
}
