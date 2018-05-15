import { Router as IRouter } from 'express';
import * as multer from 'multer';

import { UploadImageHandler, GetImageHandler } from './images.route';
import { HandleUserSignup, HandleUserLogout } from './users.route';
import { authentication } from '../authentication';

// This is just a work in progress. We need to decide where we will be
// storing all the image files that get uploaded.
const upload = multer({ dest: 'assets/'});

export const Router: IRouter = IRouter();


Router

	// AUTH ROUTES // 
	.post('/api/login', authentication.authenticate('local'), (req, res) => res.json({ success: !!req.user }))
	.post('/api/signup', HandleUserSignup)
	.get('/api/auth/ping', (req, res) => res.json({ auth: !!req.user }))
	.get('/api/logout', HandleUserLogout)

	// IMAGE ROUTES // 
	.post('/api/upload-image', upload.single('image'), UploadImageHandler)
	.get('/api/display-image', GetImageHandler);
