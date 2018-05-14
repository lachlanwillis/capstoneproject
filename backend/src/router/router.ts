import * as express from 'express';
import * as home from './home.route';
import * as user from './user.route';

import { ensureLoggedIn } from '../middleware/ensureLogin';

import { Router, Request, Response } from 'express';
import { authentication } from '../authentication/index.auth';

const router:Router = express.Router();

router
	.get('/', home.index)

	.post('/api/login', 	authentication.authenticate('local'), 
							user.loginSuccess)
export = router;