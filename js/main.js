import { onPostsLoaded } from './createPosts.js';
import { getData } from './api.js';
import { initiateForm } from './form.js';
import { showLoadError } from './errorMessage.js';

getData()
  .then(onPostsLoaded)
  .catch(showLoadError);

initiateForm();
