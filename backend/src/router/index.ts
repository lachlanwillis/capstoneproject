import { Router as IRouter } from 'express';
import * as multer from 'multer';
import { UploadImageHandler, GetImageHandler, GetFlaggedImagesHandler, DeleteImageHandler, GetMyImagesHandler, DeleteMyImageHandler, UpdateMyImageHandler, AcceptFlaggedImageHandler } from './images.route';
import { HandleUserSignup, HandleUserLogout, IsUserAdmin, PromoteUser, DemoteUser, SetPostcodeHandler, VerifyUserHandler, DeclineUserHandler, HandleUserLogin, ResetPasswordHandler, PasswordEmailHandler, OptOutLeaderboard, OptInLeaderboard } from './users.route';
import { GetLeaderboardHandler } from './leaderboard.route';
import { authentication as auth } from '../authentication';
import { ensureAdmin, ensureLoggedIn } from '../middleware/ensureLogin';

// This is just a work in progress. We need to decide where we will be
// storing all the image files that get uploaded.
const upload = multer({ dest: 'assets/'});

export const Router: IRouter = IRouter();


Router

	// AUTH ROUTES // 

	.post('/api/login', auth.authenticate('local'), HandleUserLogin)
	.post('/api/signup', HandleUserSignup)
	.get('/api/auth/ping', (req, res) => res.json({ auth: !!req.user }))
	.get('/api/logout', HandleUserLogout)
	.get('/api/isadmin', IsUserAdmin)
	.get('/api/auth/user', (req, res) => res.json(req.user))

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

    .put('/api/user/optout', ensureLoggedIn, OptOutLeaderboard)
    .put('/api/user/optin', ensureLoggedIn, OptInLeaderboard)
	.put('/api/user/postcode', ensureLoggedIn, SetPostcodeHandler)

	// IMAGE ROUTES // 

	.post('/api/upload-image', ensureLoggedIn, upload.single('image'), UploadImageHandler)

	.put('/api/update-my-image', ensureLoggedIn, UpdateMyImageHandler)

	.get('/api/display-image', GetImageHandler)
	.get('/api/my-images', ensureLoggedIn, GetMyImagesHandler)
    .get('/api/flagged-images', ensureAdmin, GetFlaggedImagesHandler)

    .put('/api/accept-flagged-images', ensureAdmin, AcceptFlaggedImageHandler)

	.delete('/api/my-image/:id', ensureLoggedIn, DeleteMyImageHandler)
	.delete('/api/delete-image/:id', DeleteImageHandler)

	// EMAIL ROUTES //

	.get('/api/verify/decline/:token', DeclineUserHandler)
	.get('/api/verify/:token', VerifyUserHandler)

	.post('/api/password/reset', PasswordEmailHandler)
	.put('/api/password/reset', ResetPasswordHandler)


	// LEADERBOARD ROUTES //

	.get('/api/leaderboard/:location?/:limit?', GetLeaderboardHandler)
