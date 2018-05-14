
import * as express from 'express';
import * as session from 'express-session';
import * as bodyParser from 'body-parser';
import { Application } from 'express';
import { connect } from 'mongoose';

import { Router } from './router';

// Connect to the database. This shouldn't be here. 
// In future when we deploy we should get rid of this,
// but it just makes things so much easier.
connect('mongodb://localhost/rubbish');

export const app: Application = express();

app.use(bodyParser.json());

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}))

app.use(Router);

app.get('/*', (req, res) => res.send('Hey!'));