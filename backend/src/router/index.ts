import { Router as IRouter } from 'express';
import * as multer from 'multer';

import { UploadImageHandler, GetImageHandler, GetFlaggedImagesHandler, DeleteImageHandler, GetMyImagesHandler, DeleteMyImageHandler } from './images.route';
import { HandleUserSignup, HandleUserLogout, IsUserAdmin, PromoteUser, DemoteUser } from './users.route';
import { authentication as auth } from '../authentication';
import { ensureAdmin, ensureLoggedIn } from '../middleware/ensureLogin';

// This is just a work in progress. We need to decide where we will be
// storing all the image files that get uploaded.
const upload = multer({ dest: 'assets/'});

export const Router: IRouter = IRouter();


Router

	// AUTH ROUTES // 

	.post('/api/login', auth.authenticate('local'), (req, res) => res.json({ success: !!req.user }))
	.post('/api/signup', HandleUserSignup)
	.get('/api/auth/ping', (req, res) => res.json({ auth: !!req.user }))
	.get('/api/logout', HandleUserLogout)
	.get('/api/isadmin', IsUserAdmin)

	.get('/api/auth/facebook', auth.authenticate('facebook', {
		scope: [ 'public_profile', 'email' ]
	}))
	.get('/api/auth/facebook/callback', auth.authenticate('facebook', {
		failureRedirect: '/login'
	}), (req, res) => res.redirect('/browse-public'))

	.get('/api/auth/google', auth.authenticate('google', {
		scope: [ 'profile', 'email' ]
	}))
	.get('/api/auth/google/callback', auth.authenticate('google', {
		failureRedirect: '/login'
	}), (req, res) => res.redirect('/browse-public'))
	
	
	.post('/api/user/promote', ensureAdmin, PromoteUser)
	.post('/api/user/demote', ensureAdmin, DemoteUser)

	// IMAGE ROUTES // 
	.post('/api/upload-image', ensureLoggedIn, upload.single('image'), UploadImageHandler)

	.get('/api/display-image', GetImageHandler)
	.get('/api/my-images', ensureLoggedIn, GetMyImagesHandler)
    .get('/api/flagged-images', ensureAdmin, GetFlaggedImagesHandler)

	.delete('/api/my-image/:id', ensureLoggedIn, DeleteMyImageHandler)
	.delete('/api/delete-image/:id', DeleteImageHandler)
