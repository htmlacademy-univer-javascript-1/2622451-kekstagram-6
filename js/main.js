import { createPosts } from './createPosts.js';
import { initiateBigPicture } from './bigPicture.js';
import { getData } from './api.js';
import { initiateForm } from './form.js';

getData()
  .then((data) => {
    createPosts(data);
    initiateBigPicture(data);
  });

initiateForm();
