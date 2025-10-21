import {createIdGenerator, getRandomInteger, createRandomIdFromRangeGenerator} from './utils.js';
import {DESCRIPTIONS, MESSAGES, NAMES} from './dictionary.js';

const POSTS_COUNT = 4;

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

export {randomPosts};
