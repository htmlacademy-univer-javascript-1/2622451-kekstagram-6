import { createPosts } from './createPosts.js';
import { initiateBigPicture } from './bigPicture.js';
import { getData } from './api.js';


getData()
  .then((data) => {
    createPosts(data);
    initiateBigPicture(data);
  });

import './form.js';
