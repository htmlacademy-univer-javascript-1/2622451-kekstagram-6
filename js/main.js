import { onPostsLoaded } from './createPosts.js';
import { getData } from './api.js';
import { initiateForm } from './form.js';

getData()
  .then((data) => {
    onPostsLoaded(data);
  });

initiateForm();
