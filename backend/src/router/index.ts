import { Router as IRouter } from 'express';
import * as multer from 'multer';


import { UploadImageHandler } from './images.route';

import * as home from './home.route';
import { authentication } from '../authentication/index.auth';

// This is just a work in progress. We need to decide where we will be
// storing all the image files that get uploaded.
const upload = multer({ dest: 'tmp/'});

export const Router: IRouter = IRouter();

Router
	.get('/', home.index)

	.post('/api/login', 	authentication.authenticate('local'))

Router.post('/api/upload-image', upload.single('image'), UploadImageHandler);
