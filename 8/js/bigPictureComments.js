export const createComment = ({ avatar, name, message }) => {
  const element = document.createElement('li');
  element.classList.add('social__comment');

  element.innerHTML = `
    <img class="social__picture" src="${avatar}" alt="${name}" width="35" height="35">
    <p class="social__text">${message}</p>
  `;

  return element;
};
