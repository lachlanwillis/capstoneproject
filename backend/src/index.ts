import * as express from 'express';
import * as bodyParser from 'body-parser';
import { Application } from 'express';
import { connect } from 'mongoose';
import * as dotenv from 'dotenv';

import * as routes from './router/router';

import * as session from 'express-session';
import * as connectredis from 'connect-redis';
import { authentication } from './authentication/index.auth';

import { Router } from './router';

dotenv.config();

// Connect to the database. This shouldn't be here. 
// In future when we deploy we should get rid of this,
// but it just makes things so much easier.
connect('mongodb://localhost/rubbish');

export const app: Application = express();

const port = process.env.PORT || 4200;
const server = express();
const Store = connectredis(session);

export class Server {

	private app:express.Application = express();

	constructor(){
		this.loadMiddleware();
		this.loadRoutes();
	}

	public listen() {
		this.app.listen(port, () => {
			console.log(`Listening on ${port}...`);
		});
	}

	private loadMiddleware() {

		let secret = (process.env.REDIS_SECRET) ? process.env.REDIS_SECRET 
																						: "secretsquirrles";

		this.app.use(session({
			store: new Store({
				url: process.env.REDIS_URL, 
			}),
			secret: secret,
			resave: false,
			saveUninitialized: false,

		}));
		this.app.use(authentication.initialize())
				.use(authentication.session())
				.use(bodyParser.json());
	}

	private loadRoutes() {
		this.app.use(routes);
	}

	public static start() {
		return new Server().listen();
	}

	public static startExpressApp() {
		return new Server().app;
	}

}

app.use(bodyParser.json());
app.use(Router);

app.get('/*', (req, res) => res.send('Hey!'));