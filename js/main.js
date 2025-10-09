const DESCRIPTIONS = [
  'Обычное фото',
  'Просто обычное фото',
  'Хорошее фото',
  'Очень хорошее фото'
];
const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
const NAMES = [
  'Максим',
  'Андрей',
  'Олег',
  'Александр',
  'Павел'
];

const POSTS_COUNT = 4;

function createIdGenerator () {
  let lastGeneratedId = 0;

  return function () {
    lastGeneratedId += 1;
    return lastGeneratedId;
  };
}

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

function createRandomIdFromRangeGenerator (min, max) {
  const previousValues = [];

  return function () {
    let currentValue = getRandomInteger(min, max);
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInteger(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
}

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];
const generatePhotoId = createIdGenerator();
const generateRandomUrlId = createRandomIdFromRangeGenerator(1, 25);
const generateRandomCommentId = createRandomIdFromRangeGenerator(1, 100000);
const getAmountOfCommentaries = createRandomIdFromRangeGenerator(0,30);

const createRandomComment = () => ({
  id: generateRandomCommentId(),
  avatar: `img/avatar-${getRandomInteger(1,6)}.svg`,
  message: getRandomArrayElement(MESSAGES),
  name: getRandomArrayElement(NAMES)
});

const createPost = () => ({
  id: generatePhotoId(),
  url: `photos/${generateRandomUrlId()}.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: getRandomInteger(15, 200),
  comments: Array.from({length: getAmountOfCommentaries()}, createRandomComment)
});

const randomPosts = Array.from({length: POSTS_COUNT}, createPost);

console.log(randomPosts);
