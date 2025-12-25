import { onPostsLoaded } from './createPosts.js';
import { getData } from './api.js';
import { initiateForm } from './form.js';
import { showLoadError } from './error-message.js';

getData()
  .then((data) => {
    onPostsLoaded(data);
  })
  .catch(() => {
    showLoadError();
  });

initiateForm();
